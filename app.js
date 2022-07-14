const express = require("express");
const path = require("path");
const fileRouter = require("./routes/fileRouter");
const ejs = require("ejs");
const app = express();

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use("/api/files", fileRouter);
app.use("/files", fileRouter);
module.exports = app;
