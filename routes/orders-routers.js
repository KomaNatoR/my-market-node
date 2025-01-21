const express = require("express");

const ctrl = require("../controllers/orders-controlers");
const { validateBody } = require("../utils");
const schemas = require("../schemas/orders-schemas");



const orderRouter = express.Router();
orderRouter.get("/", ctrl.getAllOrders);
orderRouter.post("/", validateBody(schemas.addSchema), ctrl.createOrder);
// orderRouter.delete("/:id", ctrl.deleteOrder);


module.exports = orderRouter;