import React, { useContext, useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { WebSocketContext } from "../components/WebSocketProvider";
import { getTransaction } from "../api/apiOcc";
import { Category } from "../api/apiMaster";

export default function DashboardLayout() {
  const { message, isOpen, closePopup } = useContext(WebSocketContext);
  const [imageSrc, setImageSrc] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [limitCategory, setLimitCategory] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const categoryListRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const complaint = event.target.complaint.value;
    console.log("Complaint submitted:", complaint);
    closePopup();
  };

  useEffect(() => {
    const fetchImageCCTV = async () => {
      try {
        const response = await getTransaction.getFoto(
          message.data.channel_cctv
        );
        const blob = new Blob([response], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching CCTV image:", error);
      }
    };

    if (message?.data?.channel_cctv) {
      fetchImageCCTV();
    }

    // Initial fetch of categories when the component mounts or when search changes
    fetchCategories();
  }, [message?.data?.channel_cctv, search]);

  const fetchCategories = async () => {
    if (loading) return; // Prevent multiple fetches
    setLoading(true);
    try {
      const response = await Category.getAll(page, limitCategory, search);
      setCategories((prev) => [...prev, ...response.categories]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const observer = useRef();
  const lastCategoryElementRef = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        fetchCategories();
      }
    };
    observer.current = new IntersectionObserver(callback);
    if (lastCategoryElementRef.current) {
      observer.current.observe(lastCategoryElementRef.current);
    }
  }, [lastCategoryElementRef.current]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearch(""); // Clear the search input
    setDropdownVisible(false); // Hide dropdown on selection
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <Sidebar isOpen={isSidebarOpen} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "sm:ml-0 ml-60" : "ml-0 sm:ml-60"
          }`}
        >
          <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          <div className="p-4 flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {!message ? (
        ""
      ) : (
        <>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center px-4 py-3">
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-slate-400">
                      {message?.data?.location?.Name}
                    </p>
                    <h1 className="text-xl font-bold">{message?.data?.gate}</h1>
                  </div>
                  <button onClick={closePopup} className="">
                    X
                  </button>
                </div>
                <div className="border-b border-slate-300 w-full p-0"></div>
                <div className="flex justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="CCTV Capture"
                      className="w-60 h-auto py-4"
                    />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-start px-4 py-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Plate Number
                    </label>
                    <h1 className="text-xl font-bold mb-2">{`B123ABC`}</h1>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction Number
                    </label>
                    <p className="mb-2">{`Ghasdasdasdasd`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-start px-4 py-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <div className="text-green-600">
                      <h1 className="text-base font-bold mb-2">Paid</h1>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      In Date
                    </label>
                    <p className="mb-2">{new Date().toLocaleString()}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="text-end px-4 py-3">
                  <div className="grid grid-cols-2 gap-4 text-start mb-5">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category Complain:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search category..."
                          value={selectedCategory}
                          onClick={toggleDropdown} // Show dropdown on click
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setCategories([]); // Clear categories on search
                            setPage(1); // Reset page for new search
                            toggleDropdown(); // Show dropdown on search
                          }}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                        {dropdownVisible && ( // Only show dropdown if visible
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                            {categories
                              .filter((item) =>
                                item.category
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              )
                              .map((item, index) => {
                                const isLastElement =
                                  index === categories.length - 1; // Check if it's the last element
                                return (
                                  <li
                                    key={item.id}
                                    ref={
                                      isLastElement
                                        ? lastCategoryElementRef
                                        : null
                                    }
                                    onClick={() =>
                                      handleCategorySelect(item.category)
                                    } // Handle category selection
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                  >
                                    {item.category}
                                  </li>
                                );
                              })}
                            {loading && (
                              <li className="p-2 text-center">Loading...</li>
                            )}{" "}
                            {/* Show loading text */}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="object"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Object Complain:
                      </label>
                      <select
                        id="object"
                        name="object"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      >
                        <option value="">Select object</option>
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="network">Network</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded items-start"
                  >
                    Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
