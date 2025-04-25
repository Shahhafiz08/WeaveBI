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
  const { titleColor, setTitleColor } = useColorPicker();

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
        <QueryOptions queryId={queryId} titleColor={titleColor} setTitleColor={setTitleColor} />
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          p: 2,
          bgcolor: '#F5F5F5',

          borderRadius: 1,
        }}
      >
        <Typography style={{ color: `${chartColors[0]}` }} variant="h1">
          {Object.values(queryData?.[0])}
        </Typography>
      </Box>
    </Stack>
  );
};

export default SingeValue;
