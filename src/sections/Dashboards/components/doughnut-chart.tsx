import { Doughnut } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartDataType = {
  datasetLabel?: string;
  labels: Array<string>;
  values: Array<number>;
  backgroundcolor: Array<string>;
};
export const DoughnutChart = ({ labels, values, datasetLabel, backgroundcolor }: ChartDataType) => {
  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        backgroundColor: backgroundcolor,
        borderColor: backgroundcolor,
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};
