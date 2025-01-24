const express = require("express");

const ctrl = require("../controllers/auth-controllers");
const { validateBody, isValidId } = require("../middlewares");
const joiSchemas = require("../models/user");



const router = express.Router();
router.post("/register", validateBody(joiSchemas.registerSchema), ctrl.register)


module.exports = router;