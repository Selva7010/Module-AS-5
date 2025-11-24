
import express from "express";
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    deleteAllTask
} from "../controllers/customerController.js";

const router = express.Router();

// Routes
router.post("/", createCustomer);         
router.get("/", getCustomers);           
router.get("/:id", getCustomerById);     
router.patch("/update/:id", updateCustomer);     
router.delete("/:id", deleteCustomer);  
router.delete("/Customer/deleteAll", deleteAllTask);  

export default router;
