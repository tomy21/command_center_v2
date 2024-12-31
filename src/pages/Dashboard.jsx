import React, { useEffect, useState } from "react";
import CardDashboard from "../components/CardDashboard";
import ChartOne from "../components/chart/ChartOne";
import ChartBar from "../components/chart/ChartBar";
import TableTicket from "../components/table/TableTicket";
import TitleHeader from "../components/TitleHeader";
import { Category } from "../api/apiMaster";

function Dashboard() {
  const [countStatus, setCountStatus] = useState([]);
  const [countAll, setCountAll] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Category.summaryData();
        setCountAll(response.countAll.count);
        setCountStatus(response.data.count);
        console.log(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TitleHeader title={"Dashboard"} />
      <div className="flex flex-col justify-start items-start w-full p-3">
        <div className="flex justify-between items-start w-full space-x-2">
          <div className="flex flex-col justify-start items-start w-[70%] space-y-3">
            <div className="w-full flex justify-between items-center gap-1">
              <CardDashboard
                title={"Total Complain"}
                value={countAll}
                percentage={20}
                color={"border-red-500"}
              />

              <CardDashboard
                title={"Solved"}
                value={countStatus[0]?.count ?? 0}
                percentage={20}
                color={"border-green-500"}
              />
              <CardDashboard
                title={"New"}
                value={countStatus[1]?.count ?? 0}
                percentage={20}
                color={"border-amber-500"}
              />

              <CardDashboard
                title={"Open Gate"}
                value={5}
                percentage={1}
                color={"border-red-500"}
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

        <div className="flex flex-row justify-start items-start w-full space-x-2">
          <div className="flex flex-col justify-start items-start w-[70%] space-y-3">
            <TableTicket />
          </div>
          <div className="flex flex-col justify-start items-start bg-white rounded-md w-[30%] px-3 py-2 mt-3">
            <h1 className="text-sm">Officer list</h1>
            <p className="text-xs text-slate-300">Officer yang sedang aktif</p>

            <table className="w-full mt-3">
              <tbody>
                <tr>
                  <td>
                    <div className="flex flex-row justify-start items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                      <div className="flex flex-col justify-start items-start">
                        <h1 className="text-sm">Endang</h1>
                        <p className="text-xs text-slate-300">
                          Endang@gmail.com
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-row justify-start items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <p className="text-xs">Online</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
