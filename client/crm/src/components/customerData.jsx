import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerData = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [success, SetSuccess] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const result = await axios.get("http://localhost:4000/api/TaskManager");

        if (result.data.success) {
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

  const updateData = (customer) => {
    navigate(`/updateData/${customer}`);
  };

  const deleteData = async (customerId) => {
    try {
      await axios.delete(`http://localhost:4000/api/TaskManager/${customerId}`);
      setCustomers(customers.filter((c) => c._id !== customerId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete customer");
    }
  };

  const deleteAllData = async () => {
    try {
      await axios.delete("http://localhost:4000/api/TaskManager/Customer/deleteAll");
      setCustomers([]);
      SetSuccess("Deleted All Task")
    } catch (error) {
      console.log(error);
      setError("Failed to delete all");
    }
  };

  return (
    <>

    <div className="text-center">
      {error && (
        <div className="text-red-600 text-lg mb-3 font-semibold mt-10">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 text-lg mb-3 font-semibold mt-10">
          {success}
        </div>
      )}
      </div>
    <div className="flex justify-center">
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl p-6 w-5xl mt-5">
        <div className="flex justify-end">
        <button 
          onClick={deleteAllData}
          className="bg-red-600 text-white px-4 py-2 rounded mb-4"
        >
          Delete All
        </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.title}</td>
                <td>{customer.description}</td>
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
                <td colSpan="3" className="text-center text-gray-500 py-4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CustomerData;
