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
      const response = await Category.getAll();
      const categories = response.categories.map((item) => item.category);
      console.log(categories);
      setListCategory(categories);
      setChartData(Array(categories.length).fill(100));
    } catch (error) {
      console.log(error);
    }
  };

  const [state, setState] = useState({
    series: [
      {
        data: [800, 100, 300],
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
        colors: ["#3C50E0"],
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
