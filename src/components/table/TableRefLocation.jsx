import React, { useEffect, useState } from "react";
import {
  MdEditNote,
  MdOutlineAddLocationAlt,
  MdOutlineFileDownload,
} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbEyeSearch } from "react-icons/tb";
import { location } from "../../api/apiOcc";
import Pagination from "../Pagging";
import { useNavigate } from "react-router-dom";
import ModalAddLocation from "../modal/ModalAddLocation";

export default function TableRefLocation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(10);
  const [locationList, setLocationList] = useState([]);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetail = (id) => {
    navigate(`/dashboard/lokasi/detail/${id}`);
  };

  useEffect(() => {
    fetchGates(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchGates = async (page, search) => {
    try {
      const response = await location.getAllLocation(page, limit, search);
      setLimit(response.pagination.perPage);
      setLocationList(response.data);
      setCurrentPage(response.pagination.currentPage);
      setTotalPages(response.pagination.totalPages);
      setTotalResult(response.pagination.totalData);
    } catch (error) {
      console.error("Error fetching gates:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalAdd(false);
    fetchGates();
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md w-full">
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
              onClick={() => setIsModalAdd(true)}
              className="flex flex-row justify-center items-center rounded-md border border-blue-500 text-blue-500 px-3 py-1 space-x-2 hover:bg-blue-100 cursor-pointer shadow-sm shadow-blue-700 "
            >
              <MdOutlineAddLocationAlt />
              <h1>Add New</h1>
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200 my-2"></div>

        {/* Gates Table */}
        <table className="min-w-full bg-white rounded-md">
          <thead>
            <tr>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium">
                No
              </th>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium">
                Name
              </th>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium">
                Address
              </th>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium">
                Region
              </th>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium">
                Vendor
              </th>
              <th className="text-start py-3 px-4 border-b text-slate-400 text-sm font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {locationList.map((items, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.Name}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.Address}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.Region}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.Vendor}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <TbEyeSearch
                      onClick={() => handleViewDetail(items.id)}
                      className="text-xl text-green-500 hover:text-green-700"
                    />
                    <MdEditNote className="text-xl text-cyan-500 hover:text-cyan-700" />
                    <FaRegTrashCan className="text-xl text-red-500 hover:text-red-700" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center w-full px-4">
          <p>
            Result{" "}
            <strong>
              {currentPage} - {limit}
            </strong>{" "}
            of <strong>{totalResult}</strong>
          </p>
          <div className="flex flex-row justify-end items-center space-x-2">
            <select
              name="limit-selector"
              id="limit-selector"
              value={limit}
              onChange={(event) => setLimit(parseInt(event.target.value))}
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

      {/* Modal */}
      {isModalAdd && (
        <ModalAddLocation isOpen={isModalAdd} onClose={handleCloseModal} />
      )}
    </>
  );
}
