const express = require("express");
const router = express.Router();
const inventory = require("../controllers/controllersProducts/inventory.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createInventorySchema , updateInventorySchema , getInventorySchema} = require("../midleware/schemas/schemasProduct/inventory.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')


const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid",checkpermision(1), inventory.getInventorys);
router.post("/",checkpermision(7),validatorHandler(createInventorySchema, 'body'),uploadimage.single('images') , inventory.createInventory); 
router.get("/:shopid/:id",checkpermision(1),validatorHandler(getInventorySchema, 'params'), inventory.getInventory); 
router.put("/:shopid/:id",checkpermision(7),validatorHandler(getInventorySchema, 'params'),validatorHandler(updateInventorySchema, 'body') ,inventory.editInventory);
router.delete("/:shopid/:id",checkpermision(7),validatorHandler(getInventorySchema, 'params'), inventory.deleteInventory);


module.exports = router 