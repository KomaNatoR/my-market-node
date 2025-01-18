const Joi = require('joi');


const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
    }),
  
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone is required.',
      'string.pattern.base': 'Phone must be a valid 10-digit number (e.g., 0975555555).',
    }),
  
  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .required()
          .messages({ 'string.empty': 'Item name is required.' }),
        
        quantity: Joi.number()
          .integer()
          .positive()
          .required()
          .messages({
            'number.base': 'Quantity must be a positive integer.',
            'number.positive': 'Quantity must be greater than 0.',
          }),
        
        price: Joi.number()
          .positive()
          .required()
          .messages({
            'number.base': 'Price must be a positive number.',
            'number.positive': 'Price must be greater than 0.',
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Items must be an array.',
      'array.min': 'At least one item is required in the order.',
    }),
});


module.exports = {
    addSchema
};