import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiFilter } from "react-icons/ci";
import CustomDatePicker from "./CustomDatePicker";
import ModalAddTicketManual from "./modal/ModalAddTicketManual";

function TitleHeader({ title }) {
  const [currentDate, setCurrentDate] = useState("");
  const [dateFilter, setDateFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center w-full bg-white mt-14 px-4 py-3">
          <div className="flex flex-col justify-start items-start w-52">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="text-sm text-slate-400">{currentDate}</div>
          </div>
          <div className="flex flex-row justify-end items-center w-full space-x-2">
            <div className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white">
              <CiFilter
                className="text-2xl"
                onClick={() => setDateFilter(!dateFilter)}
              />
              <p className="text-sm">Filter Date</p>
            </div>
            <div
              className="flex flex-row justify-center items-center gap-x-2 p-2 rounded-md shadow-md border border-slate-400 cursor-pointer hover:bg-black hover:text-white"
              onClick={openModal}
            >
              <CiCirclePlus className="text-2xl" />
              <p className="text-sm">New Complain</p>
            </div>
          </div>
        </div>
      </div>

      {dateFilter && (
        <div className="dropdown-container absolute right-5 top-28 z-10 bg-white shadow-lg border rounded-lg p-4">
          <CustomDatePicker />
        </div>
      )}

      <ModalAddTicketManual isOpen={isModalVisible} closePopup={closeModal} />
    </>
  );
}

export default TitleHeader;
