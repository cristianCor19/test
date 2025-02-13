import Project from '../models/project.js'
import User from '../models/user.js';

export async function saveProject(req, res) {
  try {
    const { name } = req.body;

    const creator = req.user.id;
    const userFound = await User.findById(creator)

    if (!userFound) {
      return res.status(404).json({
        "status": false,
        "message": "Usuario no encontrado para crear la relacion"
      })
    }

    const newProject = new Project({
      name,
      creator
    })

    //Crear referencia del proyecto en el usuario
    newProject.userFound = creator;
    userFound.projects.push(newProject);
    await userFound.save()

    const projectCreate = await newProject.save();

    return res.status(201).json({
      "status": true,
      "project": projectCreate,
      "message": "Proyecto creado"
    })

  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    })
  }
}

export async function getProjects(req, res) {
  try {
    const creator = req.user.id;

    const projects = await Project.find({ creator: creator });

    return res.status(200).json({
      "status": true,
      "projects": projects
    });
  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

export async function deleteProject(req, res) {
  try {

    const { projectIds } = req.body;
    const creator = req.user.id;

    const projectDeleted = await Project.deleteMany({ _id: { $in: projectIds }, creator: creator });


    //borrar el proyecto de la coleccion de usuario

    const userFound = await User.findById(creator)

    userFound.projects = userFound.projects.filter(
      projectId => !projectIds.includes(projectId.toString())
    )
    await userFound.save()

    return res.status(200).json({
      "status": true,
      "message": "proyectos borrados correctamente"
    });


  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

//funcion de busqueda con coindidencias

export async function searchProjects(req, res) {
  try {
    const { value, page = 1, limit = 10 } = req.query;
    if (!value) {
      return res.status(400).json({
        "status": false,
        "message": "Debe proporcionar un termino para la busqueda"
      })
    }

    const regex = new RegExp(value, "i");
    const total = await Project.countDocuments({ name: regex });

    const searchProjects = await Project.find({ name: regex })
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      "status": true,
      "total": total,
      "page": Number(page),
      "totalPages": Math.ceil(total / limit),
      "projects": searchProjects
    });
  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}