const express = require("express");

const fileRouter = require("./routes/fileRouter");
const showRouter = require("./routes/showRouter");

const app = express();

app.use("/api/files", fileRouter);
app.use("/files", showRouter);
module.exports = app;
