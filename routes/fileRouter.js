const express = require("express");

const fileConntroller = require("./../controller/fileController");
const router = express.Router();

router.route("/").post(fileConntroller.addFile);
module.exports = router;
