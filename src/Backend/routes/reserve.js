const express = require("express");
const router = express.Router();
const reserve = require("../controllers/controllersServices/reserve.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createReserveSchema , updateReserveSchema , getReserveSchema} = require("../midleware/schemas/schemasService/reserve.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:shopid",checkpermision(4), reserve.getReserves);
router.post("/",checkpermision(2),validatorHandler(createReserveSchema, 'body'), reserve.createReserve); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getReserveSchema, 'params'), reserve.getReserve); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getReserveSchema, 'params'),validatorHandler(updateReserveSchema, 'body') ,reserve.editReserve);
router.delete("/:shopid/:id",checkpermision(2),validatorHandler(getReserveSchema, 'params'), reserve.deleteReserve);


module.exports = router 