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

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

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
  const { titleColor, setTitleColor, setChartColor, chartColor, blueGradient } = useColorPicker();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        borderColor: !chartColor ? blueGradient : chartColor,
        backgroundColor: !chartColor ? blueGradient : chartColor,
      },
    ],
  };

  return (
    <Paper
      key={queryId}
      elevation={2}
      sx={{ textAlign: 'start', p: 3, borderRadius: 2, height: '100%' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
      </div>
      <Line options={options} data={data} />
    </Paper>
  );
};
