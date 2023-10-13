const Router = require("express").Router();

const { createTask, editTask, deleteTask } = require("../controllers/task");
const { verifyToken } = require("../middleware/jwtCheck");

Router.route("/create-task").post(verifyToken, createTask);
Router.route("/edit-task").put(verifyToken, editTask);

module.exports = Router;
