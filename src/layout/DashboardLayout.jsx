import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { WebSocketContext } from "../components/WebSocketProvider";
import { getTransaction } from "../api/apiOcc";

export default function DashboardLayout() {
  const { message, isOpen, closePopup } = useContext(WebSocketContext);
  const [imageSrc, setImageSrc] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi handle submit untuk form keluhan
  const handleSubmit = (event) => {
    event.preventDefault();
    const complaint = event.target.complaint.value;
    console.log("Complaint submitted:", complaint);
    closePopup();
  };
  console.log(imageSrc);
  useEffect(() => {
    const fetchImageCCTV = async () => {
      try {
        const response = await getTransaction.getFoto(
          message.data.channel_cctv
        );
        console.log(response);
        const blob = new Blob([response], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching CCTV image:", error);
      }
    };

    if (message?.data?.channel_cctv) {
      fetchImageCCTV();
    }
  }, [message?.data?.channel_cctv]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <Sidebar isOpen={isSidebarOpen} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? "sm:ml-0 ml-60" : "ml-0 sm:ml-60"
          }`}
        >
          <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          <div className="p-4 flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {!message ? (
        ""
      ) : (
        <>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center px-4 py-3">
                  <p className="mb-2">{message?.data?.location?.Name}</p>
                  <button onClick={closePopup} className="">
                    X
                  </button>
                </div>
                <div className="border-b border-slate-300 w-full p-0"></div>
                <div className="flex justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="CCTV Capture"
                      className="w-60 h-auto py-4"
                    />
                  ) : (
                    <p>Loading image...</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-start px-4 py-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gate
                    </label>
                    <h1 className="text-xl font-bold mb-2">
                      {message?.data?.gate}
                    </h1>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tanggal
                    </label>
                    <p className="mb-2">{new Date().toLocaleString()}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="text-end px-4 py-3">
                  <div className="grid grid-cols-2 gap-4 text-start mb-1">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category Complain:
                      </label>
                      <select
                        id="category"
                        name="category"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="service">Service Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="object"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Object Complain:
                      </label>
                      <select
                        id="object"
                        name="object"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                      >
                        <option value="">Select object</option>
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="network">Network</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 text-start">
                    <label
                      htmlFor="complaint"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Input your complaint:
                    </label>
                    <textarea
                      id="complaint"
                      name="complaint"
                      rows="4"
                      className="mt-1 p-2 w-full border rounded-md"
                      placeholder="Enter your complaint here..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded items-start"
                  >
                    Submit Complaint
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
