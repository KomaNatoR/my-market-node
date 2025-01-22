const express = require("express");

const ctrl = require("../controllers/orders-controlers");
const { validateBody } = require("../utils");
const joiSchemas = require("../models/orders");



const orderRouter = express.Router();
orderRouter.get("/", ctrl.getAllOrders);
orderRouter.get("/:id", ctrl.findOneOrder);
orderRouter.put("/", validateBody(joiSchemas.addSchema), ctrl.createOrder);
orderRouter.post("/:id", validateBody(joiSchemas.addSchema), ctrl.updateOrder);
orderRouter.patch("/:id/status", validateBody(joiSchemas.updateStatusSchema), ctrl.updateOrderStatus);
orderRouter.delete("/:id", ctrl.deleteOrder);


module.exports = orderRouter;