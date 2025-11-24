import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/TaskManager/update/${id}`);
        if (res.data.success) {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
        } else {
          setError(res.data.message || "Customer not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customer");
      }
    };
    fetchCustomer();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:4000/api/TaskManager/update/${id}`, {
        title,
        description,
      });

      if (res.data.success) {
        setSuccess(res.data.message);
        setError("");
        setTimeout(() => navigate("/Customer"), 1500); // redirect after success
      } else {
        setError(res.data.message || "Update failed");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update customer");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-96 space-y-4">
        {error && <div className="text-red-600 font-semibold">{error}</div>}
        {success && <div className="text-green-600 font-semibold">{success}</div>}

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
