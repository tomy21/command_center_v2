import React, { useEffect, useState } from "react";
import { ObjectApi, Category } from "../../api/apiMaster";
import Pagination from "../Pagging";
import { MdOutlineEditNote, MdOutlineFileDownload } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";
import Loading from "../Loading";
import moment from "moment/moment";
import { FaPlus } from "react-icons/fa";
import { useObject } from "../../contexts/Object.js";

export default function TableObject() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id_category: "",
    object: "",
  });
  const {
    objects,
    object,
    getById,
    createObject,
    updateObject,
    deleteObject,
    fetchObjects,
  } = useObject();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddDescription = () => {
    setFormData({
      id_category: "",
      object: "",
    });
    setShowAdd(true);
  };
  console.log("object", objects);
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await Category.getAll();
      setCategories(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    // fetchGates(currentPage, searchTerm);
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, currentPage, limit]);

  const submitForm = async () => {
    setLoading(true);
    try {
      await ObjectApi.create(formData);
      setShowAdd(false);
      // fetchGates(currentPage); // Refresh the list
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full bg-white rounded-md shadow-md">
        {/* Search Input */}
        <div className="flex justify-between items-center w-full px-4 py-2">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="flex flex-row justify-end items-center space-x-5">
            <div className="flex flex-row justify-center items-center rounded-md border border-emerald-500 text-emerald-500 px-3 py-1 space-x-2 hover:bg-emerald-100 cursor-pointer shadow-sm shadow-emerald-700">
              <MdOutlineFileDownload />
              <h1>Export</h1>
            </div>
            <div
              className="flex flex-row justify-center items-center rounded-md border border-blue-500 text-blue-500 px-3 py-1 space-x-2 hover:bg-blue-100 cursor-pointer shadow-sm shadow-blue-700 "
              onClick={handleAddDescription}
            >
              <FaPlus />
              <h1>Add New</h1>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 my-2"></div>

        {/* Table */}
        <table className="min-w-full bg-white rounded-md">
          <thead>
            <tr>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium w-[5%]">
                No
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium w-[50%]">
                Name
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium w-[20%]">
                Category
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium w-[30%]">
                Created Date
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium w-[30%]"></th>
            </tr>
          </thead>
          <tbody>
            {objects.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-5">
                  Data not found
                </td>
              </tr>
            ) : (
              objects.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {item.object}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {item.category?.category}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    <div className="flex flex-row justify-center items-center space-x-3">
                      <MdOutlineEditNote
                        size={25}
                        className="text-sky-600 hover:text-sky-500"
                      />
                      <div className="border-l border-slate-500 h-5"></div>
                      <BsFillTrash3Fill
                        size={20}
                        className="text-red-600 hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center w-full px-4">
          <div className="flex flex-row justify-start items-center space-x-2">
            <p>
              Result{" "}
              <strong>
                {currentPage} - {limit}
              </strong>{" "}
              of <strong>{totalResult}</strong>
            </p>
          </div>
          <div className="flex flex-row justify-end items-center space-x-2">
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="border border-slate-300 px-2 py-1 rounded-md"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg flex flex-col gap-y-3">
            <h2 className="text-xl font-bold mb-4">Add Description</h2>
            <select
              name="id_category"
              value={formData.id_category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="object"
              value={formData.object}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter description"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={submitForm}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
