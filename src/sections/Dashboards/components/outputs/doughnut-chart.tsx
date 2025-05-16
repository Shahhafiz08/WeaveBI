import { Doughnut } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

import { Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { QueryResponse } from '../../types/inference';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const DoughnutChart = ({ query }: QueryResponse) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#666',
          padding: 10,
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 1,
        cornerRadius: 8,
        bodySpacing: 1,
        titleFont: {
          weight: 'bold' as const,
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
      title: {
        display: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cutout: '60%',
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
      sx={{
        textAlign: 'start',
        borderRadius: 2,
        padding: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {query.name}
        </Typography>

        <QueryOptions
          chartColor={chartColor}
          changeChatType="changeit"
          showOptions="yesShow"
          query={query}
          setChartColor={setChartColor}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          minHeight: '200px',
          position: 'relative',
        }}
      >
        <Doughnut options={options} data={data} />
      </div>
    </Paper>
  );
};
