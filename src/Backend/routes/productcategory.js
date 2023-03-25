const express = require("express");
const router = express.Router();
const productcategory = require("../controllers/controllersProducts/productcategory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createProductCategorySchema , updateProductCategorySchema , getProductCategorySchema} = require("../midleware/schemas/schemasProduct/productcategory.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(1), productcategory.getProductCategorys);
router.post("/",checkpermision(7),validatorHandler(createProductCategorySchema, 'body'),uploadimage.single('images'), productcategory.createProductCategory); 
router.get("/:shopid/:id",checkpermision(1),validatorHandler(getProductCategorySchema, 'params'), productcategory.getProductCategory); 
router.put("/:shopid/:id",checkpermision(7),validatorHandler(getProductCategorySchema, 'params'),validatorHandler(updateProductCategorySchema, 'body') ,productcategory.editProductCategory);
router.delete("/:shopid/:id",checkpermision(7),validatorHandler(getProductCategorySchema, 'params'), productcategory.deleteProductCategory);


module.exports = router 