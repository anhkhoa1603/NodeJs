const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
});

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
