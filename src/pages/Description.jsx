import React from "react";
import TableDescription from "../components/table/TableDescription";
import TitleHeader from "../components/TitleHeader";

export default function Object() {
  return (
    <>
      <TitleHeader title={"Description"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableDescription />
      </div>
    </>
  );
}
