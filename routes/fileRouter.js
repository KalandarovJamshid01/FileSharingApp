const express = require("express");

const fileConntroller = require("./../controller/fileController");
const router = express.Router();

router.route("/").post(fileConntroller.addFile);
router.route("/:uuid").get(fileConntroller.getFile);

module.exports = router;
