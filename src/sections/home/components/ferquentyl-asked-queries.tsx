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

const dummyLabels = [
  'Login Issues',
  'Payment Failed',
  'Account Setup',
  'Password Reset',
  'Other',
  'abc',
  'def',
];
const dummyTitle = 'Frequently Asked Support Queries';
const dummyQueryId = 101;

export const FrequeryntlyAskedQueries = ({ color }: { color: string }) => {
  const [shade, setShade] = useState<string[]>([]);

  useEffect(() => {
    const pinkShades = ['#EB6477', '#ED7586', '#EF8695', '#F298A4', '#F4A9B3'];
    const redShades = ['#548587', '#60999B', '#73A6A8', '#87B3B5', '#9BC0C1'];
    if (color === 'pink') {
      setShade(pinkShades);
    } else {
      setShade(redShades);
    }
  }, [color]);

  const data = {
    labels: dummyLabels,
    datasets: [
      {
        label: 'Query Count',
        data: [12, 19, 3, 5, 2, 8, 10],
        backgroundColor: shade,
        borderColor: shade,
        borderWidth: 1,
      },
    ],
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
        position: 'top' as const,
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
          {dummyTitle}
        </Typography>
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
