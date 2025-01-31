const { Order } = require("../models/orders");
const { HttpError, ctrlWrapper } = require("../utils");


const getAllOrders = async (req, res) => {
  const { role, _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit; // пагінація
  // const data = await Order.find({ owner }, "-status -updatedAt");
  // Адміністратор бачить всі замовлення, користувач — тільки свої
  const filter = role === "admin" ? {} : { owner: _id };
  const data = await Order.find(filter, "-status -updatedAt", { skip, limit }).populate("owner", "name email");  //,"-status -updatedAt" - не показувати ці поля!
  res.json(data);

};
const createOrder = async (req, res) => {
  const { _id: owner } = req.user;
  const { comment = "" } = req.body;
  
  const result = await Order.create({ ...req.body, comment, owner });
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