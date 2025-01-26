const express = require("express");

const ctrl = require("../controllers/orders-controllers");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const joiSchemas = require("../models/orders");


const router = express.Router();
// router.get("/", ctrl.getAllOrders);
router.get("/", authenticate, ctrl.getAllOrders);
router.get("/:id", authenticate, isValidId, ctrl.findOneOrder);
router.post("/", authenticate, validateBody(joiSchemas.addSchema), ctrl.createOrder);
router.put("/:id", authenticate, isValidId, validateBody(joiSchemas.addSchema), ctrl.updateOrder);
router.patch("/:id/status", authenticate, isValidId, validateBody(joiSchemas.updateStatusSchema), ctrl.updateOrderStatus);
router.delete("/:id", authenticate, isValidId, ctrl.deleteOrder);


module.exports = router;