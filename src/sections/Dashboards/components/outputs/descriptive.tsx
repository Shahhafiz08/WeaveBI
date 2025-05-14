import Markdown from 'react-markdown';

import { Box, Paper, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

type Props = {
  queryId: number;
  queryName: string;
  queryData: string;
  incommingChartColor: string;
};
const Descriptive = ({ queryId, queryName, queryData, incommingChartColor }: Props) => {
  const { titleColor, chartColor, setChartColor } = useColorPicker({
    incommingChartColor,
  });
  const color = Array.isArray(chartColor) && chartColor.length > 0 ? chartColor[0] : '#000000'; // fallback color

  return (
    <Paper key={queryId} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography style={{ color: `${titleColor}` }}>{queryName}</Typography>
        <QueryOptions
          chartColor={chartColor}
          setChartColor={setChartColor}
          queryId={queryId}
          incommingChartColor={incommingChartColor}
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
          color,
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
