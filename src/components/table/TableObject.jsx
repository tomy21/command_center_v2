import React, { useEffect, useState } from "react";
import { getTransaction } from "../../api/apiOcc";
import Pagination from "../Pagging";
import {
  MdOutlineAddLocationAlt,
  MdOutlineEditNote,
  MdOutlineFileDownload,
} from "react-icons/md";
import { Category, ObjectApi } from "../../api/apiMaster";
import moment from "moment/moment";
import { BsFillTrash3Fill } from "react-icons/bs";

export default function TableObject() {
  const [objects, setoObjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(10);
  const [loadingGateId, setLoadingGateId] = useState(null);
  const [loadingPostId, setLoadingPostId] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchGates = async (page = 1, search = "") => {
    try {
      const response = await ObjectApi.getAll(currentPage, limit, searchTerm);
      console.log(response);
      setoObjects(response.objects);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalResult(response.totalItems);
    } catch (error) {
      console.error("Error fetching gates:", error);
    }
  };

  // UseEffect to fetch data initially
  useEffect(() => {
    fetchGates();
  }, [searchTerm, currentPage, limit]);

  return (
    <>
      <div className="container mx-auto bg-white rounded-md shadow-md">
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
            <div className="flex flex-row justify-center items-center rounded-md border border-blue-500 text-blue-500 px-3 py-1 space-x-2 hover:bg-blue-100 cursor-pointer shadow-sm shadow-blue-700 ">
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
            {objects.map((items, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.object}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {items.category?.category}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {moment(items.createdAt).format("DD MMM YYYY, HH:mm")}
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
            ))}
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
    </>
  );
}
