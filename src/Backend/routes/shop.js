const express = require("express");
const router = express.Router();
const shop = require("../controllers/shop.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createShopSchema , updateShopSchema , getShopSchema} = require("../midleware/schemas/shop.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/all/:shopid",checkpermision(10), shop.getShops);
router.get("/wa/:shopid", shop.GetWhatsAppShop);
router.post("/",checkpermision(10),validatorHandler(createShopSchema, 'body'), shop.createShop); 
router.get("/one/:shopid/:id",checkpermision(10),validatorHandler(getShopSchema, 'params'), shop.getShop); 
router.put("/:shopid/:id",checkpermision(10),validatorHandler(getShopSchema, 'params'),validatorHandler(updateShopSchema, 'body') ,shop.editShop);
router.delete("/:shopid/:id",checkpermision(0),validatorHandler(getShopSchema, 'params'), shop.deleteShop);


module.exports = router 