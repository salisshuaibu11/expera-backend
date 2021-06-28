const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./database/db.js');

// Connecting mongoDB Database
connectDB();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const memberRoutes = require('./routes/memberRoutes.js');

app.use(cors());
app.use("/members", memberRoutes);

// PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  console.log("404");
  next();
});

app.use((err, req, res, next) => {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
