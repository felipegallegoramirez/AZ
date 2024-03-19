const express = require("express");
const router = express.Router();
const {loginCtrl , message} = require("../controllers/login.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {LoginUserSchema} = require("../midleware/schemas/user.schema")


router.post("/",validatorHandler(LoginUserSchema,"body"), loginCtrl);
router.post("/:id",message);



module.exports = router 