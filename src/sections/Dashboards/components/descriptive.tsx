import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

const Descriptive = ({
  queryid,
  queryName,
  queryData,
}: {
  queryid: number;
  queryName: string;
  queryData: 'string';
}) => (
  <Paper key={queryid} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
    <Typography>{queryName}</Typography>

    <Box
      sx={{
        mt: 2,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1,
      }}
    >
      <Markdown>
        {typeof queryData === 'string' ? queryData : JSON.stringify(queryData, null, 2)}
      </Markdown>
    </Box>
  </Paper>
);

export default Descriptive;
