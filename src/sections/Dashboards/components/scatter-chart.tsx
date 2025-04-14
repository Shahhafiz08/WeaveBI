import { Scatter } from 'react-chartjs-2';
import {
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Chart as ChartJS,
} from 'chart.js';

import { Paper, Typography } from '@mui/material';

import QueryOptions from './query-options';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
type incommingDataType = {
  chartData: Array<{
    label: string;
    data: Array<{ x: string; y: string }>;
  }>;
  backgroundcolor: Array<string>;
  queryId: number;
  title: string;
};

export const ScatterChart = ({ queryId, title, chartData, backgroundcolor }: incommingDataType) => {
  const options = {
    maintainAspectRatio: true,
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
        x: item.x,
        y: item.y,
      })),
      backgroundColor: backgroundcolor,
      borderColor: backgroundcolor,
    })),
  };

  return (
    <Paper key={queryId} sx={{ textAlign: 'start', p: 3, borderRadius: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline' }}>{title}</Typography>
        <QueryOptions queryId={queryId} />
      </div>
      <Scatter data={data} options={options} />
    </Paper>
  );
};

export default ScatterChart;
