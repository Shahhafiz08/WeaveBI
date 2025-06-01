import React, { useState, useEffect } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2';
import { Tab, Stack, Typography } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

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
    },
    {
      total: activedatabases,
      image: img2,
      title: 'Active Databases',
    },
    {
      total: totalDashboards,
      image: img3,
      title: 'Total Dashboards',
    },
    {
      total: totalQueries,
      image: img4,
      title: 'Total Queries',
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
                <KeyPoints total={card.total} image={card.image} title={card.title} />
              </Grid2>
            ))}
        </Grid2>
      </Stack>

      <div
        style={{
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
