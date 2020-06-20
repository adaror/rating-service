const joi = require('joi');

const validationOptions = {
  abortEarly: false,
};

const relevantAppSchema = joi.object().keys({
    age: joi.number().integer().min(0).required(),
    category: joi.string().min(1).required(),
    customerType: joi.string().lowercase().valid('bronze', 'silver', 'gold').required()
  });

  const validateRelevantAppSchema = (req, res, next) => {
    const validationResult = joi.validate(req.query, relevantAppSchema, validationOptions);
    validationResult.error ? res.status(400).send(validationResult.error.message) : next();
  };

  module.exports = {
    validateRelevantAppSchema
  }