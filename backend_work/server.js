const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./Controllers/userController");
const userRouters = require("./Routers/userRouters");
const path = require("path");
const { SendingTheMail } = require("./Controllers/mailSender");



const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});

app.get("/", (_, res) => {
  res.send("Server is working");
});

app.use("/", userRouters);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));





app.post("/sendEmail",SendingTheMail );





app.use(errorHandler);

app.listen(process.env.PORT || 3320, () => {
  console.log("Server is running on port 3320");
});
