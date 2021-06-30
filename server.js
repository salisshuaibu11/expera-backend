const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./database/db.js");

// Connecting mongoDB Database
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const memberRoutes = require("./routes/memberRoutes.js");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use("/members", memberRoutes);
app.use("/admins/", adminRoutes);

// 404 Error
app.use(notFound);
app.use(errorHandler);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
