import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdLogout,
  MdAssignment,
  MdFolderOpen,
  MdLocationPin,
  MdFiberManualRecord,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import { users } from "../api/apiOcc";
import Loading from "./Loading";
import { IoIosBookmark } from "react-icons/io";
import { PiReadCvLogoBold } from "react-icons/pi";

const Sidebar = ({ isOpen }) => {
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMasterMenu = () => {
    setIsMasterOpen(!isMasterOpen);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await users.logout();
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="z-50 h-screen w-screen bg-white fixed top-0 left-0">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full w-56 bg-white shadow-900 text-gray-700 transition-transform duration-300 border-r border-slate-300 ${
        isOpen
          ? "translate-x-0 sm:hidden block"
          : "-translate-x-full sm:block hidden"
      } lg:translate-x-0 z-40`}
    >
      <div className="flex flex-row items-end justify-center h-[3.25rem] space-x-3">
        <img src={"/logo.svg"} className="w-12" alt="" />
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-base font-semibold">Dashboard</h1>
          <h1 className="text-sm">Command Center</h1>
        </div>
      </div>
      <div className="border-b w-full border-slate-300 my-5"></div>
      <nav className="px-4 py-4 overflow-auto">
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                location.pathname === "/dashboard"
                  ? "bg-gray-600 text-gray-100"
                  : ""
              }`}
            >
              <MdDashboard className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/ticket"
              className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                location.pathname === "/dashboard/ticket"
                  ? "bg-gray-600 text-gray-100"
                  : ""
              }`}
            >
              <MdAssignment className="mr-2" /> Ticket
            </Link>
          </li>
          <li className="mb-4">
            <button
              onClick={toggleMasterMenu}
              className="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded w-full text-left"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-row ">
                  <MdFolderOpen className="mr-2" />
                  <h1>Master</h1>
                </div>
                {isMasterOpen ? (
                  <MdArrowDropUp size={20} />
                ) : (
                  <MdArrowDropDown size={20} />
                )}
              </div>
            </button>
            {isMasterOpen && (
              <ul className="ml-6 mt-2">
                <li className="mb-2">
                  <Link
                    to="/dashboard/master/category"
                    className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                      location.pathname === "/dashboard/master/category"
                        ? "bg-gray-600 text-gray-100"
                        : ""
                    }`}
                  >
                    <IoIosBookmark className="mr-2" /> Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/master/object"
                    className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                      location.pathname === "/dashboard/master/object"
                        ? "bg-gray-600 text-gray-100"
                        : ""
                    }`}
                  >
                    <IoIosBookmark className="mr-2" />
                    Description
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/lokasi"
              className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                location.pathname === "/dashboard/lokasi"
                  ? "bg-gray-600 text-gray-100"
                  : ""
              }`}
            >
              <MdLocationPin className="mr-2" /> Lokasi
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/activity"
              className={`flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded ${
                location.pathname === "/dashboard/activity"
                  ? "bg-gray-600 text-gray-100"
                  : ""
              }`}
            >
              <PiReadCvLogoBold className="mr-2" /> Activity
            </Link>
          </li>
          <li className="mb-4">
            <button
              className="flex items-center px-4 py-2 hover:bg-gray-600 hover:text-gray-100 rounded w-full"
              onClick={handleLogout}
            >
              <MdLogout className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
