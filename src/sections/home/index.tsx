import React, { useState } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2';
import { Tab, Stack, Typography } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

import { primary } from 'src/theme/core';

import { KeyPoints } from './components/keypoints-home';
import PinnedDashboardList from './components/pinned-dashboard-list';
import RecentDashboardList from './components/recent-dashboard-list';
import img1 from '../../../public/assets/images/home/total-databases-icon.svg';
import { FrequeryntlyAskedQueries } from './components/ferquentyl-asked-queries';
import { totalQueryCount, totalDatabaseCount, totalDashboardCount } from './api/actions';

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
    },
    {
      total: activedatabases,
      image: '/assets/images/home/active-databases-icon.svg',
      title: 'Active Databases',
    },
    {
      total: totalDashboards,
      image: '/public/assets/images/home/totoal-dashboards-icons.svg',
      title: 'Total Dashboards',
    },
    {
      total: totalQueries,
      image: '/public/assets/images/home/total-queries-icon.svg',
      title: 'Total Queries',
    },
  ];
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ background: '#F2F2F2', padding: 20, width: '100%' }}>
      <Stack marginBottom={2}>
        <Grid2 container direction="row" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data &&
            data.map((card, index) => (
              <Grid2 key={index} xs={12} sm={6} md={3} lg={3}>
                <KeyPoints total={card.total} image={card.image} title={card.title} />
              </Grid2>
            ))}
        </Grid2>
      </Stack>

      <Stack
        height="50vh"
        style={{ marginBottom: '40px', width: '100%' }}
        flexDirection="row"
        gap={5}
      >
        <div style={{ width: '50%' }}>
          <FrequeryntlyAskedQueries color="pink" />
        </div>
        <div style={{ width: '50%' }}>
          <FrequeryntlyAskedQueries color="red" />
        </div>
      </Stack>

      <Stack>
        <Typography variant="h3" style={{ color: primary.main }}>
          Dashboards
        </Typography>
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            <Tab label=" Recent" value="1" />
            <Tab label="Pinned" value="2" />
          </TabList>

          <TabPanel value="1">
            <RecentDashboardList />
          </TabPanel>
          <TabPanel value="2">
            <PinnedDashboardList />
          </TabPanel>
        </TabContext>
      </Stack>
    </div>
  );
}
