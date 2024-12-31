import React from "react";
import { AiOutlineExclamationCircle, AiOutlineFall } from "react-icons/ai";
import { HiAnnotation } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";

export default function CardDashboard({ title, value, percentage, color }) {
  return (
    <div>
      <div
        className={`w-44 h-24 shadow-md flex flex-col justify-start items-start mt-3 p-3 rounded-md ${
          title === "Total Complain"
            ? "bg-black text-white"
            : title === "Open Gate"
            ? "bg-red-300 text-white"
            : "bg-white text-black"
        } `}
      >
        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="text-sm font-normal ">{title}</h1>
          <div
            className={`rounded-full border-t border-l p-1 ${
              title === "Total Complain"
                ? "border-amber-300 "
                : title === "Open Gate"
                ? "border-red-500"
                : "border-black"
            }`}
          >
            {title === "Total Complain" ? (
              <HiAnnotation className="" size={20} />
            ) : title === "Solved" ? (
              <FaCheck className="" size={20} />
            ) : title === "New" ? (
              <AiOutlineExclamationCircle className="" size={20} />
            ) : title === "Open Gate" ? (
              <img src="/openGate.png" className="w-5 h-5" alt="" />
            ) : (
              <img src="/gate.png" className="w-5 h-5" alt="" />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl">{value}</h1>
          <div className="flex flex-row justify-center items-center  text-red-600 px-2 py-1 rounded-md space-x-3">
            <p className="text-xs">
              <span>+</span> {percentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
