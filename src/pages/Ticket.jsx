import React from "react";
import { IoIosCloudDownload } from "react-icons/io";
import { MdOutlineFilterAlt } from "react-icons/md";
import TableTicketPages from "../components/table/TableTicketPages";
import { FaPlus } from "react-icons/fa";

export default function Ticket() {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full mt-12">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-semibold">Ticket</h1>
          <div>2022 Jun 10</div>
        </div>

        <div className="flex flex-col justify-start items-start w-full bg-white rounded-md mt-2">
          <div className="flex justify-between items-center w-full p-4 border-b border-gray-400">
            <input
              type="text"
              className="border border-slate-400 px-2 py-1 rounded-md text-sm"
              placeholder="Search ..."
            />
            <div className="flex flex-row justify-end items-end">
              <button className="flex flex-row space-x-2 justify-center items-center rounded-md px-3 py-1 text-blue-700">
                <FaPlus />
                <p className="text-sm">Komplain</p>
              </button>
              <button className="flex flex-row space-x-2 justify-center items-center rounded-md px-3 py-1 text-green-700">
                <IoIosCloudDownload />
                <p className="text-sm">Download</p>
              </button>

              <div className="h-7 border-l border-slate-300"></div>
              <button className="flex flex-row space-x-2 justify-center items-center rounded-md px-3 py-1 text-gray-700">
                <MdOutlineFilterAlt />
                <p className="text-sm">Filter</p>
              </button>
            </div>
          </div>
          <TableTicketPages />
        </div>
      </div>
    </>
  );
}
