import Movement from '../models/movement.js';
import Project from '../models/project.js'

export async function saveMovement(req, res) {
  try {
    const projectId = req.params.projectId;
    
    const { name } = req.body;

    const projectFound = await Project.findById(projectId)

    if (!projectFound) {
      return res.status(404).json({
        "status": false,
        "message": "Proyecto no encontrado"
      })
    }

    const newMovement = new Movement({
      name,
      project: projectId
    })

    //Crear referencia del movimiento en el proyecto
    newMovement.projectFound = projectId;
    projectFound.movements.push(newMovement);
    await projectFound.save()

    const movementCreate = await newMovement.save();

    return res.status(201).json({
      "status": true,
      "Movimiento": movementCreate,
      "message": "Movimiento creado"
    })

  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

export async function getMovements(req, res) {
  try {
    const projectId = req.params.projectId;
  
    const movements = await Movement.find({ project: projectId });

    return res.status(200).json({
      "status": true,
      "movements": movements
    });
  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

export async function deleteMovements(req, res) {
  try {

    const {movementIds}  = req.body;
    const projectId = req.params.projectId; 

    const movementDeleted = await Movement.deleteMany({ _id: { $in: movementIds }, project: projectId});

    
    //borrar el el movimiento de la coleccion de proyectos
    
    const projectFound = await Project.findById(projectId)
    
    projectFound.movements = projectFound.movements.filter(
      movementId => !movementIds.includes(movementId.toString())
    )
    await projectFound.save()

    return res.status(200).json({
      "status": true,
      "message": "movimientos borrados borrados correctamente"
    });


  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}