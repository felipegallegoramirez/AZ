const express = require("express");
const router = express.Router();
const servicecategory = require("../controllers/controllersServices/servicecategory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createServiceCategorySchema , updateServiceCategorySchema , getServiceCategorySchema} = require("../midleware/schemas/schemasService/servicecategory.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(2), servicecategory.getServiceCategorys);
router.post("/",checkpermision(6),validatorHandler(createServiceCategorySchema, 'body'),uploadimage.single('images'), servicecategory.createServiceCategory); 
router.get("/:shopid/:id",checkpermision(2),validatorHandler(getServiceCategorySchema, 'params'), servicecategory.getServiceCategory); 
router.put("/:shopid/:id",checkpermision(6),validatorHandler(getServiceCategorySchema, 'params'),validatorHandler(updateServiceCategorySchema, 'body') ,servicecategory.editServiceCategory);
router.delete("/:shopid/:id",checkpermision(6),validatorHandler(getServiceCategorySchema, 'params'), servicecategory.deleteServiceCategory);


module.exports = router 