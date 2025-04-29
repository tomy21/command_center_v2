import React, { useEffect, useRef, useState } from "react";
import { Issues, location, users } from "../../api/apiOcc";
import Select from "react-select";
import CCTVStream from "../CCTVStream";
import { useCategory } from "../../contexts/Category";

function ModalAddTicketManual({ isOpen, closePopup }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idLocation: "",
    gate: "",
    category: "",
    description: "",
    location: "",
    action: "",
    foto: "",
    number_plate: "",
    status: "",
  });
  const [locationData, setLocationData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [stopStream, setStopStream] = useState(false);
  const {
    categories,
    category,
    getById,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategories,
  } = useCategory();

  const [gate, setGate] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIdGate, setSelectedIdGate] = useState("");
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [description, setDescription] = useState([]);
  const [limitCategory] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [idLokasi, setIdLokasi] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchdata();
    fetchGates();
  }, [idLokasi, stopStream]);

  console.log(categories);

  const fetchdata = async () => {
    try {
      const response = await users.getById();
      console.log(response.data.id_lokasi);
      setIdLokasi(response.data.id_lokasi);
      setLocationData(response.data?.OccRefLocation?.name);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGates = async (page = 1, search = "") => {
    try {
      const response = await location.getGateByLocation(idLokasi);
      setLimit(response.pagination.perPage);
      setGate(response.data);
      setCurrentPage(response.pagination.page);
      setTotalPages(response.pagination.totalPages);
      setTotalResult(response.pagination.total);
    } catch (error) {
      console.error("Error fetching gates:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const Id = 10;
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

  const handleClose = () => {
    setStopStream(true); // Hentikan streaming
    setIsStreaming(false);
    setTimeout(() => setSelectedIdGate(""), 100);
    closePopup();
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      padding: "0.5rem",
      borderColor: "#ddd",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#4CAF50"
        : state.isFocused
        ? "#f0f0f0"
        : "#fff",
      color: "#333",
    }),
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update form data based on input name
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex flex-col justify-start items-start">
              <p className="text-slate-400">
                {locationData ? locationData : "Loading Location"}
              </p>

              {/* React Select for Gate */}
              <Select
                options={gate.map((item) => ({
                  label: item.gate,
                  value: item.channel_cctv,
                }))}
                onChange={(selectedOption) => {
                  setSelectedIdGate(selectedOption.value);
                  setIsStreaming(true);
                }}
                className="w-full mt-2"
                classNamePrefix="react-select"
                placeholder="Select Gate"
              />
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              X
            </button>
          </div>

          <div className="border-b border-slate-300 w-full p-0"></div>

          {selectedIdGate.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-80">
              <img
                src={"/assets/no-video.svg"}
                className="h-1/2 w-1/2"
                alt="no-video"
              />
              <p className="text-slate-400">Please Select Gate</p>
            </div>
          ) : (
            <CCTVStream cctvId={selectedIdGate} stopStream={stopStream} />
          )}

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
                <Select
                  options={
                    categories &&
                    categories.categories.map((item) => ({
                      label: item.category,
                      value: item.id,
                    }))
                  }
                  value={selectedCategory}
                  onChange={(selectedOption) => {
                    setSearch("");
                    setPage(1);
                    handleInputChange({
                      target: { name: "category", value: selectedOption.value },
                    });
                  }}
                  className="w-full mt-2"
                  placeholder="Search category..."
                  styles={customStyles}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description:
                </label>
                <Select
                  options={description.map((items) => ({
                    label: items.object,
                    value: items.object,
                  }))}
                  value={formData.description}
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "description",
                        value: selectedOption.value,
                      },
                    })
                  }
                  className="w-full mt-2"
                  placeholder="Select Description"
                  styles={customStyles}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status:
                </label>
                <Select
                  options={[
                    { label: "In Progress", value: "in progress" },
                    { label: "Solved", value: "solved" },
                  ]}
                  value={formData.status}
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: { name: "status", value: selectedOption.value },
                    })
                  }
                  className="w-full mt-2"
                  placeholder="Select status"
                  styles={customStyles}
                  required
                />
              </div>

              {selectedCategory === "Assets" && (
                <button className="bg-sky-300 rounded-md text-center py-2 px-4 hover:bg-sky-400 mt-4 w-full">
                  Open Gate
                </button>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalAddTicketManual;
