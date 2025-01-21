const { Schema, model } = require("mongoose");


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
  date: {
    type: String, // Зберігається у форматі "18.01.2025, 19:10:43"
    default: () => new Date().toLocaleString(), // Автоматична генерація дати
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
    default: 0, // Початкове значення, але буде розраховуватися автоматично
  },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
  // delivery: {
  //   type: DeliverySchema,
  //   required: true,
  // },
});

// Хук для підрахунку total перед збереженням
OrderSchema.pre("save", function (next) {
  // Рахуємо загальну суму замовлення на основі items
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});


module.exports = model("order", OrderSchema);