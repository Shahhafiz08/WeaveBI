import { Box, Stack, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

const SingeValue = ({
  queryData,
  queryId,
  qeryName,
  chartColors,
}: {
  qeryName: string;
  queryId: number;
  queryData: Array<object>;
  chartColors: Array<string>;
}) => {
  const { titleColor, chartColor, setTitleColor, setChartColor } = useColorPicker();

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
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
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
