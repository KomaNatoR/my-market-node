const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../utils");



const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use!")
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    name: result.name,
    email: result.email,
  })

};
const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid!")
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid!")
  }
  const payload = { id: user._id, };
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
  res.json({ token, });

};
const current = async (req, res) => { 
  const { name, email } = req.user;
  res.json({ name, email });

}



module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(login),
};