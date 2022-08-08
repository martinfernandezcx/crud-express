import mongoose from "mongoose";

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Routes = require("./routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());

Routes.configure(app);

async function start() {
  await mongoose.connect("mongodb://localhost:27017/nodeTraining" );

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("connection", function () {
    console.log("Connected successfully");
  });

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
}

start().catch((err) => console.log(err));
