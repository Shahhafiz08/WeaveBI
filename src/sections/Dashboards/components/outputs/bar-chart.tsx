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

export const BarChart = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { chartColor, setChartColor } = useColorPicker({
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
    labels: queryData.data.labels?.map((label: string) => label),
    datasets: queryData.data.datasets.map((plotdata: any) => ({
      label: plotdata.label,
      data: plotdata.data.map((value: string) => value),
      borderColor: chartColor,
      backgroundColor: chartColor,
      maxBarThickness: 50,
    })),
  };

  return (
    <Paper
      key={queryData.id}
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
          padding: 20,
          paddingLeft: '0px',
          paddingRight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {queryData.data.datasets[0].label <= 0 || queryData.data.datasets[0].data.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </Paper>
  );
};
