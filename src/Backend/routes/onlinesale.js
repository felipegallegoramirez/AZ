const express = require("express");
const router = express.Router();
const onlineSale = require("../controllers/online-sale.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createOnlineSaleSchema , updateOnlinesaleSchema , getOnlinesaleSchema} = require("../midleware/schemas/online-sale.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:shopid",checkpermision(3), onlineSale.getOnlineSales);
router.post("/:shopid",checkpermision(1),validatorHandler(createOnlineSaleSchema, 'body'), onlineSale.soldPreview); 
router.get("/:shopid/:id",checkpermision(3),validatorHandler(getOnlinesaleSchema, 'params'), onlineSale.getOnlineSale); 
router.put("/:shopid/:id",checkpermision(8),validatorHandler(getOnlinesaleSchema, 'params'),validatorHandler(updateOnlinesaleSchema, 'body') ,onlineSale.editOnlineSale);
router.delete("/:shopid/:id",checkpermision(8),validatorHandler(getOnlinesaleSchema, 'params'), onlineSale.deleteOnlineSale);


module.exports = router 