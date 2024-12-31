import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import { users } from "../api/apiOcc";
import Loading from "../components/Loading";

function Login() {
  const [captcha, setCaptcha] = useState("");
  const [textCaptcha, setTextCaptcha] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!identifier) {
      validationErrors.identifier = "Username or Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(identifier) &&
      !/^[a-zA-Z0-9_]+$/.test(identifier)
    ) {
      validationErrors.identifier =
        "Please enter a valid email address or username (letters, numbers, and underscores only)";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessage(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    refreshString();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(true); // Set error to true if validation fails
      return;
    }

    if (textCaptcha !== captcha) {
      setValid(false);
      setError(true); // Show error if captcha doesn't match
      setErrorMessage({ captcha: "Captcha does not match" });
      return;
    }

    setLoading(true);
    setValid(true); // Mark captcha as valid if entered correctly

    try {
      const dataLogin = {
        identifier: identifier,
        password: password,
      };

      // Call API to login
      await users.login(dataLogin.identifier, dataLogin.password);

      // If login successful, redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(true);
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Login failed");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Ensure loading is false after login attempt
    }
  };

  const errorMessageToDisplay =
    typeof errorMessage === "object"
      ? Object.values(errorMessage).join(", ") // Gabungkan semua error message dalam objek menjadi satu string
      : errorMessage;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-amber-100 to-orange-100">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
          <div className="text-center mb-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1 text-gray-700 text-start">
                  Username or Email
                </label>

                <input
                  type="text"
                  className={`w-full px-4 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  id="identifier"
                  name="Identifier"
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Masukan email atau username"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1 text-gray-700 text-start">
                  Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-row space-x-5 mb-2 relative">
                {/* Captcha Box */}
                <div
                  className={`text-xl font-semibold w-full h-12 text-center tracking-widest select-none rounded-lg p-2 ${
                    valid
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      : "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
                  } shadow-md transform transition duration-300 hover:scale-105`}
                >
                  <div className="flex justify-center items-center h-full space-x-4">
                    {" "}
                    {/* Increase space between characters */}
                    {captcha.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          transform: `rotate(${
                            Math.random() * 30 - 15
                          }deg) translateX(${
                            Math.random() * 10 - 5
                          }px) translateY(${Math.random() * 10 - 5}px)`,
                          opacity: Math.random() * 0.5 + 0.5, // Random opacity between 0.5 and 1
                          color: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color for each character
                          fontSize: "2rem", // Larger font size for each character
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  type="button"
                  className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transform transition duration-200 hover:scale-110 absolute right-0 top-0 mt-1 mr-1"
                  onClick={refreshString}
                >
                  <MdOutlineRefresh className="text-2xl" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-col mb-5 text-sm">
                <input
                  type="text"
                  className={`border px-3 py-2 rounded-md ${
                    valid ? "border-green-500" : "border-red-500"
                  }`}
                  placeholder="Enter Captcha"
                  value={textCaptcha}
                  onChange={(e) => setTextCaptcha(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 w-full py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {errorMessageToDisplay && (
        <div className="fixed top-5 right-5 bg-white border border-red-500 text-black px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p>{errorMessageToDisplay}</p>
        </div>
      )}
    </>
  );
}

export default Login;
