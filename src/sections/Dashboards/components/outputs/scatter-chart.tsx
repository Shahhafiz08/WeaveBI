import type { ChartOptions } from 'chart.js';

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
import { useProperties } from '../../hooks/use-properties';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { QueryResponse } from '../../types/inference';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const ScatterChart = ({ query }: QueryResponse) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ query });

  const checkChart = 'chart';

  const options: ChartOptions<'scatter'> = {
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
        beginAtZero: true,
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
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = {
    datasets: query.data.datasets?.map((chart: any) => ({
      label: chart.label,
      data: chart.data?.map((item: any) => ({
        x: Number(item.x),
        y: Number(item.y),
      })),
      backgroundColor: chartColor,
      borderColor: chartColor,
    })),
  };

  return (
    <Paper key={query.id} sx={{ borderRadius: 2, width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          paddingBottom: '0px',
        }}
      >
        <Typography style={{ display: 'inline' }}>{query.name}</Typography>
        <QueryOptions
          chartColor={chartColor}
          query={query}
          setChartColor={setChartColor}
          showOptions="yesShow"
          changeChatType="changeit"
          isChart={checkChart}
          handleChangeXTitle={handleChangeXTitle}
          handleChangeYTitle={handleChangeYTitle}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: '5px',
          paddingRight: '25px',
          paddingBottom: '15px',
        }}
      >
        {' '}
        <Scatter data={data} options={options} />
      </div>
    </Paper>
  );
};

export default ScatterChart;
