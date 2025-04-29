import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

const Descriptive = ({
  queryId,
  queryName,
  queryData,
}: {
  queryId: number;
  queryName: string;
  queryData: string;
}) => {
  const { titleColor, chartColor, setTitleColor, setChartColor } = useColorPicker();

  return (
    <Paper key={queryId} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: `${titleColor}` }}>{queryName}</Typography>
        <QueryOptions
          setChartColor={setChartColor}
          queryId={queryId}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
        />
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
          color: Array.isArray(chartColor) ? chartColor[0] : '#193E6D',
        }}
      >
        <div style={{}}>
          <Markdown>
            {typeof queryData === 'string' ? queryData : JSON.stringify(queryData, null, 2)}
          </Markdown>
        </div>
      </Box>
    </Paper>
  );
};

export default Descriptive;
