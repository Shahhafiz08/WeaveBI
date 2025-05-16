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

import type { QueryResponse } from '../../types/inference';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = ({ query }: QueryResponse) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle, title } = useProperties({
    query,
  });

  const checkChart = 'chart';
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
    labels: query.data?.labels ?? [],
    datasets: [
      {
        label: query.data.datasetLabel?.[0] ?? 'Dataset',
        data:
          query.data.values?.map((value) => (typeof value === 'string' ? Number(value) : value)) ??
          [],
        borderColor: chartColor,
        backgroundColor: chartColor,
      },
    ],
  };

  return (
    <Paper
      key={query.id}
      elevation={2}
      sx={{ textAlign: 'start', borderRadius: 2, height: '100%' }}
    >
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
          chartColor={chartColor}
          query={query}
          showOptions="yesShow"
          isChart={checkChart}
          handleChangeYTitle={handleChangeYTitle}
          handleChangeXTitle={handleChangeXTitle}
          setChartColor={setChartColor}
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
