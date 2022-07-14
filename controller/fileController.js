const multer = require("multer");
const path = require("path");
const File = require("./../models/filemodel");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myfile2");

const addFile = async (req, res) => {
  //Storage file
  upload(req, res, async (err) => {
    //Validate request

    if (!req.file) {
      return res.json({ error: "All fileds are required" });
    }

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    //Store in Database
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
};

const getFile = async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render("download", { error: "Link has been expired" });
    }

    return res.render("download", {
      uuid: file.uuid,
      filename: file.filename,
      fileSize: file.size,
      download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (error) {
    return res.render("download", { error: "Something wrong" });
  }
};

const downloadFile = async (req, res) => {
  console.log("hello");
  const file = await File.findOne({ uuid: req.params.uuid });
  if (!file) {
    return res.render("download", {
      error: "Link has been expired",
    });
  }
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
  console.log(file.path);
};

const sendEmail = async (req, res) => {};

module.exports = { addFile, getFile, downloadFile, sendEmail };
