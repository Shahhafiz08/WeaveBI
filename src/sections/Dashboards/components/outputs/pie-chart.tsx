import { Pie } from 'react-chartjs-2';
import { Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';

import { Paper, Typography } from '@mui/material';

import NoDataFound from 'src/sections/components/no-data-found';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: queryData.colors?.chartColor,
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 20,
      elements: {
        arc: {
          radius: '150%',
        },
      },
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
    labels: queryData.data?.labels ?? [],
    datasets: queryData.data.datasets?.map((value: any) => ({
      label: value.lable,
      data: value.data,
      borderColor: chartColor,
      backgroundColor: chartColor,
    })),
  };

  return (
    <Paper
      key={queryData.id}
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
            textTransform: 'capitalize',
          }}
        >
          {queryData.name}
        </Typography>

        <QueryOptions
          fetchDashboardInfo={fetchDashboardInfo}
          changeChatType="changeit"
          showOptions="yesShow"
          query={queryData}
          setChartColor={setChartColor}
          chartColor={chartColor}
        />
      </div>

      <div
        style={{
          flexGrow: 1,
          minHeight: '200px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.datasets.length <= 0 || data.labels.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Pie data={data} options={options} />
        )}
      </div>
    </Paper>
  );
};
