const express = require("express");

const ctrl = require("../controllers/orders-controllers");
const { validateBody } = require("../utils");
const joiSchemas = require("../models/orders");



const router = express.Router();
router.get("/", ctrl.getAllOrders);
router.get("/:id", ctrl.findOneOrder);
router.put("/", validateBody(joiSchemas.addSchema), ctrl.createOrder);
router.post("/:id", validateBody(joiSchemas.addSchema), ctrl.updateOrder);
router.patch("/:id/status", validateBody(joiSchemas.updateStatusSchema), ctrl.updateOrderStatus);
router.delete("/:id", ctrl.deleteOrder);


module.exports = router;