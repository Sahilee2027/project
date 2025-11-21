import Task from "../models/Task.js";
import Log from "../models/Log.js";

// ===================== GET TASKS =====================
export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;

    const filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ]
    };

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    res.json({
      data: tasks,
      total,
      page: parseInt(page),
      limit: parseInt(limit)
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== CREATE TASK =====================
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return res.status(400).json({ error: "Fields cannot be empty" });

    const task = await Task.create({ title, description });

    await Log.create({
      action: "Create Task",
      taskId: task._id,
      updatedContent: { title, description }
    });

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== UPDATE TASK =====================
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

    await Log.create({
      action: "Update Task",
      taskId: id,
      updatedContent: body
    });

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== DELETE TASK =====================
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    await Task.findByIdAndDelete(id);

    await Log.create({
      action: "Delete Task",
      taskId: id,
      updatedContent: null
    });

    res.json({ message: "Task deleted" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
