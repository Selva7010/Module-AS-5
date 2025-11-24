// server/models/customerModel.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    
});

const TaskManager = mongoose.models.TaskManager || mongoose.model("TaskManager", customerSchema);

export default TaskManager;
