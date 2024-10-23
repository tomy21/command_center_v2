import React, { useContext, useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { WebSocketContext } from "../components/WebSocketProvider";
import { getTransaction, Issues } from "../api/apiOcc";
import { Category, ObjectApi } from "../api/apiMaster"; // Import Issues
import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";

export default function DashboardLayout() {
  const { message, isOpen, closePopup } = useContext(WebSocketContext);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    status: "",
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState([]);
  const [limitCategory] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update form data based on input name
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // if(selectedCategory === "A")
      const Id = message?.data?.dataIssues?.data?.id;
      await Issues.update(Id, formData);
      closePopup();
      setFormData({
        category: "",
        description: "",
        status: "",
      });
      setModalConfirmation(true);
    } catch (error) {
      setIsError(true);
      console.error("Error submitting complaint:", error);
    } finally {
      setLoading(true);
      setIsSuccess(true);
      setInterval(() => {
        setIsSuccess(false);
      }, 2000);
    }
  };

  console.log(selectedCategory);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message?.data?.channel_cctv, search]);

  const fetchCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await Category.getAll(page, limitCategory, search);

      setCategories((prev) => {
        const categorySet = new Set(prev.map((cat) => cat.id)); // Membuat Set dengan ID kategori sebelumnya
        const newCategories = response.categories.filter(
          (newCategory) => !categorySet.has(newCategory.id) // Memastikan ID kategori baru tidak ada dalam Set
        );
        return [...prev, ...newCategories];
      });

      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch objects by selected category ID
  useEffect(() => {
    if (selectedCategoryId) {
      const fetchDataByCategory = async () => {
        try {
          const response = await ObjectApi.getByIdCategory(selectedCategoryId);
          setDescription(response.data);
          console.log("Data berdasarkan kategori:", response);
        } catch (error) {
          console.error("Error fetching data by category:", error);
        }
      };

      fetchDataByCategory();
    }
  }, [selectedCategoryId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.category);
    setFormData((prevData) => ({
      ...prevData,
      category: category.category, // Update formData with selected category
    }));
    setSelectedCategoryId(category.id);
    setSearch("");
    setDropdownVisible(false);
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
                      {message?.data?.dataGate?.location?.Name}
                    </p>
                    <h1 className="text-xl font-bold">
                      {message?.data?.dataGate?.gate}
                    </h1>
                    <h1 className="text-base font-medium text-slate-400">
                      #{message?.data?.dataIssues?.data?.ticket}
                    </h1>
                  </div>
                  <button onClick={closePopup}>X</button>
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
                    <p></p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-start px-4 py-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Plate Number
                    </label>
                    <h1 className="text-xl font-medium mb-2">
                      {formData.number_plate ?? "-"}
                    </h1>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transaction Number
                    </label>
                    <p className="mb-2">{formData.TrxNo ?? "-"}</p>
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
                          onClick={toggleDropdown}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setCategories([]);
                            setPage(1);
                            toggleDropdown();
                          }}
                          className="mt-1 p-2 w-full border rounded-md"
                        />
                        {dropdownVisible && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                            {categories
                              .filter((item) =>
                                item.category
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              )
                              .map((item, index) => {
                                return (
                                  <li
                                    key={item.id}
                                    onClick={() => handleCategorySelect(item)}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                  >
                                    {item.category}
                                  </li>
                                );
                              })}
                            {loading && (
                              <li className="p-2 text-center">Loading...</li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description:
                      </label>
                      <select
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      >
                        <option value="">Select Description</option>
                        {description.map((items, index) => (
                          <option key={index} value={items.object}>
                            {items.object}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status:
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      >
                        <option value="">Select status</option>
                        <option value="in progress">In Progress</option>
                        <option value="solved">Solved</option>
                      </select>
                    </div>

                    {selectedCategory === "Assets" ? (
                      <>
                        <button className="bg-sky-300 rounded-md text-center">
                          Open Gate
                        </button>
                      </>
                    ) : null}
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

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg flex flex-col justify-center items-center space-y-10">
            <FaFileCircleCheck className="text-green-500" size={80} />
            <h2 className="text-xl font-medium mb-4 text-black">
              Created successfully
            </h2>
          </div>
        </div>
      )}

      {isError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg flex flex-col justify-center items-center space-y-10">
            <FaFileCircleXmark className="text-red-500" size={80} />
            <h2 className="text-xl font-medium mb-4 text-black">
              Error submitting complaint
            </h2>
          </div>
        </div>
      )}
      {modalConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg flex flex-col justify-center items-center space-y-10">
            <FaFileCircleXmark className="text-red-500" size={80} />
            <h2 className="text-xl font-medium mb-4 text-black">
              Apakah anda ingin membuka palang ?
            </h2>

            <div className="flex justify-center items-center space-x-5">
              <button
                // onClick={handleOpenGate}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Iya
              </button>
              <button
                // onClick={toggleModalConfirmation}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
