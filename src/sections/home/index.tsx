import React, { useState, useEffect } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Tab, Box, Stack, Typography } from '@mui/material';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';

import { paths } from 'src/routes/paths';

import { primary } from 'src/theme/core';

import { HomeCharts } from './components/home-charts';
import { KeyPoints } from './components/keypoints-home';
import img3 from '../../assets/home/total-queries-icon.svg';
import img1 from '../../assets/home/total-databases-icon.svg';
import img2 from '../../assets/home/active-databases-icon.svg';
import img4 from '../../assets/home/totoal-dashboards-icon.svg';
import PinnedDashboardList from './components/pinned-dashboard-list';
import RecentDashboardList from './components/recent-dashboard-list';
import {
  queryActivity,
  outputOverview,
  totalQueryCount,
  totalDatabaseCount,
  totalDashboardCount,
} from './api/actions';

// ----------------------------------------------------------------------

export default function HomeView() {
  const [activedatabases, setActiveDatabase] = useState<number>(0);
  const [totalDatabases, setTotalDatabase] = useState<number>(0);
  const [totalQueries, setTotalQueries] = useState<number>(0);
  const [totalDashboards, setTotalDashboards] = useState<number>(0);

  const getDatabaseCount = async () => {
    try {
      const dbCount = await totalDatabaseCount();
      setActiveDatabase(dbCount.activeCount || 0);
      setTotalDatabase(dbCount.totalCount || 0);
    } catch (error) {
      console.log(error);
    }
  };
  const getQueryCount = async () => {
    try {
      const queryCount = await totalQueryCount();
      setTotalQueries(queryCount.count || 0);
    } catch (error) {
      console.log(error);
    }
  };
  const getDashboardCount = async () => {
    try {
      const dashboardCount = await totalDashboardCount();
      setTotalDashboards(dashboardCount.count || 0);
    } catch (error) {
      console.log(error);
    }
  };
  getDatabaseCount();
  getQueryCount();
  getDashboardCount();

  const data = [
    {
      total: totalDatabases,
      image: img1,
      title: 'Total Databases',
      path: paths.dashboard.databaseConnections,
    },
    {
      total: activedatabases,
      image: img2,
      title: 'Active Databases',
      path: paths.dashboard.databaseConnections,
    },
    {
      total: totalDashboards,
      image: img3,
      title: 'Total Dashboards',
      path: paths.dashboard.visualize,
    },
    {
      total: totalQueries,
      image: img4,
      title: 'Total Queries',
      path: '',
    },
  ];
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [userActivityResponse, setUserActivityResponse] = useState<any>(null);
  const [outputOverviewResponse, setOutputOverviewResponse] = useState<any>(null);

  useEffect(() => {
    const displayUserActivity = async () => {
      try {
        const resp = await queryActivity();
        setUserActivityResponse(resp);
        console.log('API Response:', userActivityResponse);
      } catch (err) {
        console.error('Failed to fetch query activity:', err);
      }
    };
    const OutputOverview = async () => {
      try {
        const resp = await outputOverview();
        setOutputOverviewResponse(resp);
        console.log('API Response:', outputOverviewResponse);
      } catch (err) {
        console.error('Failed to fetch query activity:', err);
      }
    };
    OutputOverview();
    displayUserActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ background: '#F4F6F8', padding: 20, width: '100%' }}>
      <Stack marginBottom={2}>
        <Grid2 container direction="row" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data &&
            data.map((card, index) => (
              <Grid2 key={index} xs={12} sm={6} md={3} lg={3}>
                <KeyPoints
                  total={card.total}
                  image={card.image}
                  title={card.title}
                  redirectingPath={card.path}
                />
              </Grid2>
            ))}
        </Grid2>
      </Stack>

      <div
        style={{
          padding: '0px',
          marginBottom: '40px',
          width: '100%',
          display: 'flex',
          height: '400px',
          gap: '2%',
        }}
      >
        <div style={{ width: '49%' }}>
          <HomeCharts
            response={userActivityResponse}
            title={userActivityResponse?.title}
            color="pink"
          />
        </div>
        <div style={{ width: '49%' }}>
          <HomeCharts
            response={outputOverviewResponse}
            color="red"
            title={outputOverviewResponse?.title}
          />
        </div>
      </div>

      <Stack>
        <Typography variant="h3" style={{ color: primary.main, marginBottom: '15px' }}>
          Dashboards
        </Typography>

        <Box
          sx={{
            backgroundColor: 'white',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                width: 'fit-content',
                backgroundColor: '#F5F9FF',
                borderRadius: '10px',
                margin: '10px',
              }}
            >
              <TabList
                onChange={handleChange}
                sx={{
                  backgroundColor: '#F5F9FF',
                  borderRadius: '10px',
                  padding: '2px',
                  minHeight: 'unset',

                  gap: 0,

                  '& .MuiTabs-flexContainer': {
                    gap: 1,
                  },
                  '& .MuiTab-root': {
                    fontSize: '13px',
                    paddingX: '15px',
                    paddingY: '1px',
                    height: '20px',
                  },

                  '& .MuiSvgIcon-root': {
                    width: '20px',
                  },
                }}
                TabIndicatorProps={{
                  sx: { display: 'none' },
                }}
              >
                <Tab
                  label="Recent"
                  value="1"
                  icon={<ScheduleIcon />}
                  disableRipple
                  sx={{
                    backgroundColor: value === '1' ? 'white' : '#F5F9FF',
                    borderRadius: '7px ',
                    paddingX: '5px',
                    minHeight: '36px',
                    height: '36px',

                    margin: '4px',
                    '&.Mui-selected': {
                      fontWeight: 500,
                    },
                  }}
                />

                <Tab
                  label="Pinned"
                  value="2"
                  icon={<PushPinOutlinedIcon />}
                  disableRipple
                  sx={{
                    backgroundColor: value === '2' ? 'white' : '#F5F9FF',
                    borderRadius: '7px',
                    margin: '4px',
                    paddingX: '5px',
                    minHeight: '36px',
                    height: '36px',
                    '&.Mui-selected': {
                      fontWeight: 500,
                    },
                  }}
                />
              </TabList>
            </Box>

            <TabPanel value="1" sx={{ padding: 0 }}>
              <RecentDashboardList />
            </TabPanel>
            <TabPanel value="2" sx={{ padding: 0 }}>
              <PinnedDashboardList />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </div>
  );
}
