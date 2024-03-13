const express = require("express");
const router = express.Router();
const distributorhistory = require("../controllers/controllersDistributor/distributorhistory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createDistributorHystorySchema , updateDistributorHystorySchema , getDistributorHystorySchema} = require("../midleware/schemas/schemasDistributor/distributorhistoryschema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(2), distributorhistory.getDistributorHistorys);
router.post("/:shopid",checkpermision(6),validatorHandler(createDistributorHystorySchema, 'body'),uploadimage.single('images'), distributorhistory.createDistributorHistory); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getDistributorHystorySchema, 'params'), distributorhistory.getDistributorHistory); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorHystorySchema, 'params'),validatorHandler(updateDistributorHystorySchema, 'body') ,distributorhistory.editDistributorHistory);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorHystorySchema, 'params'), distributorhistory.deleteDistributorHistory);


module.exports = router 