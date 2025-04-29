import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { location } from "../../api/apiOcc";

export default function AddModalGate({ isOpen, onClose, idParams }) {
  const [formData, setFormData] = useState({
    id_location: parseInt(idParams),
    gate: "",
    channel_cctv: "0",
    arduino: "0",
    id_tele: "0",
  });

  const [modalSuccess, setModalSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.id_location || !formData.gate) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await location.addGate(formData);
      console.log(response);

      if (response.statusCode === 210201) {
        setModalSuccess(true);

        setTimeout(() => {
          setModalSuccess(false); // Tutup modal
          onClose(); // Panggil fungsi onClose jika ada
        }, 3000);
      } else {
        onClose();
      }
    } catch (error) {
      alert("Failed to connect to the API.");
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-start">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h1 className="text-lg font-semibold">Add Location</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>

          {/* Dropdown List Location */}
          <div className="mt-4 space-y-3">
            <input
              type="text"
              name="gate"
              value={formData.gate}
              onChange={handleChange}
              placeholder="Gate Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <ClipLoader size={150} color={"#F3C623"} loading={true} />
        </div>
      )}

      {modalSuccess && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg shadow-xl w-[300px] p-5 flex flex-col items-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <FaCheckCircle className="text-green-500 text-5xl mb-2" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Success!
                </h2>
                <p className="text-gray-600 text-sm text-center mt-1">
                  Your action was completed successfully.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
