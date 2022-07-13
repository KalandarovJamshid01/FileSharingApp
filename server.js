const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const app = require("./app");
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_CONNECTION_URL, {})
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Listening port on ${port}`);
});
