import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lotAvailable } from "../api/apiLot";

const lots = ["B1", "B2", "P5", "P5A", "P6", "P6A", "P7", "P7A", "P8"];

export default function LotAvailability() {
  const [availability, setAvailability] = useState([]);
  const locationCode = "012SK";
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

    fetchLots();
    const interval = setInterval(fetchLots, 5000); // Auto-refresh setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  console.log(availability);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-5">
      {/* Fixed Header */}
      <div className="w-full max-w-4xl text-center mb-5">
        <img src={"/lmn.png"} className="w-52 mx-auto mb-3" alt="Logo" />
        <h1 className="text-2xl font-normal text-white">
          Lot Availability Parking
        </h1>
      </div>

      {/* Scrollable Grid */}
      <div className="w-full max-w-4xl max-h-[500px] overflow-y-auto p-2 border border-gray-700 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {availability.map((lot) => (
            <div
              key={lot}
              className="relative bg-gray-800 p-6 rounded-2xl shadow-lg border-2 border-gray-700 hover:border-yellow-500 transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-300">
                {lot.lot_name}
              </h2>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={availability[lot]}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-white block mt-2"
                >
                  {lot.available_lot ?? "-"}
                </motion.span>
              </AnimatePresence>
              <div
                className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
                  lot.available_lot < lot.max_lot
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
