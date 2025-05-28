import { Grid, Stack, Button, Typography } from '@mui/material';

import AddWidgetDrawer from 'src/components/custom-drawer/add-widget-drawer';
import { useCustomDrawer } from 'src/components/custom-drawer/useCustomDrawer';

import AddQueryWidget from './components/add-query-widget';
import addWidget from '../../assets/dashboard/add-widget.svg';
import { useDatabaseId } from '../context/databaseid-context';

type EmptyDashboardType = {
  isSliderOpen: any;
  handleOpenSlider: any;
  handleCloseSlider: any;
  fetchDashboardInfo: any;
};

const EmptyDashboard = ({
  handleOpenSlider,
  isSliderOpen,
  fetchDashboardInfo,
  handleCloseSlider,
}: EmptyDashboardType) => {
  const { MainContent } = useCustomDrawer();
  const { databaseId } = useDatabaseId();

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
          <img src={addWidget} alt="" style={{ maxWidth: '20px' }} />
          <Typography>Create Your Visualization</Typography>
          <Button variant="contained" sx={{ fontWeight: '' }} onClick={handleOpenSlider}>
            Add Widget
          </Button>
        </Stack>
        <AddWidgetDrawer open={isSliderOpen} onClose={handleCloseSlider}>
          <AddQueryWidget databaseId={databaseId} fetchDashboardInfo={fetchDashboardInfo} />
        </AddWidgetDrawer>
      </Grid>
    </MainContent>
  );
};

export default EmptyDashboard;
