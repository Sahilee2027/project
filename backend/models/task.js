import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
