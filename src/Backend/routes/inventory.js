const express = require("express");
const router = express.Router();
const inventory = require("../controllers/controllersProducts/inventory.controller")
const validatorHandler = require("../midleware/verificatorSchemas")
const { createInventorySchema, updateInventorySchema, getInventorySchema } = require("../midleware/schemas/schemasProduct/inventory.schema")
const { checkAuth, checkpermision } = require('../midleware/authverify')
const ToNumber = require("../midleware/toNumber")


const { uploadimage } = require("../utils/savestorage")

router.get("/:shopid", checkpermision(1), inventory.getInventorys);
router.post("/:shopid", checkpermision(7), validatorHandler(createInventorySchema, 'body'), inventory.createInventory);
router.post("/i/:shopid", checkpermision(7),uploadimage.single('images'), ToNumber(['points', 'price','count']), validatorHandler(createInventorySchema, 'body'),  inventory.createInventory);
router.get("/:shopid/:id", checkpermision(1), validatorHandler(getInventorySchema, 'params'), inventory.getInventory);
router.put("/:shopid/:id", checkpermision(7), validatorHandler(getInventorySchema, 'params'), validatorHandler(updateInventorySchema, 'body'), inventory.editInventory);
router.put("/i/:shopid/:id", checkpermision(7),uploadimage.single('images'), ToNumber(['points', 'price','count']), validatorHandler(getInventorySchema, 'params'), validatorHandler(updateInventorySchema, 'body'), inventory.editInventory);
router.delete("/:shopid/:id", checkpermision(7), validatorHandler(getInventorySchema, 'params'), inventory.deleteInventory);


module.exports = router 