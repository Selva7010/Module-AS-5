import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerData = () => {
  const navigate=useNavigate()

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  // Fetch customers on mount
  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const result = await axios.get("http://localhost:4000/api/customers");

      if(result.data.success) {
        setCustomers(result.data.data);
      } else {
        setCustomers([]);
        setError(result.data.message || "No customers found");
      }
    } catch (err) {
      console.error(err);
      setCustomers([]);
      setError("Failed to fetch customers");
    }
  };

  fetchCustomers();
}, []);


  const updateData = (customerId) => {
    console.log("Update Data for", customerId);
    navigate(`/updateData/${id}`)
  };

  const deleteData = async (customerId) => {
    try {
      await axios.delete(`http://localhost:4000/api/customers/${customerId}`);
      // Remove deleted customer from state
      setCustomers(customers.filter(c => c._id !== customerId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete customer");
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-600 text-center text-lg mb-3 font-semibold">
          {error}
        </div>
      )}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-6 w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td className="p-3 flex justify-evenly">
                  <button
                    onClick={() => updateData(customer._id)}
                    className="bg-green-500 px-4 py-2 text-white rounded text-lg font-bold cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(customer._id)}
                    className="bg-red-500 px-4 py-2 text-white rounded text-lg font-bold cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerData;


