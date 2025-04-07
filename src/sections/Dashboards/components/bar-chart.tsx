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

import { Paper, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type incommingDataType = {
  chartData: Array<string>;
  labels: Array<string>;
  title: string;
  queryId: number;
  backgroundcolor: Array<string>;
};

export const BarChart = ({
  labels,
  chartData,
  queryId,
  title,

  backgroundcolor,
}: incommingDataType) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 40,
        left: 10,
        right: 10,
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
  };
  return (
    <Paper
      key={queryId}
      elevation={2}
      sx={{
        width: '100%',
        textAlign: 'start',
        p: 3,
        borderRadius: 2,
        height: '100%',
      }}
    >
      <Typography>{title}</Typography>
      <Bar data={data} options={options} />
    </Paper>
  );
};
