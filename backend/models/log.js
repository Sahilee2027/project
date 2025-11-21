import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  action: String,
  taskId: String,
  updatedContent: Object
});

export default mongoose.model("Log", logSchema);
