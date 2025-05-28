import { Box, Stack, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

const SingeValue = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: queryData.colors?.chartColor,
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
        <Typography>{queryData.name}</Typography>
        <QueryOptions
          fetchDashboardInfo={fetchDashboardInfo}
          showOptions="yesShow"
          chartColor={chartColor}
          setChartColor={setChartColor}
          query={queryData}
        />
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          p: 2,
          fontSize: '30px',
          borderRadius: 1,
        }}
      >
        <Typography
          style={{
            color: Array.isArray(chartColor) ? chartColor[0] : '#193E6D',
            fontSize: '2.2em',
            fontWeight: 'bold',
          }}
        >
          {Object.values(queryData.data[0])}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SingeValue;
