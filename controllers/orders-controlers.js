const orders = require("../services/orders-services");
const { HttpError, ctrlWrapper } = require("../utils");


const getAllOrders = async (_, res) => {
  const data = await orders.getAll();
  res.json(data);
};
const createOrder = async (req, res) => {
  const result = await orders.add(req.body);
  res.status(201).json(result);
};
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const data = await orders.remove(id);
  if (!data) {
    throw HttpError(404, `Contact with ${id} not found!`)
  }
  res.json(data);
};


module.exports = {
  getAllOrders,
  createOrder: ctrlWrapper(createOrder),
  deleteOrder: ctrlWrapper(deleteOrder),
};