import taskModel from "../models/task.js";
import userModel from "../models/user.js";
import mongoose from "../models/index.js";

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Check if the assigned user exists
    const existingUser = await userModel.findOne({ email: assignedTo });

    if (!existingUser) {
      return res.status(400).json({
        message: "User not found for the provided email",
      });
    }

    // Create the task
    const task = await taskModel.create({
      title,
      description,
      createdBy: req.headers.userId,
      assignedTo: existingUser._id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const assignedTo = req.headers.userId;

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const tasks = await taskModel.find({ assignedTo });

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTaskbyTaskId = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const submitTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { work, productUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status === "Submitted") {
      return res
        .status(400)
        .json({ message: "Task has already been submitted" });
    }
    task.status = "Submitted";
    task.work = work;
    task.productUrl = productUrl;
    task.submittedAt = new Date();

    await task.save();

    res.status(200).json({ message: "Task submitted successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    let tasks;
    if (status && status.toLowerCase() === "all") {
      tasks = await taskModel.find().populate("assignedTo", "email name");
    } else if (status) {
      tasks = await taskModel
        .find({ status })
        .populate("assignedTo", "email name");
    } else {
      return res.status(400).json({ message: "Status parameter is required" });
    }

    if (tasks.length === 0) {
      return res
        .status(200)
        .json({ message: `No tasks with status ${status} found` });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllTask = async (req, res) => {
  try {
    const tasks = await taskModel.find();

    if (tasks.length === 0) {
      return res
        .status(200)
        .json({ totalTasks: 0, pendingTasks: 0, submittedTasks: 0, tasks });
    }

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;
    const submittedTasks = tasks.filter(
      (task) => task.status === "Submitted"
    ).length;

    res.status(200).json({
      totalTasks,
      pendingTasks,
      submittedTasks,
      tasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const getTasksData = async (req, res) => {
  try {
    const tasks = await taskModel.find();

    if (tasks.length === 0) {
      return res
        .status(200)
        .json({ totalTasks: 0, pendingTasks: 0, submittedTasks: 0 });
    }

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "Pending"
    ).length;
    const submittedTasks = tasks.filter(
      (task) => task.status === "Submitted"
    ).length;

    res.status(200).json({
      totalTasks,
      pendingTasks,
      submittedTasks,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskModel.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, assignedTo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!title || !description || !assignedTo) {
      return res.status(400).json({
        message:
          "These (title, description, assignedTo) must be provided for update",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ message: "Invalid assignedTo ID" });
    }

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (assignedTo) {
      const isValidAssignedTo = await userModel.findById(assignedTo);
      if (!isValidAssignedTo) {
        return res.status(400).json({ message: "Invalid assignedTo ID" });
      }

      task.assignedTo = assignedTo;
    }

    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export default {
  createTask,
  getTaskById,
  getTaskbyTaskId,
  submitTask,
  getTasksByStatus,
  getAllTask,
  getTasksData,
  deleteTask,
  editTask,
};
