const MemberDB = require("../models/member");
const TaskDB = require("../models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.createMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await MemberDB.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new MemberDB({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginMember = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await MemberDB.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        success: true,
        message: "login successfully",
        data: user,
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.taskList = async (req, res) => {
  try {
    const userId = req.user;

    const checkUser = await MemberDB.findOne({ _id: userId });

    if (!checkUser) {
      res.status(404).json({ status: false, message: "invalid user" });
    }

    let filterObj = {};

    if (checkUser.role == "user") {
      filterObj = { assignedTo: userId };
    } else {
      filterObj = {};
    }

    const taskList = await TaskDB.find( filterObj ).populate("assignedTo").sort({createdAt : -1});

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data: taskList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.memberList = async (req, res) => {
  try {
    const user = await MemberDB.find({role : "user"});

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
