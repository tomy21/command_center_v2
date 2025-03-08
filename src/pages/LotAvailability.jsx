import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lotAvailable } from "../api/apiLot";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { users } from "../api/apiOcc";

export default function LotAvailability() {
  const [activeTab, setActiveTab] = useState("availability");
  const [availability, setAvailability] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [gateLocation, setGateLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [identidfier, setIdentidfier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const locationCode = "012SK";
  const locationId = 16;
  useEffect(() => {
    // Fetch data dari API
    const fetchLots = async () => {
      try {
        const response = await lotAvailable.getAllPerlocation(locationCode);
        console.log(response);
        if (response.Status === true) {
          setAvailability(response.Data[0]?.lots);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const verifikasi = async () => {
      try {
        const response = await users.verifyToken();
        if (response.token !== null) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    verifikasi();
    fetchLots();
    fetchGate();
    const interval = setInterval(fetchLots, 3000); // Auto-refresh setiap 3 detik
    return () => clearInterval(interval);
  }, [locationId]);

  const fetchGate = async () => {
    try {
      const response = await lotAvailable.gateLocation(locationId);
      if (response.success === true) {
        setGateLocation(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenGate = async (id) => {
    setIsLoading(true);
    try {
      const response = await lotAvailable.updateGate(id);
      if (response.status === "success") {
        setIsLoading(false);
        fetchGate();
      }
      console.log(response);
    } catch (error) {
      console.error("Error opening gate:", error);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!identidfier) {
      validationErrors.identidfier = "Username or Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(identidfier) &&
      !/^[a-zA-Z0-9_]+$/.test(identidfier)
    ) {
      validationErrors.identidfier =
        "Please enter a valid email address or username";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessage(
      validationErrors.identidfier || validationErrors.password || ""
    );
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log(identidfier, password);
      await users.login(identidfier, password);

      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClipLoader size={150} color={"#F3C623"} loading={true} />
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-3">
        {/* Fixed Header */}
        <div className="w-full max-w-4xl text-center mb-5">
          <img src={"/lmn.png"} className="w-52 mx-auto mb-3" alt="Logo" />
          <h1 className="text-2xl font-normal text-white">
            Lot Parking System
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-5">
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              activeTab === "availability" ? "bg-yellow-500" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("availability")}
          >
            Availability
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              activeTab === "openGate" ? "bg-yellow-500" : "bg-gray-700"
            }`}
            onClick={() => setActiveTab("openGate")}
          >
            Open Gate
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-4xl p-6 border border-gray-700 rounded-lg">
          <AnimatePresence mode="wait">
            {activeTab === "availability" && (
              <motion.div
                key="availability"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {availability.map((lot, index) => (
                    <div
                      key={index}
                      className="relative bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300"
                    >
                      <h2 className="text-lg font-semibold text-gray-300">
                        {lot.lot_name}
                      </h2>
                      <motion.span
                        key={lot.lot_name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-white block mt-2"
                      >
                        {lot.available_lot < 0 ? 0 : lot.available_lot}
                      </motion.span>
                      <div
                        className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
                          lot.available_lot > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "openGate" && (
              <motion.div
                key="openGate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {isLoggedIn ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gateLocation.map((gate, index) => (
                      <div
                        key={index}
                        className="relative bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300"
                      >
                        <h2 className="text-lg font-semibold text-gray-300">
                          {gate.gate}
                        </h2>
                        <motion.span
                          key={gate.gate}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.5 }}
                          className="text-3xl font-bold text-white block my-2"
                        >
                          {gate.arduino === "1" ? "Open" : "Close"}
                        </motion.span>
                        <div className="flex justify-center items-center w-full mb-5 space-x-3 mt-5">
                          <button
                            onClick={() => handleOpenGate(gate.id)}
                            className="bg-cyan-500 p-2 rounded-lg w-full hover:bg-cyan-600"
                          >
                            Open
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 p-6 rounded-lg text-white max-w-md mx-auto">
                    <h2 className="text-xl font-bold mb-4">Login</h2>
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
                          onChange={(e) => setIdentidfier(e.target.value)}
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
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
