const { Schema, model } = require("mongoose");
const Joi = require('joi');

const { handleMongooseError } = require("../utils");



const emeilRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegExp = ^[a-zA-Z0-9!@#$%^&*()_+]*$;

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
    }),
  
  password: Joi.string()
    .min(3) // Мінімальна довжина 8 символів
    .max(32) // Максимальна довжина 32 символи (опціонально)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]*$")) // Тільки дозволені символи
    .required() // Поле обов'язкове
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 3 characters long",
      "string.max": "Password must not exceed 32 characters",
      "string.pattern.base": "Password can only contain letters, numbers, and special characters (!@#$%^&*()_+)",
      "any.required": "Password is required",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } }) // Перевірка на правильний формат імейлу
    .pattern(emeilRegExp)              // Перевірка щоб співпадало з Mongoose виразом!
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
});
const loginSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 3 characters long.',
    }),
  
  password: Joi.string()
    .min(3) // Мінімальна довжина 3 символа
    .max(32) // Максимальна довжина 32 символи (опціонально)
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]*$")) // Тільки дозволені символи
    .required() // Поле обов'язкове
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 3 characters long",
      "string.max": "Password must not exceed 32 characters",
      "string.pattern.base": "Password can only contain letters, numbers, and special characters (!@#$%^&*()_+)",
      "any.required": "Password is required",
    }),

});


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 3, // Мінімальна довжина пароля
    maxlength: 32, // Максимальна довжина пароля
    validate: {
      validator: function (value) {
        // Регулярний вираз для перевірки дозволених символів
        return /^[a-zA-Z0-9!@#$%^&*()_+]*$/.test(value);
      },
      message:
        "Password must contain only letters, numbers, and special characters (!@#$%^&*()_+).",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"], // Поле є обов'язковим
    unique: true, // Унікальність email у базі даних
    lowercase: true, // Переводить значення у нижній регістр
    trim: true, // Видаляє пробіли на початку і в кінці
    match: [
      emeilRegExp, // Регулярний вираз для перевірки email
      "Please provide a valid email address", // Повідомлення про помилку
    ],
  },
}, { versionKey: false, timestamps: true });
userSchema.post("save", handleMongooseError); // робить правильний код помилки!


module.exports = {
  User: model("user", userSchema),
  registerSchema,
  loginSchema,
};