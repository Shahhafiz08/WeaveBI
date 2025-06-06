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

import NoDataFound from 'src/sections/components/no-data-found';

import QueryOptions from '../query-options';
import { useConfigure } from '../../hooks/use-configure';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const StackedChart = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor: queryData.colors?.chartColor,
  });

  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle } = useConfigure({
    query: queryData,
    fetchDashboardInfo,
  });
  const checkChart = 'chart';

  const options: ChartOptions<'bar'> = {
    scales: {
      x: {
        display: true,
        stacked: true,
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
        stacked: true,
        display: true,
        beginAtZero: true,
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
    plugins: {
      legend: {
        position: 'top',
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

  const data = {
    labels: queryData.data.labels,
    datasets: queryData.data.datasets?.map((chart: any, index: number) => {
      const color = finalChartColor[index % finalChartColor.length];
      return {
        label: chart.label,
        backgroundColor: color,
        borderColor: color,
        data: chart.data?.map((item: string | number) => item),
        maxBarThickness: 70,
      };
    }),
  };

  return (
    <Paper
      key={queryData.id}
      sx={{
        width: '100%',
        height: '100%',
        textAlign: 'start',
        p: 3,
        borderRadius: 2,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline', textTransform: 'capitalize' }}>
          {queryData.name}
        </Typography>

        <QueryOptions
          fetchDashboardInfo={fetchDashboardInfo}
          changeChatType="changeit"
          showOptions="yesShow"
          isChart={checkChart}
          query={queryData}
          handleChangeYTitle={handleChangeYTitle}
          handleChangeXTitle={handleChangeXTitle}
          setChartColor={setChartColor}
          chartColor={chartColor}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '5px',
          paddingRight: '25px',
          paddingBottom: '15px',
        }}
      >
        {!queryData.data.datasets ||
        !queryData.data.labels ||
        queryData.data.labels.length <= 0 ||
        queryData.data.datasets.length <= 0 ||
        queryData.data.datasets[0].data.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </Paper>
  );
};
