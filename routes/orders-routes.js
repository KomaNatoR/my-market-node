const express = require("express");

const ctrl = require("../controllers/orders-controllers");
const { validateBody, isValidId } = require("../middlewares");
const joiSchemas = require("../models/orders");



const router = express.Router();
router.get("/", ctrl.getAllOrders);
router.get("/:id", isValidId, ctrl.findOneOrder);
router.put("/", validateBody(joiSchemas.addSchema), ctrl.createOrder);
router.post("/:id", isValidId, validateBody(joiSchemas.addSchema), ctrl.updateOrder);
router.patch("/:id/status", isValidId, validateBody(joiSchemas.updateStatusSchema), ctrl.updateOrderStatus);
router.delete("/:id", isValidId, ctrl.deleteOrder);


module.exports = router;