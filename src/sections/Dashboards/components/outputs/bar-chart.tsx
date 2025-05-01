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

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type incommingDataType = {
  chartData: Array<string>;
  labels: Array<string>;
  title: string;
  queryId: number;
};

export const BarChart = ({ labels, chartData, queryId, title }: incommingDataType) => {
  const { titleColor, chartColor, setTitleColor, setChartColor, blueGradient } = useColorPicker();
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
  };

  const data = {
    labels,
    datasets: chartData.map((chart: any) => ({
      label: chart.label,
      data: chart.data,
      backgroundColor: !chartColor ? blueGradient : chartColor,
      borderColor: !chartColor ? blueGradient : chartColor,
    })),
  };

  return (
    <Paper
      key={queryId}
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
        <Typography style={{ display: 'inline', color: `${titleColor}` }}>{title}</Typography>
        <QueryOptions
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
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
