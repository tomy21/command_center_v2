import React, { useEffect, useRef, useState } from "react";
import { Issues, users } from "../../api/apiOcc";
import Select from "react-select";
import Hls from "hls.js";

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

  const [gate, setGate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState([]);
  const [limitCategory] = useState(3);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   const videoSrc = "http://localhost:5001/v01/occ/api/stream"; // URL stream yang benar

  //   if (Hls.isSupported()) {
  //     const hls = new Hls();

  //     // Menangani sumber stream
  //     hls.loadSource(videoSrc);

  //     // Menghubungkan hls ke elemen video
  //     hls.attachMedia(videoRef.current);

  //     // Mulai pemutaran saat manifest HLS telah dimuat
  //     hls.on(Hls.Events.MANIFEST_PARSED, function () {
  //       videoRef.current.play();
  //     });

  //     // Menangani error jika ada masalah dengan HLS
  //     hls.on(Hls.Events.ERROR, function (event, data) {
  //       if (data.fatal) {
  //         console.error("HLS error:", data);
  //       }
  //     });

  //     // Bersihkan dan lepaskan sumber saat komponen dibersihkan
  //     return () => {
  //       hls.destroy();
  //     };
  //   } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
  //     // Untuk browser yang mendukung HLS secara native (seperti Safari)
  //     videoRef.current.src = videoSrc;
  //     videoRef.current.addEventListener("loadedmetadata", () => {
  //       videoRef.current.play();
  //     });

  //     return () => {
  //       videoRef.current.removeEventListener("loadedmetadata", () => {});
  //     };
  //   } else {
  //     console.error("HLS not supported in this browser.");
  //   }
  //   fetchdata();
  // }, []);

  const fetchdata = async () => {
    try {
      const response = await users.getById();
      setLocationData(response.data.OccRefLocation?.name);
    } catch (error) {
      console.log(error);
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
                  value: item.id,
                }))}
                onChange={(selectedOption) => console.log(selectedOption)}
                className="w-full mt-2"
                classNamePrefix="react-select"
                placeholder="Select Gate"
              />
            </div>
            <button
              onClick={closePopup}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              X
            </button>
          </div>

          <div className="border-b border-slate-300 w-full p-0"></div>

          <video
            ref={videoRef}
            controls
            width="100%"
            height="auto"
            style={{ backgroundColor: "black" }}
          ></video>

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
                  options={categories.map((item) => ({
                    label: item.category,
                    value: item.id,
                  }))}
                  value={selectedCategory}
                  onChange={(selectedOption) => {
                    setSearch("");
                    setCategories([]);
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
