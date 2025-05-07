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
  const { titleColor, setTitleColor, setChartColor, chartColor } = useColorPicker({
    incommingTitleColor,
    incommingChartColor,
  });

  const options = {
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
        position: 'top' as const,
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
  console.log(chartColor);
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
        <Typography style={{ color: titleColor }}>{title}</Typography>
        <QueryOptions
          chartColor={chartColor}
          incommingChartColor={chartColor}
          incommingTitleColor={titleColor}
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
      </div>

      <Bar data={data} options={options} />
    </Paper>
  );
};
