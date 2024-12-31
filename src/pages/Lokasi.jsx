import React from "react";
import TableLocation from "../components/table/TableLocation";
import TitleHeader from "../components/TitleHeader";

export default function Lokasi() {
  return (
    <>
      <TitleHeader title={"Location"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableLocation />
      </div>
    </>
  );
}
