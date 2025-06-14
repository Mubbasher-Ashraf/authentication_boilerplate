/**
 * Generic validation middleware
 * @param {Object} schema - Validation schema for request parts
 * @returns {Function} Middleware function
 */
export const validateRequest = (schema) => (req, res, next) => {
  const validationErrors = [];

  // Validate each schema part (body, params, query)
  ['body', 'params', 'query'].forEach((key) => {
    if (schema[key]) {
      const { error } = schema[key].validate(req[key], { abortEarly: false });

      if (error)
        validationErrors.push(
          ...error.details.map((err) => ({
            field: err.context.key,
            message: err.message,
          }))
        );
    }
  });

  if (validationErrors.length > 0)
    return res.status(400).json({
      errors: validationErrors,
    });

  next();
};