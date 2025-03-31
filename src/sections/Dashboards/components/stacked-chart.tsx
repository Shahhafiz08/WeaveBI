import { Bar } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type IncommingDataType = {
  chartData: Array<{ label: string; data: Array<Number> }>;
  labels: Array<string>;
  backgroundcolor?: Array<string>;
};

export const StackedChart = ({ labels, chartData, backgroundcolor }: IncommingDataType) => {
  const options = {
    plugins: {},
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Construct the `data` object correctly
  const data = {
    labels,
    datasets: chartData.map((chart) => ({
      label: chart.label,
      data: chart.data,
      backgroundColor: backgroundcolor,
      borderColor: backgroundcolor,
    })),
  };

  return <Bar options={options} data={data} />;
};
