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
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
type incommingDataType = {
  datasetLabel?: string;
  labels: Array<string>;
  values: Array<number>;
  incommingTitleColor: string;
  incommingChartColor: string;
  title: string;
  queryId: number;
};

export const LineChart = ({
  incommingTitleColor,
  labels,
  incommingChartColor,
  values,
  title,
  queryId,
  datasetLabel,
}: incommingDataType) => {
  const { titleColor, setTitleColor, setChartColor, chartColor } = useColorPicker({
    incommingTitleColor,
    incommingChartColor,
  });

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
        borderColor: chartColor,
        backgroundColor: chartColor,
      },
    ],
  };

  return (
    <Paper key={queryId} elevation={2} sx={{ textAlign: 'start', borderRadius: 2, height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          paddingBottom: '0px',
        }}
      >
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          chartColor={chartColor}
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
          incommingChartColor={chartColor}
          incommingTitleColor={titleColor}
        />
      </div>
      <div
        style={{
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          height: '90%',
        }}
      >
        <Line options={options} data={data} />
      </div>
    </Paper>
  );
};
