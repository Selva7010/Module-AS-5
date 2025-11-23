// server/controllers/customerController.js
import Customer from "../models/customerModel.js";

// Create Customer
export const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const customer = await Customer.create({ name, email, phone, address });
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: "customer Already created" });
    }
};

// Get all Customers
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Customer by ID
export const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Customer
export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.json({ success: true, data: customer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
        res.json({ success: true, message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
