const TaskDB = require("../models/task");
const MemberDB = require("../models/member");

exports.createTask = async (req, res) => {
 try{
  const { title, description, status, assignedTo} = req.body;

  const checkUser = await MemberDB.findOne({ _id: req.user, role : "admin" });

  if (!checkUser){
    return res.status(401).json({
      success : false,
      message : "invalid token or user is not valid",
      data : {}
    });
  } 

  if (title == "" || description == "" || status == ""|| assignedTo == "") {
    return res.status(400).json({
      success: false,
      message: "please provide all field",
      data: {},
    });
  }

  const addTaskData = await TaskDB.create({
    title,
    description,
    status,
    assignedTo,
    createBy:checkUser._id,
  });

  if (!addTaskData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(201).json({
    success: true,
    message: "task added successfully",
    data: addTaskData,
  });
 }catch (error) {
    res.status(500).json({ error: error.message });
 }
};

exports.editTask = async (req, res) => {
  try {
    
  const checkUser = req.user;
  const { status, task_id} = req.body;

  if (!checkUser || !task_id) {
    res.status(404).json({status:false, message: "no user or task id" });
  }

  const memberCheck = await MemberDB.findOne({_id : checkUser})

  if(!memberCheck){
    return res.status(404).json({status:false, message: "something went wrong" });
  }

  if(memberCheck.role !== "user"){
    return res.status(400).json({
      success : false,
      message : "invalid user",
      data : {}
    })
  }

  const updateTask = await TaskDB.findByIdAndUpdate(
    task_id,
    { status },
    { new: true }
  );

  if (!updateTask) {
    return res.send("something went wrong");
  }

  res.status(200).json({
    success: true,
    message: "updated successfully",
    data: updateTask,
  });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
