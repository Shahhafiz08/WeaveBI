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

type incommingDataType = {
  chartData: Array<string>;
  labels: Array<string>;

  backgroundcolor: Array<string>;
};

export const BarChart = ({
  labels,
  chartData,

  backgroundcolor,
}: incommingDataType) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets: chartData.map((chart: any) => ({
      label: chart.label,
      data: chart.data,
      backgroundColor: backgroundcolor,
      borderColor: backgroundcolor,
    })),

    // [
    //   {
    //     label: datasetLabel,
    //     data: values,
    //     backgroundColor: backgroundcolor,
    //   },
    // ],
  };
  return <Bar data={data} options={options} />;
};
