import React from "react";
import TableObject from "../components/table/TableObject";

export default function Object() {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full mt-12">
        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="text-lg font-semibold">Object</h1>
          <div>2022 Jun 10</div>
        </div>

        <TableObject />
      </div>
    </>
  );
}
