const express = require("express");
const router = express.Router();
const clients = require("../controllers/clients.controller")
const validatorHandler  = require("../midleware/verificatorSchemas")
const {createClientsSchema , updateClientsSchema , getClientsSchema} = require("../midleware/schemas/clients.schema")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/:shopid",checkpermision(11), clients.getClientss);
router.post("/:shopid",checkpermision(11),validatorHandler(createClientsSchema, 'body'), clients.createClients); 
router.get("/:shopid/:id",checkpermision(11),validatorHandler(getClientsSchema, 'params'), clients.getClients); 
router.put("/:shopid/:id",checkpermision(11),validatorHandler(getClientsSchema, 'params'),validatorHandler(updateClientsSchema, 'body') ,clients.editClients);
router.delete("/:shopid/:id",checkpermision(0),validatorHandler(getClientsSchema, 'params'), clients.deleteClients);


module.exports = router 