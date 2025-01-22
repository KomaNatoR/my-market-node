const express = require("express");

const ctrl = require("../controllers/orders-controlers");
const { validateBody } = require("../utils");
const joiSchemas = require("../models/orders");



const orderRouter = express.Router();
orderRouter.get("/", ctrl.getAllOrders);
orderRouter.post("/", validateBody(joiSchemas.addSchema), ctrl.createOrder);
// orderRouter.delete("/:id", ctrl.deleteOrder);


module.exports = orderRouter;