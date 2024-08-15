import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const data = {
    labels: [
      "8:45 AM",
      "9:15 AM",
      "9:45 AM",
      "10:15 AM",
      "10:45 AM",
      "11:15 AM",
      "11:45 AM",
      "12:15 PM",
      "12:45 PM",
      "1:15 PM",
      "1:45 PM",
      "2:15 PM",
      "2:45 PM",
      "3:15 PM",
      "3:45 PM",
      "4:15 PM",
      "4:45 PM",
      "5:15 PM",
      "5:45 PM",
      "6:15 PM",
      "6:45 PM",
      "7:15 PM",
      "7:45 PM",
      "8:15 PM",
      "8:45 PM",
      "9:15 PM",
      "9:45 PM",
      "10:15 PM",
      "10:45 PM",
      "11:15 PM",
      "11:45 PM",
      "12:15 AM",
      "12:45 AM",
      "1:15 AM",
      "1:45 AM",
      "2:15 AM",
      "2:45 AM",
      "3:15 AM",
      "3:45 AM",
      "4:15 AM",
      "4:45 AM",
      "5:15 AM",
      "5:45 AM",
      "6:15 AM",
      "6:45 AM",
      "7:15 AM",
      "7:45 AM",
      "8:15 AM",
    ],
    datasets: [
      {
        label: "Price (Past 1 Days) in INR",
        data: [
          1000, 1010, 1005, 1020, 1030, 1045, 1050, 1040, 1035, 1060, 1070,
          1085, 1090, 1075, 1080, 1100, 1110, 1130, 1140, 1155, 1170, 1180,
          1195, 1200, 1220, 1230, 1245, 1250, 1265, 1270, 1265, 1285, 1290,
          1300, 1285, 1300, 1275, 1285, 1250, 1320, 1340, 1290, 1265, 1300,
          1290, 1320, 1345, 1300,
        ],
        borderColor: "lightblue",
        backgroundColor: "rgba(173, 216, 230, 0.2)", // light blue with transparency
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 0, // no points
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "lightblue",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "lightgray",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "lightgray",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // light grid lines
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
