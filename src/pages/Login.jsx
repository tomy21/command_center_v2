import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { users } from "../api/apiOcc";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!identifier) {
      validationErrors.identifier = "Username or Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(identifier) &&
      !/^[a-zA-Z0-9_]+$/.test(identifier)
    ) {
      validationErrors.identifier =
        "Please enter a valid email address or username";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessage(
      validationErrors.identifier || validationErrors.password || ""
    );
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await users.login(identifier, password);
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader size={80} color={"#F3C623"} />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-md p-8 text-white">
          <div className="text-center mb-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300 text-start">
                Username or Email
              </label>
              <input
                type="text"
                className={`w-full px-4 py-2 border ${
                  errorMessage ? "border-red-500" : "border-gray-600"
                } bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-white`}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-300 text-start">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-4 py-2 border ${
                  errorMessage ? "border-red-500" : "border-gray-600"
                } bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-white`}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 w-full py-2 rounded-md text-white transition duration-200"
            >
              Login
            </button>
          </form>
        </div>

        {errorMessage && (
          <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
