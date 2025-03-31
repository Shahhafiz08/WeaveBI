import Markdown from 'react-markdown';
import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react';
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

import {
  Box,
  Grid,
  Grow,
  Table,
  Paper,
  Stack,
  Button,
  styled,
  Popper,
  TableRow,
  MenuList,
  MenuItem,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  TableContainer,
  tableCellClasses,
  ClickAwayListener,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { getDashboardInfo } from './api/actions';
import { BarChart } from './components/bar-chart';
import { PieChart } from './components/pie-chart';
import { LineChart } from './components/line-chart';
import { ScatterChart } from './components/scatter-chart';
import { StackedChart } from './components/stacked-chart';
import { DoughnutChart } from './components/doughnut-chart';

export interface Query {
  id: number;
  name: string;
  query: string;
  outputType: string;
  generatedSqlQuery: string;
  data: any;
  createdAt: string;
  updatedAt: string;
  databaseId: number;
  userId: number;
  position: any;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const OpenDashboard = () => {
  const { id } = useParams();
  const [dashboardData, setDashboardData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const chartColors = [
    'rgba(84, 133, 135, 0.8)',

    'rgba(235, 100, 119, 0.8)',
    'rgba(242, 200, 92, 0.8)',
    'rgba(84, 133, 135, 0.5)',
    'rgba(235, 100, 120, 0.5)',
    'rgba(242, 200, 92, 0.5)',
  ];
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        setLoading(true);
        const response = await getDashboardInfo(id as unknown as number);

        setDashboardData(response);
      } catch (error) {
        setErrors('Error fetching dashboard data:');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardInfo();
  }, [id]);

  // eslint-disable-next-line consistent-return
  const renderChart = (query: any) => {
    if (!query.data) {
      return null;
    }
    const truncateData = (heading: string) => {
      if (heading.length > 20) {
        return `${heading.slice(0, 20)}...`;
      }
      return heading;
    };

    const _heading = Array.isArray(query.data) ? query.data.pop() : null;

    // for descriptive
    if (query.outputType.toLowerCase() === 'descriptive') {
      return (
        <Paper key={query.id} elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
          <Typography>{query.name}</Typography>

          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              maxHeight: '300px',
              maxWidth: '300px',

              overflow: 'auto',
            }}
          >
            <Markdown>
              {typeof query.data === 'string' ? query.data : JSON.stringify(query.data, null, 2)}
            </Markdown>
          </Box>
        </Paper>
      );
    }

    // For tabular data
    if (
      query.outputType.toLowerCase() === 'tabular' &&
      (!query.data.graph_type || typeof query.data !== 'object')
    ) {
      return (
        <Paper
          key={query.id}
          elevation={2}
          sx={{ p: 3, borderRadius: 2, height: 'auto', width: 'fit-content' }}
        >
          <Typography sx={{ marginBottom: '15px' }}>{query.name}</Typography>

          {query.data.length <= 1 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 2,
                p: 2,
                bgcolor: '#f5f5f5',
                borderRadius: 1,
              }}
            >
              <Typography color="primary" variant="h1">
                {(query.data, null, 2)}
              </Typography>
            </Box>
          ) : (
            <TableContainer sx={{ position: 'relative' }} component={Paper}>
              <Table sx={{ width: '100%' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(_heading).map((heading) => (
                      <StyledTableCell>
                        {heading.charAt(0).toUpperCase() + heading.slice(1).replace('_', ' ')}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {query.data.map((rowItem: any) => (
                    <StyledTableRow>
                      {Object.keys(rowItem).map((heading) => (
                        <StyledTableCell>{truncateData(rowItem[heading])}</StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      );
    }

    // For chart data
    if (query.data && query.data.graph_type) {
      const { title, labels, datasets, values, datasetLabel } = query.data;

      switch (query.data.graph_type.toLowerCase()) {
        case 'bar':
          if (query.outputType.toLowerCase() === 'stacked chart') {
            return (
              <Paper
                key={query.id}
                elevation={2}
                sx={{
                  width: '100%s',
                  textAlign: 'start',
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                }}
              >
                <Typography>{title}</Typography>

                <StackedChart
                  labels={labels}
                  chartData={query.data.datasets}
                  backgroundcolor={chartColors.slice(0, datasets.data?.length)}
                />
              </Paper>
            );
          }

          return (
            <Paper
              key={query.id}
              elevation={2}
              sx={{
                width: 'fit-content',
                textAlign: 'start',
                p: 3,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography>{title}</Typography>

              <BarChart
                labels={labels}
                chartData={query.data.datasets}
                backgroundcolor={chartColors.slice(0, values?.length)}
              />
            </Paper>
          );

        case 'doughnut':
          return (
            <Paper key={query.id} elevation={2} sx={{ textAlign: 'start', p: 3, borderRadius: 2 }}>
              <Typography>{title}</Typography>

              <DoughnutChart
                labels={labels}
                values={values}
                backgroundcolor={chartColors.slice(0, values.length)}
                datasetLabel={datasetLabel}
              />
            </Paper>
          );

        case 'pie':
          return (
            <Paper
              key={query.id}
              elevation={2}
              sx={{ textAlign: 'start', p: 3, borderRadius: 2, height: '100%' }}
            >
              <Typography gutterBottom>{title}</Typography>

              <PieChart
                labelss={labels}
                values={values}
                backgroundcolor={chartColors.slice(0, values.length)}
                datasetLabel={datasetLabel}
              />
            </Paper>
          );

        case 'line':
          return (
            <Paper
              key={query.id}
              elevation={2}
              sx={{ textAlign: 'start', p: 3, borderRadius: 2, height: '100%' }}
            >
              <Typography gutterBottom>{title}</Typography>

              <LineChart
                labels={labels}
                values={values}
                backgroundcolor={chartColors.slice(0, values.length)}
                datasetLabel={datasetLabel}
              />
            </Paper>
          );

        case 'scatter':
          return (
            <Paper
              key={query.id}
              elevation={2}
              sx={{ textAlign: 'start', p: 3, borderRadius: 2, height: '100%' }}
            >
              <Typography gutterBottom>{title}</Typography>

              <ScatterChart
                chartData={query.data.datasets}
                backgroundcolor={chartColors.slice(0, values?.length)}
              />
            </Paper>
          );

        default:
          return null;
      }
    }
  };

  if (loading) {
    return <Typography>Loading dashboard data...</Typography>;
  }

  if (errors) {
    return <Typography color="error">{errors}</Typography>;
  }

  // Filter queries that have data and can be rendered
  const renderableQueries = dashboardData?.queries.filter(
    (query: { data: any; outputType: string }) =>
      query.data &&
      (query.outputType.toLowerCase() === 'tabular' ||
        query.outputType.toLowerCase() === 'descriptive' ||
        (query.data.graph_type &&
          ['bar', 'pie', 'line', 'stacked', 'scatter', 'doughnut'].includes(
            query.data.graph_type.toLowerCase()
          )))
  );

  return (
    <DashboardContent
      maxWidth="xl"
      sx={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" color="primary" sx={{ mb: 4 }}>
          {dashboardData?.name
            ? dashboardData.name.charAt(0).toUpperCase() + dashboardData.name.slice(1)
            : 'Dashboard'}
          Dashboard
        </Typography>
        {renderableQueries?.length > 0 ? (
          <div>
            <Button
              variant="contained"
              sx={{
                fontWeight: 'medium',
                paddingX: '15px',
                maxHeight: '40px',
              }}
            >
              + Add Widget
            </Button>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Iconify icon="uil:ellipsis-v" />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Grow {...TransitionProps}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        sx={{ marginTop: '10px' }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Iconify icon="ic:outline-save" sx={{ marginRight: '5px' }} />
                          Save
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Iconify
                            icon="mdi:application-edit-outline"
                            sx={{ marginRight: '5px' }}
                          />
                          Edit
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        ) : null}
      </div>

      <Grid container spacing={2} columns={19} alignItems="stretch" justifyContent="start">
        {renderableQueries?.length > 0 ? (
          renderableQueries.map((query: any, index: number) => (
            <Grid item key={index} sx={{ display: 'flex', height: '100%' }}>
              <Box sx={{ width: 'fit-content', height: '100%', display: 'block' }}>
                {renderChart(query)}
              </Box>
            </Grid>
          ))
        ) : (
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
                src="/public/assets/images/dashboard/addwegit.svg"
                alt=""
                style={{ maxWidth: '20px' }}
              />
              <Typography>Create Your Visualization</Typography>
              <Button variant="contained" sx={{ fontWeight: '' }}>
                Add Widget
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </DashboardContent>
  );
};

export default OpenDashboard;
