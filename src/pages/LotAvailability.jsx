import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LotAPI_new } from "../api/apiLot";
import { ClipLoader } from "react-spinners";

export default function LotAvailability() {
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const locationCode = "012SK";
  const locationId = 16;
  useEffect(() => {
    // Fetch data dari API
    const fetchLots = async () => {
      try {
        const response = await LotAPI_new.getLocationAvailability(locationCode);

        if (response.responseCode === "211000") {
          setAvailability(response.data[0]?.lots);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLots();
    const interval = setInterval(fetchLots, 3000); // Auto-refresh setiap 3 detik
    return () => clearInterval(interval);
  }, [locationId]);

  console.log(availability);
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

        {/* Tab Content */}
        <div className="w-full max-w-4xl p-6 border border-gray-700 rounded-lg">
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
                  <span className="text-sm font-light"> / {lot.max_lot}</span>
                </motion.span>
                <div
                  className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
                    lot.available_lot > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
