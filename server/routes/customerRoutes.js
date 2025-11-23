
import express from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from "../controllers/customerController.js";

const router = express.Router();

// Routes
router.post("/", createCustomer);         
router.get("/", getCustomers);           
router.get("/:id", getCustomerById);     
router.patch("/:id", updateCustomer);     
router.delete("/:id", deleteCustomer);    

export default router;
