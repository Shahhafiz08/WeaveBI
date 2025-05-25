import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { Query } from '../../types/inference';

const Descriptive = ({
  queryData,
  fetchDashboardInfo,
}: {
  fetchDashboardInfo: () => void;
  queryData: Query;
}) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: queryData.colors?.chartColor,
  });
  const color = Array.isArray(chartColor) && chartColor.length > 0 ? chartColor[0] : '#000000';
  console.log('descriptive data');

  return (
    <Paper key={queryData.id} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{queryData.name}</Typography>
        <QueryOptions
          fetchDashboardInfo={fetchDashboardInfo}
          chartColor={chartColor}
          setChartColor={setChartColor}
          query={queryData}
        />
      </div>

      <Box
        className="hideScroll"
        sx={{
          marginTop: '10px',
          paddingBottom: '0px',

          borderRadius: 1,
          maxHeight: '250px',
          overflow: 'scroll',
          color,
        }}
      >
        <div>
          <Markdown>{queryData.data}</Markdown>
        </div>
      </Box>
    </Paper>
  );
};

export default Descriptive;
