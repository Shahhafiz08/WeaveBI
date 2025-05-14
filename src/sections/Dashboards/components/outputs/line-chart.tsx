import type { ChartOptions } from 'chart.js';

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
import { useProperties } from '../../hooks/use-properties';
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type incommingDataType = {
  datasetLabel?: string;
  labels: Array<string>;
  values: Array<number>;
  incommingChartColor: string;
  title: string;
  queryId: number;
};

export const LineChart = ({
  labels,
  incommingChartColor,
  values,
  title,
  queryId,
  datasetLabel,
}: incommingDataType) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ queryId });
  const chart = 'chart';
  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: Xtitle,
          font: {
            size: 17,
            weight: 'bold',
            lineHeight: 1.2,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: Ytitle,
          font: {
            size: 17,
            weight: 'bold',
            lineHeight: 1.2,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
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
        <Typography style={{ display: 'inline' }}>{title}</Typography>
        <QueryOptions
          chart={chart}
          handleChangeYTitle={handleChangeYTitle}
          handleChangeXTitle={handleChangeXTitle}
          chartColor={chartColor}
          setChartColor={setChartColor}
          queryId={queryId}
          incommingChartColor={chartColor}
        />
      </div>
      <div
        style={{
          paddingLeft: '10px',
          paddingRight: '15px',
          paddingBottom: '15px',
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
