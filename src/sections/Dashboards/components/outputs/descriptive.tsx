import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';

import type { Query } from '../../types/inference';

const Descriptive = ({
  queryData,
  fetchDashboardInfo,
}: {
  fetchDashboardInfo: () => void;
  queryData: Query;
}) => {
  console.log('descriptive data');

  return (
    <Paper key={queryData.id} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ textTransform: 'capitalize' }}>{queryData.name}</Typography>
        <QueryOptions fetchDashboardInfo={fetchDashboardInfo} query={queryData} />
      </div>

      <Box
        className="hideScroll"
        sx={{
          marginTop: '10px',
          paddingBottom: '0px',

          borderRadius: 1,
          maxHeight: '250px',
          overflow: 'scroll',
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
