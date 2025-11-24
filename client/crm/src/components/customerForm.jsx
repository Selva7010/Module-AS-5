

import React, { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskError, setTaskError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !description.trim()) {
      setTaskError("Please fill in all fields");
      setSuccess("");
      return;
    }

    try {
      const result = await axios.post(
        "http://localhost:4000/api/TaskManager",
        { title, description }
      );

      if (result.data.success) {
        setSuccess(result.data.message);
        setTaskError("");
        setTitle("");
        setDescription("");
      } else {
        setTaskError(result.data.message);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setTaskError("Failed to add Task. Server Error");
      setSuccess("");
    }
  };

  return (
    <div>
      {taskError && (
        <div className="text-red-600 text-center text-lg mb-3 font-semibold">
          {taskError}
        </div>
      )}
      {success && (
        <div className="text-green-600 text-center text-lg mb-3 font-semibold">
          {success}
        </div>
      )}

      <form
        onSubmit={submitHandler}
        className="bg-white p-4 shadow rounded space-y-2"
      >
        <input
          className="w-full border p-2 rounded mt-2"
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded mt-2"
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
