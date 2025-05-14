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

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
type incommingDataType = {
  chartData: Array<{
    label: string;
    data: Array<{ x: string; y: string }>;
  }>;

  queryId: number;
  title: string;

  incommingChartColor: string;
};

export const ScatterChart = ({
  incommingChartColor,
  queryId,
  title,
  chartData,
}: incommingDataType) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ queryId });

  const chartProps = 'chart';

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
    datasets: chartData?.map((chart) => ({
      label: chart.label,
      data: chart.data?.map((item) => ({
        x: Number(item.x),
        y: Number(item.y),
      })),
      backgroundColor: chartColor,
      borderColor: chartColor,
    })),
  };

  return (
    <Paper key={queryId} sx={{ borderRadius: 2, width: '100%', height: '100%' }}>
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
          queryId={queryId}
          setChartColor={setChartColor}
          chart={chartProps}
          handleChangeXTitle={handleChangeXTitle}
          handleChangeYTitle={handleChangeYTitle}
          incommingChartColor={chartColor}
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
