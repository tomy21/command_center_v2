import React from "react";
import TitleHeader from "../components/TitleHeader";
import TableRefLocation from "../components/table/TableRefLocation";

export default function Lokasi() {
  return (
    <>
      <TitleHeader title={"Location"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableRefLocation />
      </div>
    </>
  );
}
