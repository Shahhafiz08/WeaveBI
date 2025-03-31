import { Pie } from 'react-chartjs-2';
import { Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
type incommingDataType = {
  title?: string;
  datasetLabel?: string;
  labelss: Array<string>;
  values: Array<number>;
  backgroundcolor: Array<string>;
};

export const PieChart = ({
  title,
  labelss,
  values,
  datasetLabel,
  backgroundcolor,
}: incommingDataType) => {
  const data = {
    labels: labelss,
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

  return <Pie data={data} />;
};
