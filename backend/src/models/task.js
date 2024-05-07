import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  work: { type: String },
  productUrl: { type: String },
  status: { type: String, default: "Pending" },
  submittedAt: { type: Date },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const taskModel = mongoose.model("tasks", taskSchema);
export default taskModel;
