import React, { useEffect, useState } from "react";
import Pagination from "../Pagging";
import { MdOutlineEditNote, MdOutlineFileDownload } from "react-icons/md";
import { Category } from "../../api/apiMaster";
import moment from "moment/moment";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import Loading from "../Loading";

export default function TableCategory() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fungsi menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleEdit = (category) => {
    setSelectedCategory(category); // Set category yang akan diedit
    setFormData(category); // Set form data dengan category terpilih
    setShowEditModal(true); // Tampilkan modal edit
  };

  const handleConfirmationDelete = (category) => {
    setSelectedCategory(category); // Set category yang akan dihapus
    setShowDeleteModal(true); // Tampilkan modal konfirmasi hapus
  };

  const handleAddCategory = () => {
    setFormData({ category: "" }); // Reset form
    setShowAdd(true); // Tampilkan modal add
  };

  const handleDelete = async () => {
    try {
      await Category.delete(selectedCategory.id); // Panggil API delete
      setCategories((prev) =>
        prev.filter((item) => item.id !== selectedCategory.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchCategories = async (currentPage = 1, searchTerm = "") => {
    try {
      const response = await Category.getAll(currentPage, limit, searchTerm);
      setCategories(response.categories);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalResult(response.totalItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchTerm, currentPage, limit]);

  const submitForm = async () => {
    setLoading(true);
    try {
      // Pastikan selectedCategory dan formData tidak null atau undefined
      console.log(selectedCategory);
      if (selectedCategory && formData && formData.id && formData.category) {
        const response = await Category.updateCategory(
          formData.id,
          formData.category
        );
      } else {
        console.log("error: form data or selected category is invalid");
      }

      // Fetch ulang data setelah menambah atau mengedit
      setShowAdd(false);
      setShowEditModal(false);
    } catch (error) {
      console.log("Error in submitting form: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-white rounded-md shadow-md w-full">
        {/* Search Input */}
        <div className="flex justify-between items-center w-full px-4 py-2">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={handleAddCategory}
            >
              <FaPlus />
              <h1>Add New</h1>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 my-2"></div>

        {/* Gates Table */}
        <table className="w-full bg-white rounded-md">
          <thead>
            <tr>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                No
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Name
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Created Date
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Data not found
                </td>
              </tr>
            ) : (
              categories.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {item.category}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    {moment(item.createdAt).format("DD MMM YYYY, HH:mm")}
                  </td>
                  <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                    <div className="flex flex-row justify-center items-center space-x-3">
                      <MdOutlineEditNote
                        size={25}
                        className="text-sky-600 hover:text-sky-500 cursor-pointer"
                        onClick={() => handleEdit(item)} // Handle edit click
                      />
                      <div className="border-l border-slate-500 h-5"></div>
                      <BsFillTrash3Fill
                        size={20}
                        className="text-red-600 hover:text-red-500 cursor-pointer"
                        onClick={() => handleConfirmationDelete(item)} // Handle delete click
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
              name="limit-selector"
              id="limit-selector"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
              className="border border-slate-300 px-2 py-1 rounded-md"
            >
              <option value="">{limit}</option>
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
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-start">Add Category</h2>
            <input
              type="text"
              value={formData.category}
              onChange={handleChange}
              name="Category"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter category name"
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <input
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter category name"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => setShowEditModal(false)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Delete Confirmation
            </h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
