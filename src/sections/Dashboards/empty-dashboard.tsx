import { useParams } from 'react-router';

import { Grid, Stack, Button, Typography } from '@mui/material';

import AddWidgetDrawer from 'src/components/custom-drawer/add-widget-drawer';
import { useCustomDrawer } from 'src/components/custom-drawer/useCustomDrawer';

import useDashboardDetails from './hooks/usedashboard';
import AddQueryWidget from './components/add-query-widget';

const EmptyDashboard = () => {
  const { MainContent } = useCustomDrawer();
  const { id } = useParams();

  const { isSliderOpen, handleCloseSlider, fetchDashboardInfo, handleOpenSlider } =
    useDashboardDetails(id as string);
  return (
    <MainContent open={isSliderOpen}>
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
          <img
            src="/public/assets/images/dashboard/add-widget.svg"
            alt=""
            style={{ maxWidth: '20px' }}
          />
          <Typography>Create Your Visualization</Typography>
          <Button variant="contained" sx={{ fontWeight: '' }} onClick={handleOpenSlider}>
            Add Widget
          </Button>
        </Stack>
        <AddWidgetDrawer open={isSliderOpen} onClose={handleCloseSlider}>
          <AddQueryWidget fetchDashboardInfo={fetchDashboardInfo} />
        </AddWidgetDrawer>
      </Grid>
    </MainContent>
  );
};

export default EmptyDashboard;
