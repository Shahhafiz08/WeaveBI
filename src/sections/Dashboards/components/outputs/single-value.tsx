import { Box, Stack, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

type Props = {
  qeryName: string;
  queryId: number;
  queryData: Array<object>; 
  incommingChartColor: string;
};
const SingeValue = ({
  queryData,
  queryId,
  qeryName,
  incommingChartColor,
}: Props) => {
  const { titleColor, chartColor, setChartColor } = useColorPicker({
  
    incommingChartColor,
  });

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        textAlign: 'start',
        p: 3,
        borderRadius: 2,
        bgcolor: 'white',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: `${titleColor}` }}>{qeryName}</Typography>
        <QueryOptions
          chartColor={chartColor}
          setChartColor={setChartColor}
          queryId={queryId}
          incommingChartColor={chartColor}
        />
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          p: 2,
          bgcolor: '#F5F5F5',
          position: 'relative',
          borderRadius: 1,
        }}
      >
        <Typography
          style={{
            color: Array.isArray(chartColor) ? chartColor[0] : '#193E6D',
            fontSize: '3.2rem',
            fontWeight: 'bold',
          }}
        >
          {Object.values(queryData?.[0])}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SingeValue;
