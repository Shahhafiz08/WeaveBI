import { Box, Stack, Typography } from '@mui/material';

import NoDataFound from 'src/sections/components/no-data-found';

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
  const string = Object.values(queryData.data[0]).toString();
  const indexOfDot = Object.values(queryData.data[0]).toString().indexOf('.');
 

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
        <Typography style={{ textTransform: 'capitalize' }}>{queryData.name}</Typography>
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
        {queryData.data.length <= 0 ? (
          <NoDataFound />
        ) : (
          <Typography
            style={{
              color: Array.isArray(chartColor) ? chartColor[0] : '#193E6D',
              fontSize: '2.2em',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {string.slice(0, indexOfDot) + string.slice(indexOfDot, 5)}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default SingeValue;
