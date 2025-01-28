const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
require("dotenv").config();

const createAdmin = async () => {
  try {
    // Підключення до бази даних
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Підключення до бази даних успішне!");

    // Перевірка наявності адміністратора
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Адміністратор вже існує!");
      return;
    }

    // Хешування пароля та створення адміністратора
    const hashedPassword = await bcrypt.hash("123", 10);
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Адміністратор успішно створений!");
  } catch (error) {
    console.error("Помилка:", error.message);
  } finally {
    // Закриття підключення до бази даних
    mongoose.connection.close();
  }
};

createAdmin();