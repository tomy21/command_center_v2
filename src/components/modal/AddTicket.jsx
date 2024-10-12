import React from "react";

export default function AddTicket({ isVisible, onClose }) {
  if (!isVisible) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/2 text-start  ">
          <h2 className="text-xl font-semibold">Add Ticket</h2>
          <p className="text-xs font-normal text-slate-400 mb-4">
            Masukan jika ada kendala di lapangan
          </p>

          <div className="h-1 border-b border-slate-400 mb-4"></div>
          <form>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="ticketNumber"
              >
                Ticket Number
              </label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="text"
                id="ticketNumber"
                name="ticketNumber"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="text"
                id="location"
                name="location"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="text"
                id="category"
                name="category"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="category"
              >
                Object
              </label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="text"
                id="category"
                name="category"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-2 py-1"
                id="description"
                name="description"
              ></textarea>
            </div>
            {/* <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="vehicleNumber"
              >
                Vehicle Number
              </label>
              <input
                className="w-full border border-gray-300 rounded px-2 py-1"
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
              />
            </div> */}
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
