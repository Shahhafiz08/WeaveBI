import type { ChartOptions } from 'chart.js';

import { Scatter } from 'react-chartjs-2';
import {
  Legend,
  Tooltip,
  LinearScale,
  LineElement,
  PointElement,
  Chart as ChartJS,
} from 'chart.js';

import { Paper, Typography } from '@mui/material';

import NoDataFound from 'src/sections/components/no-data-found';

import QueryOptions from '../query-options';
import { useConfigure } from '../../hooks/use-configure';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const ScatterChart = ({
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

  const options: ChartOptions<'scatter'> = {
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
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = {
    datasets: queryData.data.datasets?.map((plotdata: any) => ({
      label: plotdata.label,
      data: plotdata.data?.map((value: any) => ({
        x: value.x,
        y: value.y,
      })),
      borderColor: chartColor,
      backgroundColor: chartColor,
    })),
  };
  return (
    <Paper key={queryData.id} sx={{ borderRadius: 2, width: '100%', height: '100%' }}>
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
          chartColor={chartColor}
          query={queryData}
          setChartColor={setChartColor}
          showOptions="yesShow"
          changeChatType="changeit"
          isChart={checkChart}
          handleChangeXTitle={handleChangeXTitle}
          handleChangeYTitle={handleChangeYTitle}
        />
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '5px',
          paddingRight: '25px',
          paddingBottom: '15px',
        }}
      >
        {!queryData.data.datasets ||
        !queryData.data.labels ||
        queryData.data.datasets[0].label <= 0 ||
        queryData.data.datasets[0].data.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Scatter data={data} options={options} />
        )}
      </div>
    </Paper>
  );
};

export default ScatterChart;
