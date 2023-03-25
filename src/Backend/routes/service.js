const express = require("express");
const router = express.Router();
const service = require("../controllers/controllersServices/service.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createServiceSchema , updateServiceSchema , getServiceSchema} = require("../midleware/schemas/schemasService/service.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(2), service.getServices);
router.post("/",checkpermision(6),validatorHandler(createServiceSchema, 'body'),uploadimage.single('images'), service.createService); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getServiceSchema, 'params'), service.getService); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getServiceSchema, 'params'),validatorHandler(updateServiceSchema, 'body') ,service.editService);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getServiceSchema, 'params'), service.deleteService);


module.exports = router 