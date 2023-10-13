const Router = require("express").Router();
const { createMember, loginMember, taskList, memberList } = require("../controllers/member");
const { verifyToken } = require("../middleware/jwtCheck");


Router.route("/register-member").post(createMember);
Router.route("/login-member").post(loginMember);
Router.route("/member-list").get(verifyToken, memberList);
Router.route("/task-list").get(verifyToken, taskList);

module.exports = Router;
