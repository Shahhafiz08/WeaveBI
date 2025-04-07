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

type IncommingDataType = {
  chartData: Array<{ label: string; data: Array<Number> }>;
  labels: Array<string>;
  backgroundcolor?: Array<string>;
  queryId: number;
  title: string;
};

export const StackedChart = ({
  labels,
  queryId,
  title,
  chartData,
  backgroundcolor,
}: IncommingDataType) => {
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
    datasets: chartData.map((chart) => ({
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
        height: '100%',
        textAlign: 'start',
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography>{title}</Typography>

      <Bar data={data} options={options} />
    </Paper>
  );
};
