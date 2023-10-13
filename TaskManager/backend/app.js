const express = require("express");

const app = express();

// module import
const cors = require("cors");
const cookieParser = require("cookie-parser");
const memberRoute = require("./routes/member");
const taskRoute = require("./routes/task");

// middleware for request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Welcome to Portal...");
});
//api
app.use("/api/member", memberRoute);
app.use("/api/task", taskRoute);

// Error Middleware
const ErrorMiddleware = require("./middleware/ErrorMiddleware");
app.use(ErrorMiddleware);

module.exports = app;
