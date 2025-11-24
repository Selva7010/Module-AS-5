// server/controllers/customerController.js
import Customer from "../models/customerModel.js";

export const createCustomer = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate fields
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        else{
            const TaskCreate = await Customer.create({ title, description });

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: TaskCreate
        });
        }

        

    } 
        catch (error) {
        res.status(400).json({ success: false, message: "Task Already created" });
    }
    }

// Get all Task
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Task by ID
export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Task not found" });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Task
export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ success: false, message: "Task not found" });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Task
export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Task not found" });
        res.json({ success: true, message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete All Task
export const deleteAllTask = async (req, res) => {
    try {
        const customer = await Customer.deleteMany({});
        if (!customer) return res.status(404).json({ success: false, message: "Task not found" });
        res.json({ success: true, message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
