const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../utils");



const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use!")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const result = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    name: result.name,
    email: result.email,
  })

};


module.exports = {
  register: ctrlWrapper(register),
};