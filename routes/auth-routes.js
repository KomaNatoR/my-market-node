const express = require("express");

const ctrl = require("../controllers/auth-controllers");
const { validateBody, authenticate } = require("../middlewares");
const joiSchemas = require("../models/user");



const router = express.Router();
router.post("/register", validateBody(joiSchemas.registerSchema), ctrl.register)
router.post("/login", validateBody(joiSchemas.loginSchema), ctrl.login)
router.get("/current", authenticate, ctrl.current)


module.exports = router;