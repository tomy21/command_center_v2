import React, { useEffect, useState } from "react";
import { BsBell, BsGear } from "react-icons/bs";
import { TbAlignLeft } from "react-icons/tb";
import { users } from "../api/apiOcc";

export default function Navbar({ toggleSidebar, isOpen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await users.getById();
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);
  return (
    <div
      className={`fixed top-0 ${
        isOpen ? "md:left-0 sm:left-60" : "sm:left-0 md:left-60"
      } right-0 bg-white shadow-md z-30 left-0`}
    >
      <div className="flex justify-between items-center py-2 mx-4">
        <TbAlignLeft
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <div className="flex flex-row space-x-5 items-center">
          <BsBell className="text-xl" />
          <BsGear className="text-xl" />
          <div className="flex flex-row space-x-3 items-center">
            <img
              src={"/logo.png"}
              alt="User Logo"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col text-start">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs font-normal">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
