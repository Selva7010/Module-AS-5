import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError("");
    setSuccess("");

    try {
      const result = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );

      if (result.data.success) {
        setSuccess(result.data.message);
        setLoginError("");
        navigate("/HomePage")
      } 
      else {
        setLoginError(result.data.message);
        setSuccess("");
        
        
      }

    } catch (err) {
      console.error(err);
      setLoginError("Login Failed. Server Error");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-blue-400">
      <div className="signup m-auto rounded-2xl w-90 bg-white">
        <h2 className="text-center text-2xl text-green-700 font-bold mt-3">
          Login
        </h2>

        {loginError && (
          <div className="text-red-600 text-center text-lg mb-3 font-semibold">
            {loginError}
          </div>
        )}

        {success && (
          <div className="text-green-600 text-center text-lg mb-3 font-semibold">
            {success}
          </div>
        )}

        <div className="form p-7">
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label>Email:</label>
              <br />
              <input
                className="border w-full p-2 mt-1 mb-3 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password">
              <label>Password:</label>
              <br />
              <input
                className="border w-full p-2 mt-1 mb-3 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button flex justify-center mb-3 mt-2">
              <button className="bg-green-600 px-5 py-2 text-white font-semibold rounded cursor-pointer">
                Login
              </button>
            </div>
          </form>

          <div className="login flex justify-evenly items-center">
            <p>You don't have an Account?</p>
            <a href="/" className="text-blue-800 text-lg font-semibold">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
