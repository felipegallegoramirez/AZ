const express = require("express");
const router = express.Router();
const workstation = require("../controllers/controllersServices/workstation.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createWorkStationSchema , updateWorkStationSchema , getWorkStationSchema} = require("../midleware/schemas/schemasService/workstation.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:shopid",checkpermision(2), workstation.getWorkStations);
router.post("/",checkpermision(6),validatorHandler(createWorkStationSchema, 'body'), workstation.createWorkStation); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getWorkStationSchema, 'params'), workstation.getWorkStation); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getWorkStationSchema, 'params'),validatorHandler(updateWorkStationSchema, 'body') ,workstation.editWorkStation);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getWorkStationSchema, 'params'), workstation.deleteWorkStation);


module.exports = router 