const express = require("express");
const router = express.Router();
const distributorhistory = require("../controllers/controllersDistributor/distributorhistory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createDistributorHistorySchema , updateDistributorHistorySchema , getDistributorHistorySchema} = require("../midleware/schemas/schemasDistributor/distributorhistoryschema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(2), distributorhistory.getDistributorHistorys);
router.post("/",checkpermision(6),validatorHandler(createDistributorHistorySchema, 'body'),uploadimage.single('images'), distributorhistory.createDistributorHistory); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getDistributorHistorySchema, 'params'), distributorhistory.getDistributorHistory); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorHistorySchema, 'params'),validatorHandler(updateDistributorHistorySchema, 'body') ,distributorhistory.editDistributorHistory);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorHistorySchema, 'params'), distributorhistory.deleteDistributorHistory);


module.exports = router 