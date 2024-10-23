import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Issues } from "../../api/apiOcc";

const ChartOne = () => {
  const [categories, setCategories] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Issues.summaryPerMonth();
        console.log(response);
        const data = response.data;

        // Ekstrak bulan dan issueCount dari response
        const months = data.map((item) => item.month);
        const counts = data.map((item) => item.issueCount);

        // Set data ke state
        setCategories(months);
        setSeriesData(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
    stroke: {
      width: [1, 2],
      curve: "smooth",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 1,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: categories, // Use dynamic categories from API
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: Math.max(...seriesData) + 10, // Optional: Adjust y-axis max based on data
    },
  };

  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //   }));
  // };

  return (
    <div className="col-span-12 rounded-md border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 w-full h-full">
      <div>
        <h1 className="text-sm font-medium text-start mt-1">Total Complain</h1>
        <p className="text-xs text-slate-300 text-start">
          Total complain per bulan
        </p>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={[
              {
                name: "Total Issues",
                data: seriesData, // Use dynamic data from API
              },
            ]}
            type="area"
            height={165}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
