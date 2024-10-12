import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartBar = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [800, 600, 400],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ["Hardware", "Member", "Payment"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        reversed: false,
      },
      fill: {
        colors: ["#3C50E0"],
      },
    },
  });

  return (
    <div className="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={280}
      />
    </div>
  );
};

export default ChartBar;
