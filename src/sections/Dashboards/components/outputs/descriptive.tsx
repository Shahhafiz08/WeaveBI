import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { QueryResponse } from '../../types/inference';

const Descriptive = ({ query }: QueryResponse) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
  });
  const color = Array.isArray(chartColor) && chartColor.length > 0 ? chartColor[0] : '#000000'; // fallback color

  return (
    <Paper key={query.id} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{query.name}</Typography>
        <QueryOptions chartColor={chartColor} setChartColor={setChartColor} query={query} />
      </div>

      <Box
        className="hideScroll"
        sx={{
          marginTop: '10px',
          padding: '20px',
          paddingBottom: '0px',
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          maxHeight: '250px',
          overflow: 'scroll',
          color,
        }}
      >
        <div style={{}}>
          <Markdown>
            {typeof query.data === 'string' ? query.data : JSON.stringify(query.data, null, 2)}
          </Markdown>
        </div>
      </Box>
    </Paper>
  );
};

export default Descriptive;
