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

import { Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ChartDataType = {
  datasetLabel?: string;
  labels: Array<string>;
  values: Array<number>;
  backgroundcolor: Array<string>;
  queryId: number;
  title: string;
};
export const DoughnutChart = ({
  labels,
  queryId,
  title,
  values,
  datasetLabel,
  backgroundcolor,
}: ChartDataType) => {
    const { titleColor, chartColor, setTitleColor, setChartColor, blueGradient } = useColorPicker();


  const options = {
    layout: {
      padding: {
        top: 1,
        bottom: 1,
        left: 10,
        right: 10,
      },
    },

    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        backgroundColor: !chartColor ? blueGradient : chartColor,
        borderColor: !chartColor ? blueGradient : chartColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper key={queryId} elevation={2} sx={{ textAlign: 'start', p: 3, borderRadius: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
      </div>

      <Doughnut options={options} data={data} />
    </Paper>
  );
};
