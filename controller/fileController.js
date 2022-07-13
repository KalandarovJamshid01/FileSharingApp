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
}).single("myfile");

const addFile = async (req, res) => {
  //Validate request
  if (!req.file) {
    return res.json({ error: "All fileds are required" });
  }

  //Storage file
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    //Store in Database
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.siza,
    });
  });
  const response = await file.save();
  return res.json({
    file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    
  });
};

module.exports = { addFile };
