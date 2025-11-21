import Log from "../models/Log.js";
import Task from "../models/Task.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("taskId", "title")
      .sort({ timestamp: -1 });   // FIXED

    res.json({
      data: logs,
      total: logs.length
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
