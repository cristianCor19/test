export const validateRequestBody = (schema) => (req, res, next) => {
  try {
      const result = schema.parse(req.body)
      req.validateBody = result
      next();
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Error de validación",
      errors: error.errors.map((err) => err.message),
    });
  }
}


export const validateRequestQuery = (schema) => {
  return (req, res, next) => {
    try {
      // Validar query parameters
      const result = schema.parse(req.query);
      req.validatedQuery = result; 
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Error de validación",
        errors: error.errors.map((err) => err.message),
      });
    }
  };
};