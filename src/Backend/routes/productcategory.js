const express = require("express");
const router = express.Router();
const productcategory = require("../controllers/controllersProducts/productcategory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createPCategorySchema, updatePCategorySchema, getPCategorySchema} = require("../midleware/schemas/schemasProduct/productcategory.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(1), productcategory.getProductCategorys);
router.post("/i/:shopid",checkpermision(7),uploadimage.single('images'),validatorHandler(createPCategorySchema, 'body'), productcategory.createProductCategory);
router.post("/:shopid",checkpermision(7),validatorHandler(createPCategorySchema, 'body'), productcategory.createProductCategory); 
router.get("/:shopid/:id",checkpermision(1),validatorHandler(getPCategorySchema, 'params'), productcategory.getProductCategory); 
router.put("/:shopid/:id",checkpermision(7),validatorHandler(getPCategorySchema, 'params'),validatorHandler(updatePCategorySchema, 'body') ,productcategory.editProductCategory);
router.put("/i/:shopid/:id",checkpermision(7),uploadimage.single('images') ,validatorHandler(getPCategorySchema, 'params'),validatorHandler(updatePCategorySchema, 'body'),productcategory.editProductCategory);
router.delete("/:shopid/:id",checkpermision(7),validatorHandler(getPCategorySchema, 'params'), productcategory.deleteProductCategory);


module.exports = router 