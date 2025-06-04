import type { ChartOptions } from 'chart.js';

import { Line } from 'react-chartjs-2';
import {
  Title,
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

import { Paper, Typography } from '@mui/material';

import NoDataFound from 'src/sections/components/no-data-found';

import QueryOptions from '../query-options';
import { useConfigure } from '../../hooks/use-configure';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const LineChart = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { setChartColor, chartColor } = useColorPicker({
    incommingChartColor: queryData.colors?.chartColor,
  });
  const { Xtitle, handleChangeXTitle, handleChangeYTitle, Ytitle, title } = useConfigure({
    query: queryData,
    fetchDashboardInfo,
  });

  const checkChart = 'chart';
  const options: ChartOptions<'line'> = {
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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const data = {
    labels: queryData.data?.labels,
    datasets: queryData.data.datasets.map((item: any) => ({
      label: item.label,
      data: item.data.map((value: string) => value),
      borderColor: chartColor,
      backgroundColor: chartColor,
    })),
  };

  return (
    <Paper key={queryData.id} sx={{ textAlign: 'start', borderRadius: 2, height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          paddingBottom: '0px',
        }}
      >
        <Typography style={{ display: 'inline', textTransform: 'capitalize' }}>{title}</Typography>
        <QueryOptions
          fetchDashboardInfo={fetchDashboardInfo}
          chartColor={chartColor}
          query={queryData}
          showOptions="yesShow"
          changeChatType="changeit"
          isChart={checkChart}
          handleChangeYTitle={handleChangeYTitle}
          handleChangeXTitle={handleChangeXTitle}
          setChartColor={setChartColor}
        />
      </div>
      <div
        style={{
          paddingLeft: '10px',
          paddingRight: '15px',
          paddingBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
          width: '100%',
        }}
      >
        {!queryData.data.datasets ||
        !queryData.data.labels ||
        queryData.data.labels <= 0 ||
        queryData.data.datasets.length <= 0 ||
        queryData.data.datasets[0].data.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </Paper>
  );
};
