import Movement from '../models/movement.js';
import Project from '../models/project.js'
import Line from '../models/line.js';

export async function saveLine(req, res) {
  try {
    const movementId = req.params.movementId;
    
    const { name } = req.body;

    const movementFound = await Movement.findById(movementId)

    if (!movementFound) {
      return res.status(404).json({
        "status": false,
        "message": "Movimiento no encontrado"
      })
    }

    const newLine = new Line({
      name,
      movement: movementId
    })

    //Crear referencia del movimiento en el proyecto
    newLine.projectFound = movementId;
    movementFound.lines.push(newLine);
    await movementFound.save()

    const LineCreate = await newLine.save();

    return res.status(201).json({
      "status": true,
      "Linea": LineCreate,
      "message": "Linea creada"
    })

  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

export async function getLines(req, res) {
  try {
    const movementId = req.params.movementId;

    const lines = await Line.find({ movement: movementId });

    return res.status(200).json({
      "status": true,
      "Lineas": lines
    });
  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

export async function deleteLines(req, res) {
  try {

    const {LinesIds}  = req.body;
    const movementId = req.params.movementId; 

    const LinesDeleted = await Line.deleteMany({ _id: { $in: LinesIds }, movement: movementId});

    
    //borrar las lineas de la coleccion de movimientos
    
    const movementFound = await Movement.findById(movementId)
    
    movementFound.lines = movementFound.lines.filter(
      lineId => !LinesIds.includes(lineId.toString())
    )
    await movementFound.save()

    return res.status(200).json({
      "status": true,
      "message": "lineas borradas  correctamente"
    });


  } catch (error) {
    return res.status(500).json({
      "status": false,
      "error": error.message
    });
  }
}

//calculos en lineas 


// Función para formatear valores monetarios
const formatCurrency = (value) => `$ ${value.toFixed(2)}`;
const formatPercentage = (value) => `${value.toFixed(2)} %`;

export async function updateLinesValues(req, res){
  try {
    const lineId = req.params.lineId;
    const {sumPrice, sumBudget} = req.body;

    const lineFound = await Line.findById(lineId);

    console.log();
    

    if (!lineFound) {
      return res.status(404).json({
        "status": false,
        "message": "Línea no encontrada"
      })
    }

    //actualizar valores de la línea
    if (sumPrice !== undefined) {
      lineFound.numbers.sumPrice.number = sumPrice;
      lineFound.numbers.sumPrice.value = formatCurrency(sumPrice);
    }

    if (sumBudget !== undefined) {
      lineFound.numbers.sumBudget.number = sumBudget;
      lineFound.numbers.sumBudget.value = formatCurrency(sumBudget);
    }

    // Calcular utilidad presupuestada y margen presupuestado en la linea
    lineFound.numbers.budgetUtility.number = lineFound.numbers.sumPrice.number - lineFound.numbers.sumBudget.number;
    lineFound.numbers.budgetUtility.value = formatCurrency(lineFound.numbers.budgetUtility.number);

    lineFound.numbers.budgetMargin.number = (lineFound.numbers.budgetUtility.number / lineFound.numbers.sumPrice.number) * 100;
    lineFound.numbers.budgetMargin.value = formatPercentage(lineFound.numbers.budgetMargin.number);

    await lineFound.save();

    console.log(lineFound.movement);
    
    await updateMovementValues(lineFound.movement);

    return res.status(200).json({
      "status": true,
      "line": lineFound,
      "message": "Linea actualizada y valores propagados"
    })

  } catch (error) {
    
  }
}

//propagar cambios a movimiento asociado
const updateMovementValues = async (movementId) => {
  const movementFound = await Movement.findById(movementId);
  
  if (!movementFound) {
    return res.status(404).json({
      "status": false,
      "message": "Movimiento no encontrado"
    })
  }

  const linesFound = await Line.find({ movement: movementId });

  if (!linesFound) {
    return res.status(404).json({
      "status": false,
      "message": "Linea no encontrada"
    })
  }

  movementFound.numbers.sumPrice.number = linesFound.reduce((sum, line) => sum + line.numbers.sumPrice.number, 0);
  movementFound.numbers.sumPrice.value = formatCurrency(movementFound.numbers.sumPrice.number);

  movementFound.numbers.sumBudget.number = linesFound.reduce((sum, line) => sum + line.numbers.sumBudget.number, 0);
  movementFound.numbers.sumBudget.value = formatCurrency(movementFound.numbers.sumBudget.number);

  movementFound.numbers.budgetUtility.number = movementFound.numbers.sumPrice.number - movementFound.numbers.sumBudget.number;
  movementFound.numbers.budgetUtility.value = formatCurrency(movementFound.numbers.budgetUtility.number);

  movementFound.numbers.budgetMargin.number = (movementFound.numbers.budgetUtility.number / movementFound.numbers.sumPrice.number) * 100;
  movementFound.numbers.budgetMargin.value = formatPercentage(movementFound.numbers.budgetMargin.number);

  await movementFound.save();

  // progragar cambios a proyecto asociado
  await updateProjectValues(movementFound.project);
};


//progragar cambios a proyecto asociado
const updateProjectValues = async (projectId) => {
  const projectFound = await Project.findById(projectId);

  if (!projectFound) {
    return res.status(404).json({
      "status": false,
      "message": "Proyeto no encontrado"
    })
  }

  const movementsFound = await Movement.find({ project: projectId });

  if (!movementsFound) {
    return res.status(404).json({
      "status": false,
      "message": "Movimiento no encontrado"
    })
  }

  projectFound.numbers.sumPrice.number = movementsFound.reduce((sum, mov) => sum + mov.numbers.sumPrice.number, 0);
  projectFound.numbers.sumPrice.value = formatCurrency(projectFound.numbers.sumPrice.number);

  projectFound.numbers.sumBudget.number = movementsFound.reduce((sum, mov) => sum + mov.numbers.sumBudget.number, 0);
  projectFound.numbers.sumBudget.value = formatCurrency(projectFound.numbers.sumBudget.number);

  projectFound.numbers.budgetUtility.number = projectFound.numbers.sumPrice.number - projectFound.numbers.sumBudget.number;
  projectFound.numbers.budgetUtility.value = formatCurrency(projectFound.numbers.budgetUtility.number);

  projectFound.numbers.budgetMargin.number = (projectFound.numbers.budgetUtility.number / projectFound.numbers.sumPrice.number) * 100;
  projectFound.numbers.budgetMargin.value = formatPercentage(projectFound.numbers.budgetMargin.number);

  await projectFound.save();
};

