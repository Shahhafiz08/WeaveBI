import { Box, Stack, Typography } from '@mui/material';

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColor-picker';

import type { QueryResponse, QuerySingleValueData } from '../../types/inference';

const SingeValue = ({ query }: QueryResponse) => {
  const { chartColor, setChartColor } = useColorPicker({
    incommingChartColor: query.colors?.chartColor,
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
        <Typography>{query.name}</Typography>
        <QueryOptions
          showOptions="yesShow"
          chartColor={chartColor}
          setChartColor={setChartColor}
          query={query}
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
          {(query.data as unknown as QuerySingleValueData[])?.[0]?.count}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SingeValue;
