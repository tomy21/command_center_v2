import React, { useEffect, useState } from "react";
import AddTicket from "../modal/AddTicket.jsx";
import { Issues } from "../../api/apiOcc.js";

export default function TableTicket() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
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
      console.log("data", response.data);
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto max-h-[56vh] w-full bg-white mt-3 p-5 rounded-md">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-sm font-semibold">Last Complaint</h1>
            <p className="text-xs font-normal text-slate-300">
              Table input complain
            </p>
          </div>
          <div className="flex flex-row justify-end items-center">
            <button onClick={openModal} className="text-sm">
              View All
            </button>
          </div>
        </div>
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer w-full">
          <thead>
            <tr className="font-semibold p-2 border-t border-b border-slate-400">
              <th className="px-2 py-5 rounded-tl-xl">No</th>
              <th className="px-2 py-5">No Ticket</th>
              <th className="px-2 py-5">Lokasi</th>
              <th className="px-2 py-5">Kategory</th>
              <th className="px-2 py-5">Date</th>
              <th className="px-2 py-5 rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((data, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-slate-400"
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">#{data.ticket}</td>
                <td className="py-2">{data.lokasi}</td>
                <td className="py-2">{data.category}</td>
                <td className="py-2">
                  {/* {format(new Date(data.createdAt), "dd MMM yyyy HH:mm")} */}
                </td>
                <td className="py-2">
                  <div className=" py-3">{data.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTicket isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
}
