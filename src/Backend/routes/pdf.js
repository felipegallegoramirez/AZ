const express = require("express");
const router = express.Router();
const pdf = require("../controllers/pdf.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')


router.get("/:shopid/:id",checkpermision(1), pdf.getPDF);
router.post("/:shopid",checkpermision(1), pdf.sendPDF);


module.exports = router 