const express = require("express");
const path = require("path");
const fileRouter = require("./routes/fileRouter");
const downloadRouter = require("./routes/downloadRouter");
const ejs = require("ejs");
const exp = require("constants");
const app = express();

app.use(express.static("public"));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/files/download/", downloadRouter);

app.use("/api/files", fileRouter);
app.use("/files", fileRouter);

app.use(() => {
  console.log("error");
});

module.exports = app;
