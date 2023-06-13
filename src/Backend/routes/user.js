const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createUserSchema , updateUserSchema , getUserSchema, createAdmonSchema} = require("../midleware/schemas/user.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/",checkpermision(1000), user.getUsers);
router.get("/:shopid",checkpermision(9), user.getEmployee);
router.post("/:shopid",checkpermision(9),validatorHandler(createUserSchema, 'body'), user.addEmployee); 
router.put("/:shopid/:id",checkpermision(9),validatorHandler(createUserSchema, 'body'), user.editEmployee); 
router.post("/register",validatorHandler(createAdmonSchema, 'body'), user.register); 
router.get("/:shopid/:id",checkpermision(9),validatorHandler(getUserSchema, 'params'), user.getUser); 
//router.put("/:shopid/:id",checkpermision(9),validatorHandler(getUserSchema, 'params'),validatorHandler(updateUserSchema, 'body') ,user.editUser);
router.delete("/:shopid/:id",checkpermision(9),validatorHandler(getUserSchema, 'params'), user.deleteUser);


module.exports = router 