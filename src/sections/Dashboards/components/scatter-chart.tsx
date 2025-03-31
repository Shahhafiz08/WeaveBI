import { Scatter } from 'react-chartjs-2';
import {
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
type incommingDataType = {
  chartData: Array<{
    label: string;
    data: Array<{ x: string; y: string }>;
  }>;
  backgroundcolor: Array<string>;
};

export const ScatterChart = ({ chartData, backgroundcolor }: incommingDataType) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    datasets: chartData.map((chart) => ({
      label: chart.label,
      data: chart.data.map((item) => ({
        x: item.y,
        y: item.y,
      })),
      backgroundColor: backgroundcolor,
      borderColor: backgroundcolor,
    })),
  };

  return <Scatter data={data} options={options} />;
};

export default ScatterChart;
