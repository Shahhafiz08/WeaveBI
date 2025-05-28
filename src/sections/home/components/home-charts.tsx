import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
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

import { primary } from 'src/theme/core';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyQueryId = 101;

export const HomeCharts = ({
  color,
  title,
  response,
}: {
  color: string;
  title: string;
  response: any;
}) => {
  const [shade, setShade] = useState<string[]>([]);

  useEffect(() => {
    const pinkShades = ['#EB6477', '#ED7586', '#EF8695', '#F298A4', '#F4A9B3'];
    const redShades = ['#548587', '#60999B', '#73A6A8', '#87B3B5', '#9BC0C1'];
    setShade(color === 'pink' ? pinkShades : redShades);
  }, [color]);

  const data = {
    labels: response?.labels || [],
    datasets:
      response?.datasets?.map((item: any) => ({
        label: item.label,
        data: item.data,
        backgroundColor: shade,
        borderColor: shade,
        maxBarThickness: 50,
      })) || [],
  };

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
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Paper
      key={dummyQueryId}
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
        <Typography sx={{ color: primary.menu }} style={{ display: 'inline' }}>
          {title}
        </Typography>
      </div>

      <div
        style={{
          padding: 20,
          paddingLeft: '15px',
          paddingRight: '15px',
          width: '100%',
          height: '100%',
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </Paper>
  );
};
