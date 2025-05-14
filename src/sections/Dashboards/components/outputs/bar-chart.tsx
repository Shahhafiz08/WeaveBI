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

type incommingDataType = {
  chartData: Array<string>;
  labels: Array<string>;
  title: string;
  queryId: number;

  incommingChartColor: string;
};

export const BarChart = ({
  labels,
  chartData,
  queryId,
  title,
  incommingChartColor,
}: incommingDataType) => {
  const { titleColor, chartColor, setChartColor } = useColorPicker({
    incommingChartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ queryId });

  const checkChart = 'chart';
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
  };

  const data = {
    labels,
    datasets: chartData.map((chart: any) => ({
      label: chart.label,
      data: chart.data,
      backgroundColor: chartColor,
      borderColor: chartColor,
    })),
  };

  return (
    <Paper
      key={queryId}
      elevation={2}
      sx={{
        width: '100%',
        textAlign: 'start',

        borderRadius: 2,
        height: '100%',
      }}
    >
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
          chart={checkChart}
          handleChangeXTitle={handleChangeXTitle}
          handleChangeYTitle={handleChangeYTitle}
          incommingChartColor={incommingChartColor}
        />
      </div>

      <div
        style={{
          padding: 20,
          paddingLeft: '40px',
          paddingRight: '40px',
          width: '100%',
          height: '100%',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </Paper>
  );
};
