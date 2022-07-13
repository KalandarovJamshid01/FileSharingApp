const express = require("express");

const fileRouter = require("./routes/fileRouter");

const app = express();

app.use("/api/files", fileRouter);
