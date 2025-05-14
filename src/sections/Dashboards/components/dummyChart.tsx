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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyLabels = ['Login Issues', 'Payment Failed', 'Account Setup', 'Password Reset'];
const dummyTitle = 'Query Execution time';
const dummyQueryId = 101;

export const DummyChart = ({ color }: { color: string }) => {
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
    <Paper key={dummyQueryId} sx={{ position: 'relative' }}>
      <div
        style={{
          width: '100%',
          // height: '100%',
          height: 250,
          display: 'flex',
          paddingLeft: '40px',
        }}
      >
        <Typography
          style={{
            fontWeight: '300',
            position: 'absolute',
            top: '30%',
            right: '80%',
            rotate: '-90deg',
            width: 250,
          }}
        >
          {dummyTitle}
        </Typography>
        <Bar
          style={{
            height: 250,
          }}
          data={data}
          options={options}
        />
      </div>
    </Paper>
  );
};
