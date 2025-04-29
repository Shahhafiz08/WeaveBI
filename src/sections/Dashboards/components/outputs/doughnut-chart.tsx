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
import { useColorPicker } from '../../hooks/useColorPicker';

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

type ChartDataType = {
  datasetLabel?: string;
  labels: string[];
  values: number[];
  queryId: number;
  title: string;
};

export const DoughnutChart = ({ labels, queryId, title, values, datasetLabel }: ChartDataType) => {
  const { titleColor, chartColor, setTitleColor, setChartColor, blueGradient } = useColorPicker();

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
    labels,
    datasets: [
      {
        label: datasetLabel || '',
        data: values,
        backgroundColor: chartColor || blueGradient,
        borderColor: chartColor || blueGradient,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper
      key={queryId}
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
            color: titleColor,

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>

        <QueryOptions
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
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
