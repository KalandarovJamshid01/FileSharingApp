const express = require("express");

const fileConntroller = require("./../controller/fileController");
const router = express.Router();

router.route("/:uuid").get(fileConntroller.downloadFile);

module.exports = router;
