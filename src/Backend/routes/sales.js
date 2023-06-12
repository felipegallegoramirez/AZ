const express = require("express");
const router = express.Router();
const sales = require("../controllers/sales.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createSaleSchema , updateSalesSchema , getSalesSchema} = require("../midleware/schemas/sales.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:shopid",checkpermision(3), sales.getSaless);
router.post("/:shopid",checkpermision(8),validatorHandler(createSaleSchema, 'body'), sales.soldPreview); 
router.get("/:shopid/:id",checkpermision(3),validatorHandler(getSalesSchema, 'params'), sales.getSales); 
router.put("/:shopid/:id",checkpermision(8),validatorHandler(getSalesSchema, 'params'),validatorHandler(updateSalesSchema, 'body') ,sales.editSales);
router.delete("/:shopid/:id",checkpermision(8),validatorHandler(getSalesSchema, 'params'), sales.deleteSales);


module.exports = router 