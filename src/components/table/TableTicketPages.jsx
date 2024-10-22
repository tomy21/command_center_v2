import React, { useEffect, useState } from "react";
import { Issues } from "../../api/apiOcc";
import AddTicket from "../modal/AddTicket";
import Pagination from "../Pagging";

export default function TableTicketPages() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalResult, setTotalResult] = useState(10);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await Issues.getAll(currentPage, limit, searchTerm);
      console.log(response);
      setTickets(response.data);
      setTotalPages(response.totalPages);
      setTotalResult(response.totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-md shadow-md w-full">
      <table className="w-full bg-white rounded-md">
        <thead>
          <tr className="">
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              No
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              No Ticket
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              Lokasi
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              Kategory
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              Deskripsi
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              No Kendaraan
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              Di Input oleh
            </th>
            <th className="text-start py-2 px-4 border-b text-slate-400 text-sm font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
            >
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {index + 1}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                #{data.ticket}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {data.lokasi}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {data.category}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {data.description}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {data.number_plate}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                {data.createdBy}
              </td>
              <td className="text-start text-sm py-2 px-4 border-b border-gray-200">
                <div
                  className={`${
                    data.status === "new"
                      ? "text-blue-500"
                      : data.status === "in progress"
                      ? "text-amber-500"
                      : "text-emerald-600"
                  }`}
                >
                  {data.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
            <option value="5">5</option>
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

      <AddTicket isVisible={isModalVisible} onClose={closeModal} />
    </div>
  );
}
