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

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
type incommingDataType = {
  chartData: Array<{
    label: string;
    data: Array<{ x: string; y: string }>;
  }>;
 
  queryId: number;
  title: string;
};

export const ScatterChart = ({ queryId, title, chartData }: incommingDataType) => {
  const { titleColor, setTitleColor, setChartColor, chartColor, blueGradient } = useColorPicker();


  const options = {
    maintainAspectRatio: true,
    // responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 40,
        left: 10,
        right: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    datasets: chartData?.map((chart) => ({
      label: chart.label,
      data: chart.data?.map((item) => ({
        x: item.x,
        y: item.y,
      })),
      backgroundColor: !chartColor ? blueGradient : chartColor,
      borderColor: !chartColor ? blueGradient : chartColor,
    })),
  };

  return (
    <Paper key={queryId} sx={{ textAlign: 'start', p: 3, borderRadius: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          queryId={queryId}
          setChartColor={setChartColor}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
      </div>
      <Scatter data={data} options={options} />
    </Paper>
  );
};

export default ScatterChart;
