import React from "react";
import TableCategory from "../components/table/TableCategory";
import TitleHeader from "../components/TitleHeader";

export default function Category() {
  return (
    <>
      <TitleHeader title={"Category"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableCategory />
      </div>
    </>
  );
}
