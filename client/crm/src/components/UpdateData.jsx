import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) {
        setError("Invalid customer ID");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:4000/api/customers/${id}`);

        console.log("API Response:", res.data);

        const data = res.data.data || res.data.customer || res.data;

        setCustomer({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:4000/api/customers/${id}`,
        customer
      );

      if (res.data.success) {
        setSuccess("Customer updated successfully!");
        setTimeout(() => navigate("/customers"), 1200);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update customer");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center mb-6">Update Customer</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          type="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />

        <input
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Home Address"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-semibold rounded hover:bg-blue-700"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
