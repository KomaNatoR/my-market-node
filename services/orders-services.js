const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");



const ordersPath = path.join(__dirname, "../db/my-market/orders.json");

const getAll = async () => {
  const orders = await fs.readFile(ordersPath, "utf-8");

  return JSON.parse(orders);
}
const add = async ({ name, phone, items }) => {
  const total = items.reduce((sum, { quantity, price }) => sum + quantity * price, 0);
  
  const newOrder = {
    id: nanoid(),
    name,
    phone,
    items,
    date: new Date().toLocaleString(),
    total,
    status: "pending",
    delivery: {"method": "courier", "address": "Vinnytsia, Main St. 10"}
  }

  const orders = await getAll();
  orders.push(newOrder);
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));

  return newOrder;
}
const remove = async(orderId) => {
  const orders = await getAll();
  const index = orders.findIndex(item => item.id === orderId);
  if (index === -1) return null;
  const [result] = orders.splice(index, 1);
  await fs.writeFile(ordersPath, JSON.stringify(orders, null, 2));
  return result;
}


module.exports = {
  getAll,
  add,
  remove,
}