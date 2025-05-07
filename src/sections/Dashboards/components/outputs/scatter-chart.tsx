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

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
type incommingDataType = {
  chartData: Array<{
    label: string;
    data: Array<{ x: string; y: string }>;
  }>;

  queryId: number;
  title: string;
  incommingTitleColor: string;
  incommingChartColor: string;
};

export const ScatterChart = ({
  incommingTitleColor,
  incommingChartColor,
  queryId,
  title,
  chartData,
}: incommingDataType) => {
  const { titleColor, setTitleColor, setChartColor, chartColor } = useColorPicker({
    incommingTitleColor,
    incommingChartColor,
  });

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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data = {
    datasets: chartData?.map((chart) => ({
      label: chart.label,
      data: chart.data?.map((item) => ({
        x: item.x,
        y: item.y,
      })),
      backgroundColor: chartColor,
      borderColor: chartColor,
    })),
  };

  return (
    <Paper key={queryId} sx={{ borderRadius: 2, width: '100%', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          paddingBottom: '0px',
        }}
      >
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          chartColor={chartColor}
          queryId={queryId}
          setChartColor={setChartColor}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
          incommingChartColor={chartColor}
          incommingTitleColor={titleColor}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '30px',
        }}
      >
        {' '}
        <Scatter data={data} options={options} />
      </div>
    </Paper>
  );
};

export default ScatterChart;
