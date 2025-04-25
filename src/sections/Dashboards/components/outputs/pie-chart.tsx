import { Pie } from 'react-chartjs-2';
import { Legend, Tooltip, ArcElement, Chart as ChartJS } from 'chart.js';

import { Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

ChartJS.register(ArcElement, Tooltip, Legend);

type IncommingDataType = {
  title?: string;
  datasetLabel?: string;
  labelss: Array<string>;
  values: Array<number>;
  backgroundcolor: Array<string>;
  queryId: number;
};

export const PieChart = ({
  title,
  labelss,
  values,
  datasetLabel,
  backgroundcolor,
  queryId,
}: IncommingDataType) => {
  const { titleColor, setTitleColor } = useColorPicker();
  

  const data = {
    labels: labelss,
    datasets: [
      {
        label: datasetLabel,
        data: values,
        backgroundColor: backgroundcolor,
        borderColor: backgroundcolor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    layout: {
      padding: {
        top: 1,
        bottom: 1,
        left: 10,
        right: 10,
      },
    },

    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Paper
      key={queryId}
      elevation={2}
      sx={{
        textAlign: 'start',
        p: 3,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ display: 'inline' }}>{title}</Typography>
        <QueryOptions queryId={queryId} titleColor={titleColor} setTitleColor={setTitleColor} />
      </div>
      <div style={{ flexGrow: 1, position: 'relative' }}>
        <Pie data={data} options={options} />
      </div>
    </Paper>
  );
};
