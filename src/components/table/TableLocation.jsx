import React, { useEffect, useState } from "react";
import { getTransaction } from "../../api/apiOcc";
import Pagination from "../Pagging";
import { MdOutlineAddLocationAlt, MdOutlineFileDownload } from "react-icons/md";

export default function TableLocation() {
  const [gates, setGates] = useState([]);
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

  const toggleStatus = async (gateId, newStatus) => {
    setLoadingPostId(gateId); // Set the current gate ID to loading
    try {
      const statusGate = newStatus === true ? "1" : "0";
      const response = await getTransaction.updateStatusGate(
        gateId,
        statusGate
      ); // Hit API to update status
      console.log(response);

      // Simulate loading time (2 seconds)
      setTimeout(() => {
        setLoadingPostId(null); // Reset the loading state after the update
      }, 2000);
      setGates((prevGates) =>
        prevGates.map((gate) =>
          gate.id === gateId
            ? { ...gate, statusGate: newStatus ? "1" : "0" }
            : gate
        )
      );
    } catch (error) {
      console.error("Error updating gate status:", error);
      setLoadingPostId(null); // Reset loading even if there is an error
    }
  };

  const updateOpenGate = async (gateId, newStatus) => {
    setLoadingGateId(gateId); // Set the current gate ID to loading
    try {
      const response = await getTransaction.updateStatusOpenGate(
        gateId,
        newStatus
      );

      setTimeout(() => {
        if (response.status === 200) {
          setLoadingGateId(null); // Reset the loading state after the update
        } else {
          setLoadingGateId(null); // Reset loading if response status is not 200
        }
      }, 2000);
      fetchGates();
    } catch (error) {
      console.error("Error updating gate status:", error);
      setLoadingGateId(null); // Reset loading if there is an error
    }
  };

  // UseEffect to fetch data initially
  useEffect(() => {
    fetchGates();
  }, [searchTerm, currentPage, limit]);

  const fetchGates = async (page = 1, search = "") => {
    try {
      const response = await getTransaction.getGate(
        currentPage,
        limit,
        searchTerm
      );
      console.log(response);
      setLimit(response.data.pagination.limit);
      setGates(response.data.data);
      setCurrentPage(response.data.pagination.page);
      setTotalPages(response.data.pagination.totalPages);
      setTotalResult(response.data.pagination.total);
    } catch (error) {
      console.error("Error fetching gates:", error);
    }
  };

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
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                No
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Gate
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Location
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Channel CCTV
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Status Gate
              </th>
              <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
                Status POST
              </th>
            </tr>
          </thead>
          <tbody>
            {gates.map((gate, index) => (
              <tr
                key={gate.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {gate.gate}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {gate.location.Name}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {gate.channel_cctv}
                </td>
                <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                  {loadingGateId === gate.id ? (
                    <div className="flex items-start justify-start">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-blue-500 text-start"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <button
                      className={`px-3 py-1 text-center rounded-md ${
                        gate.arduino === "1"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                      onClick={() => {
                        const newStatus = gate.arduino === "1" ? "0" : "1"; // Toggle status
                        updateOpenGate(gate.id, newStatus); // Call update function with new status
                      }}
                    >
                      {gate.arduino === "1" ? "Open" : "Close"}
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <div className="flex items-center">
                    {loadingPostId === gate.id ? (
                      <div className="flex items-start justify-start">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      <>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={gate.statusGate === "1"}
                            onChange={() =>
                              toggleStatus(gate.id, gate.statusGate !== "1")
                            }
                          />
                          <div
                            className={`w-11 h-6 rounded-full p-1 transition duration-200 ease-in-out ${
                              gate.statusGate === "1"
                                ? "bg-emerald-500"
                                : "bg-red-300"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                gate.statusGate === "1"
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            ></div>
                          </div>
                        </label>
                        <span
                          className={`ml-2 ${
                            gate.statusGate === "1"
                              ? "text-emerald-700"
                              : "text-red-700"
                          }`}
                        >
                          {gate.statusGate === "1" ? "On" : "Off"}
                        </span>
                      </>
                    )}
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
