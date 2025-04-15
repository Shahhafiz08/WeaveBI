import { Box, Stack, Typography } from '@mui/material';


const SingeValue = ({
  queryData,
 
  qeryName,
}: {
  qeryName: string;
  queryData: Array<object>;
  
}) => (
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
    <Typography sx={{ marginBottom: '15px' }}>{qeryName}</Typography>

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
      <Typography color="primary" variant="h1">
        {Object.values(queryData?.[0])}
      </Typography>
    </Box>
  </Stack>
);

export default SingeValue;
