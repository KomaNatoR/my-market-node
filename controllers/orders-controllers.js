const { Order } = require("../models/orders");
const { HttpError, ctrlWrapper } = require("../utils");


const getAllOrders = async (_, res) => {
  const data = await Order.find({},"-status -updatedAt"); //,"-status -updatedAt" - не показувати ці поля!
  res.json(data);

};
const createOrder = async (req, res) => {
  const result = await Order.create(req.body);
  res.status(201).json(result);

};
const findOneOrder = async (req, res) => {
  const { id } = req.params;
  // const result = await Order.findOne({ _id: id }); - зазвичай використовують для пошуку по якомусь одному параметру крім ід!
  const result = await Order.findById(id);
  if (!result) {
    throw HttpError(404, `Order with ${id} not found!`)
  }
  res.json(result);

};
const updateOrder = async (req, res) => {
  const { id } = req.params;
  // const result = await Order.findByIdAndUpdate(id, req.body); - повертає старий обєкт!
  const result = await Order.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Order with ${id} not found!`)
  }
  res.json(result);

};
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const result = await Order.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Order with ${id} not found!`)
  }
  res.json(result);

};
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const data = await Order.findByIdAndDelete(id);
  if (!data) {
    throw HttpError(404, `Order with ${id} not found!`)
  }
  res.json({mesaage:"Delete success!"});
};


module.exports = {
  getAllOrders: ctrlWrapper(getAllOrders),
  createOrder: ctrlWrapper(createOrder),
  findOneOrder: ctrlWrapper(findOneOrder),
  updateOrder: ctrlWrapper(updateOrder),
  updateOrderStatus: ctrlWrapper(updateOrderStatus),
  deleteOrder: ctrlWrapper(deleteOrder),
};