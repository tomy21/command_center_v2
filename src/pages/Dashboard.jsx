import React from "react";
import CardDashboard from "../components/CardDashboard";
import ChartOne from "../components/chart/ChartOne";
import ChartBar from "../components/chart/ChartBar";
import TableTicket from "../components/table/TableTicket";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-full mt-12">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div>2022 Jun 10</div>
        </div>
        <div className="flex justify-between items-start w-full space-x-2">
          <div className="flex flex-col justify-start items-start w-[70%] space-y-3">
            <div className="w-full flex justify-between items-center ">
              <CardDashboard
                title={"Total Complain"}
                value={10}
                percentage={20}
                color={"border-red-500"}
              />
              <CardDashboard
                title={"Selesai"}
                value={10}
                percentage={20}
                color={"border-green-500"}
              />
              <CardDashboard
                title={"Pending"}
                value={10}
                percentage={20}
                color={"border-amber-500"}
              />
            </div>
            <ChartOne />
          </div>
          <div className="flex flex-col justify-start items-start bg-white rounded-md w-[30%] px-3 py-2 mt-3">
            <h1 className="text-sm">Kategori</h1>
            <p className="text-xs text-slate-300">
              Komplen berdasarkan kategory
            </p>
            <ChartBar />
          </div>
        </div>

        <TableTicket />
      </div>
    </>
  );
}

export default Dashboard;
