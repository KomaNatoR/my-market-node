const Order = require("../models/orders");
const { HttpError, ctrlWrapper } = require("../utils");


const getAllOrders = async (_, res) => {
  const data = await Order.find();
  res.json(data);
};
const createOrder = async (req, res) => {
  const result = await Order.create(req.body);
  res.status(201).json(result);
};
// const deleteOrder = async (req, res) => {
//   const { id } = req.params;
//   const data = await orders.remove(id);
//   if (!data) {
//     throw HttpError(404, `Contact with ${id} not found!`)
//   }
//   res.json(data);
// };


module.exports = {
  getAllOrders,
  createOrder: ctrlWrapper(createOrder),
  // deleteOrder: ctrlWrapper(deleteOrder),
};