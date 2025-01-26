const { Schema, model } = require("mongoose");
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
const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("new", "pending", "completed", "canceled")
    .required()
    .messages({
      "any.required": "The 'status' field is required.",
      "string.empty": "The 'status' field cannot be empty.",
      "any.only": "The 'status' field must be one of ['new', 'pending', 'completed', 'canceled'].",
    }),
});


// Схема для елементів у замовленні
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Схема для доставки
// const DeliverySchema = new Schema({
//   method: {
//     type: String,
//     enum: ["courier", "pickup", "postal"],
//     required: true,
//   },
//   address: {
//     type: String,
//     required: function () {
//       return this.method === "courier"; // Адреса потрібна тільки для доставки кур'єром
//     },
//   },
// });

// Схема для замовлення
const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{10}$/, // Перевірка на український номер телефону
  },
  items: {
    type: [ItemSchema],
    validate: {
      validator: (items) => items.length > 0,
      message: "Order must have at least one item.",
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // Прив'язка до моделі User
    required: true,
  },
  // date: {
  //   type: String, // Зберігається у форматі "18.01.2025, 19:10:43"
  //   default: () => new Date().toLocaleString(), // Автоматична генерація дати
  //   required: true,
  // },
  total: {
    type: Number,
    required: true,
    min: 0,
    default: 0, // Початкове значення, але буде розраховуватися автоматично
  },
  status: {
    type: String,
    enum: ["new", "pending", "completed", "canceled"],
    default: "new",
  },
  // delivery: {
  //   type: DeliverySchema,
  //   required: true,
  // },
}, { versionKey: false, timestamps: true });

// Хук для підрахунку total перед збереженням
OrderSchema.pre("save", function (next) {
  // Рахуємо загальну суму замовлення на основі items
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});


module.exports = {
  Order: model("order", OrderSchema),
  addSchema,
  updateStatusSchema,
};