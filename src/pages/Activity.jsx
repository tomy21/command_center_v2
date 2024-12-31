import React, { useEffect, useState } from "react";
import TableLogActivation from "../components/table/TableLogActivation";
import TitleHeader from "../components/TitleHeader";

export default function Activity() {
  const [currentDate, setCurrentDate] = useState("");

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // format 24 jam
    };
    return date.toLocaleString("id-ID", options); // Format tanggal sesuai dengan lokal Indonesia
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(formatDate(now));
    }, 1000); // Update setiap detik

    return () => clearInterval(interval); // Cleanup interval saat komponen unmounted
  }, []);

  return (
    <>
      <TitleHeader title={"Activity"} />
      <div className="flex flex-col justify-start items-start w-full mt-3 px-4">
        <TableLogActivation />
      </div>
    </>
  );
}
