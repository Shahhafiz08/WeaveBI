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

import type { QueryResponse } from '../../types/inference';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = ({ query }: QueryResponse) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useProperties({ query });

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
    labels: query.data?.labels ?? [],
    datasets: query.data.datasets?.map((chart: any) => ({
      label: chart.label,
      data: chart.data,
      backgroundColor: chartColor,
      borderColor: chartColor,
    })),
  };

  return (
    <Paper
      key={query.id}
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
        <Typography style={{ display: 'inline' }}>{query.name}</Typography>
        <QueryOptions
          changeChatType="changeit"
          showOptions="yesShow"
          isChart={checkChart}
          query={query}
          handleChangeYTitle={handleChangeYTitle}
          handleChangeXTitle={handleChangeXTitle}
          setChartColor={setChartColor}
          chartColor={chartColor}
        />
      </div>

      <div
        style={{
          padding: 20,
          paddingLeft: '0px',
          paddingRight: '20px',
          width: '100%',
          height: '100%',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </Paper>
  );
};
