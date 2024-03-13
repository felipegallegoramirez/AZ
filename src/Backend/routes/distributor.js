const express = require("express");
const router = express.Router();
const distributor = require("../controllers/controllersDistributor/distributor.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createDistributorSchema , updateDistributorSchema , getDistributorSchema} = require("../midleware/schemas/schemasDistributor/distributorschema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(2), distributor.getDistributors);
router.post("/:shopid",checkpermision(6),validatorHandler(createDistributorSchema, 'body'), distributor.createDistributor); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getDistributorSchema, 'params'), distributor.getDistributor); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorSchema, 'params'),validatorHandler(updateDistributorSchema, 'body') ,distributor.editDistributor);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getDistributorSchema, 'params'), distributor.deleteDistributor);


module.exports = router 