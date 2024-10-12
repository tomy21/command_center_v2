import React, { useEffect, useState } from "react";
import AddTicket from "../modal/AddTicket.jsx";
import { Issues } from "../../api/apiOcc.js";

export default function TableTicket() {
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

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, limit, searchTerm]);

  const fetchData = async () => {
    try {
      const response = await Issues.getAll(currentPage, limit, searchTerm);
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto max-h-[56vh] w-full mt-5 bg-white px-2 py-2 rounded-md">
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-sm font-semibold">Table Complain</h1>
            <p className="text-xs font-normal text-slate-300">
              Table input complain
            </p>
          </div>
          <div className="flex flex-row justify-end items-center">
            <button
              onClick={openModal}
              className="bg-emerald-300 rounded-full px-5 py-2 text-sm"
            >
              Add
            </button>
          </div>
        </div>
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer w-full">
          <thead>
            <tr className="font-semibold p-2">
              <th className="bg-blue-100 px-2 py-5 rounded-tl-xl">No</th>
              <th className="bg-blue-100 px-2 py-5">No Ticket</th>
              <th className="bg-blue-100 px-2 py-5">Lokasi</th>
              <th className="bg-blue-100 px-2 py-5">Kategory</th>
              <th className="bg-blue-100 px-2 py-5">Deskripsi</th>
              <th className="bg-blue-100 px-2 py-5">No Kendaraan</th>
              <th className="bg-blue-100 px-2 py-5">Di Input oleh</th>
              <th className="bg-blue-100 px-2 py-5 rounded-tr-xl">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((data, index) => (
              <tr key={index}>
                <td className="py-2">{index + 1}</td>
                <td className="py-2">#{data.ticket}</td>
                <td className="py-2">{data.lokasi}</td>
                <td className="py-2">{data.category}</td>
                <td className="py-2">{data.description}</td>
                <td className="py-2">{data.number_plate}</td>
                <td className="py-2">{data.action}</td>
                <td className="py-2">
                  <div className="bg-green-200 rounded-full px-2 py-3">
                    {data.status}
                  </div>
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
