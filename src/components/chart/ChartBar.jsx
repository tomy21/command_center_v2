import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Category } from "../../api/apiMaster";

const ChartBar = () => {
  const [listCategory, setListCategory] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await Category.summaryDataCategory();
      if (response && response.data && response.data.length > 0) {
        const categories = response.data.map(
          (item) => item?.category || "Unknown"
        );
        const categoriesCount = response.data.map(
          (item) => item?.issueCount || 0
        );
        setListCategory(categories);
        setChartData(categoriesCount);
      } else {
        setListCategory([]);
        setChartData([]);
      }
    } catch (error) {
      console.log(error);
      setListCategory([]);
      setChartData([]);
    }
  };

  const [state, setState] = useState({
    series: [
      {
        data: chartData,
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
        categories: listCategory,
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
        colors: ["#FFA24C"],
      },
    },
  });

  useEffect(() => {
    // Update state saat kategori atau data berubah
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          data: chartData,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: listCategory,
        },
      },
    }));
  }, [listCategory, chartData]);

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
