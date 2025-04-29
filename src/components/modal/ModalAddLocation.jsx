import React, { useState, useEffect, useRef } from "react";
import { location } from "../../api/apiOcc";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function ModalAddLocation({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch lokasi dari API
  const fetchLocations = async (reset = false) => {
    try {
      const response = await location.getAllLoc(page, 10, searchTerm);
      if (response.data.length < 10) setHasMore(false);
      setLocations((prev) =>
        reset ? response.data : [...prev, ...response.data]
      );
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Fetch data pertama kali saat dropdown dibuka
  useEffect(() => {
    if (isDropdownOpen) {
      setPage(1);
      setHasMore(true);
      fetchLocations(true);
    }
  }, [isDropdownOpen]);

  // Search otomatis dengan debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchLocations(true);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Load more saat tombol ditekan
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) fetchLocations();
  }, [page]);

  // Klik di luar dropdown untuk menutup
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUpdate = async (idLocation) => {
    setIsLoading(true);
    try {
      const response = await location.updateLocationActive(idLocation, "1");

      if (response.success === true) {
        setModalSuccess(true);

        setTimeout(() => {
          setModalSuccess(false); // Tutup modal
          onClose(); // Panggil fungsi onClose jika ada
        }, 3000);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

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
          <div className="mt-4 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700">
              Select Location:
            </label>
            <div
              className="mt-2 w-full border rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedLocation
                ? `${selectedLocation.Name} - ${selectedLocation.Code}`
                : "Select location"}
            </div>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {/* Search Input */}
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* List Locations */}
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {loc.Name} - {loc.Code}
                  </div>
                ))}

                {/* Load More Button */}
                {hasMore && (
                  <button
                    onClick={loadMore}
                    className="p-2 w-full text-center text-blue-600 text-sm hover:bg-gray-100"
                  >
                    Load more...
                  </button>
                )}
              </div>
            )}
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
              onClick={() => handleUpdate(selectedLocation.id)}
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
