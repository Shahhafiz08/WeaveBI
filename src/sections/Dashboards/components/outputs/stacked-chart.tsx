import type { ChartOptions } from 'chart.js';

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

import QueryOptions from '../query-options';
import { useProperties } from '../../hooks/use-properties';
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type IncommingDataType = {
  chartData: Array<{ label: string; data: number[] }>;
  labels: string[];
  queryId: number;
  title: string;
  incommingChartColor: string;
  incommingTitleColor: string;
};

export const StackedChart = ({
  labels,
  queryId,
  title,
  chartData,
  incommingChartColor,
  incommingTitleColor,
}: IncommingDataType) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor,
  });
  const checkChart = 'chart';
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ queryId });

  const options: ChartOptions<'bar'> = {
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
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  const finalChartColor =
    Array.isArray(chartColor) && chartColor.length > 0
      ? chartColor
      : [
          '#EB6477',
          '#ED7586',
          '#EF8695',
          '#F298A4',
          '#F4A9B3',
          '#F6BAC3',
          '#F8CBD2',
          '#FBDDE1',
          '#FDEEF0',
        ];
  const data = {
    labels,
    datasets: chartData.map((chart, index) => {
      const color = finalChartColor[index % finalChartColor.length];
      return {
        label: chart.label,
        data: chart.data,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      };
    }),
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{title}</Typography>
        <QueryOptions
          chart={checkChart}
          handleChangeXTitle={handleChangeXTitle}
          handleChangeYTitle={handleChangeYTitle}
          chartColor={chartColor}
          incommingChartColor={chartColor}
          setChartColor={setChartColor}
          queryId={queryId}
        />
      </div>

      <Bar data={data} options={options} />
    </Paper>
  );
};
