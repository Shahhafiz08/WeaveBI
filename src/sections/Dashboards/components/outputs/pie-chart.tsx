import { Pie } from 'react-chartjs-2';
import { Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';

import { Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(ArcElement, Tooltip, Legend);

type IncomingDataType = {
  title?: string;
  datasetLabel?: string;
  labelss: string[];
  values: number[];

  queryId: number;
  incommingChartColor: string;
  incommingTitleColor: string;
};

export const PieChart = ({
  title,
  labelss,
  values,
  datasetLabel,

  queryId,
  incommingChartColor,
  incommingTitleColor,
}: IncomingDataType) => {
  const { titleColor, setTitleColor, setChartColor, chartColor } = useColorPicker({
    incommingChartColor,
    incommingTitleColor,
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
          padding: 15,
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
        padding: 10,

        bodySpacing: 8,
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
  };

  const data = {
    labels: labelss,
    datasets: [
      {
        label: datasetLabel || '',
        data: values,
        backgroundColor: chartColor,
        borderColor: chartColor,
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
          chartColor={chartColor}
          incommingChartColor={incommingChartColor}
          incommingTitleColor={incommingTitleColor}
          queryId={queryId}
          setChartColor={setChartColor}
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
        <Pie data={data} options={options} />
      </div>
    </Paper>
  );
};
