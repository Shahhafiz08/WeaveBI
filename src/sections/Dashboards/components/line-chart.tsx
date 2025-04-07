import { Line } from 'react-chartjs-2';
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

import { Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
type incommingDataType = {
  datasetLabel?: string;
  labels: Array<string>;
  values: Array<number>;
  backgroundcolor: Array<string>;
  title: string;
  queryId: number;
};

export const LineChart = ({
  labels,
  values,
  title,
  queryId,
  datasetLabel,
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
    datasets: [
      {
        label: datasetLabel,
        data: values,
        borderColor: backgroundcolor,
        backgroundColor: backgroundcolor,
      },
    ],
  };

  return (
    <Paper
      key={queryId}
      elevation={2}
      sx={{ textAlign: 'start', p: 3, borderRadius: 2, height: '100%' }}
    >
      <Typography gutterBottom>{title}</Typography>
      <Line options={options} data={data} />;
    </Paper>
  );
};
