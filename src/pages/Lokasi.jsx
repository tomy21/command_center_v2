import React from "react";
import TableLocation from "../components/table/TableLocation";

export default function Lokasi() {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full mt-12">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-semibold">Lokasi</h1>
          <div>2022 Jun 10</div>
        </div>

        <TableLocation />
      </div>
    </>
  );
}
