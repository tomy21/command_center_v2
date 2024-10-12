import React from "react";
import { AiOutlineFall } from "react-icons/ai";

export default function CardDashboard({ title, value, percentage, color }) {
  return (
    <div>
      <div
        className={`w-48 h-24 bg-white border-l-4 ${color} rounded-e-md shadow-md flex flex-col justify-start items-start mt-3 px-2 py-1`}
      >
        <h1 className="text-sm font-semibold text-gray-400 mb-3">{title}</h1>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-xl">{value}</h1>
          <div className="flex flex-row justify-center items-center bg-red-100 text-red-600 px-2 py-1 rounded-md space-x-3">
            <AiOutlineFall size={20} />
            <p className="text-xs">{percentage}%</p>
          </div>
        </div>
        <p className="text-xs font-normal text-slate-300 mt-2">vs yesterday</p>
      </div>
    </div>
  );
}
