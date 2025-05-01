import { Grid, Stack, Button, Typography } from '@mui/material';

const EmptyDashboard = () => (
  <Grid
    height="70vh"
    item
    xs={18}
    sx={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }}
    alignItems="center"
  >
    <Stack
      direction="column"
      gap={2}
      sx={{
        alignItems: 'center',
        backgroundColor: 'white',
        paddingY: '50px',
        paddingX: '70px',
        borderRadius: '10px',
        boxShadow: '4',
      }}
    >
      <img src="/public/assets/images/dashboard/addwegit.svg" alt="" style={{ maxWidth: '20px' }} />
      <Typography>Create Your Visualization</Typography>
      <Button variant="contained" sx={{ fontWeight: '' }}>
        Add Widget
      </Button>
    </Stack>
  </Grid>
);

export default EmptyDashboard;
