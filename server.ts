import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app: express.Application = express();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./database/db");

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
const port: any = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Connected to port " + port);
});
