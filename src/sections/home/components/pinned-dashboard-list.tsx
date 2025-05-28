import * as React from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import {
  Box,
  Chip,
  Stack,
  Button,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
  ClickAwayListener,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import usetTableStyling from 'src/sections/hooks/use-table-styling';

import {
  pinDashboardResponse,
  deleteDashboardResponse,
  pinnedDashboardsResponse,
} from '../api/actions';

type fetchDataType = {
  isPinned: boolean;
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tags: string[];
};

export default function PinnedDashboardList() {
  const popover = usePopover();
  const [getData, setGetData] = React.useState<fetchDataType[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);
  const tableHeadItems = ['Name', 'Description', 'Domain', 'Created', 'Action'];
  const { StyledTableCell, StyledTableRow } = usetTableStyling();

  const maxDescriptionLength = 60;
  const truncateDescription = (description: string) =>
    description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;

  const formatFetchedDate = (fetchedDate: string) => {
    const date = new Date(fetchedDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  const handlePin = async (dashboardId: number) => {
    setGetData((prevData) =>
      prevData.map((dashboard) =>
        dashboard.id === dashboardId ? { ...dashboard, isPinned: !dashboard.isPinned } : dashboard
      )
    );
    await pinDashboardResponse(dashboardId);
  };

  const handleGetPinnedDashboards = async (page: number, isPinned: boolean) => {
    const incomingData = await pinnedDashboardsResponse(page, isPinned);
    setGetData(incomingData.dashboards);
  };

  const handleDeleteDashboard = async (dashboardId: number) => {
    try {
      await deleteDashboardResponse(dashboardId);
      popover.onClose();
      handleGetPinnedDashboards(1, true);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    handleGetPinnedDashboards(1, true);
  }, []);

  return (
    <Stack sx={{ boxShadow: 2, height: '400px', borderRadius: 1, background: 'white' }}>
      <TableContainer component={Paper} sx={{ marginRight: 30 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ position: 'sticky', top: '0.1px', zIndex: 10 }}>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selected.length === getData.length}
                  indeterminate={selected.length > 0 && selected.length < getData.length}
                  onChange={(event) => {
                    const { checked } = event.target;
                    setSelected(checked ? getData.map((item) => item.id) : []);
                  }}
                />
              </StyledTableCell>
              {tableHeadItems.map((item) => (
                <StyledTableCell key={item}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getData.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  No pinned dashboards found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              getData.map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell>
                    <Checkbox
                      checked={selected.includes(data.id)}
                      onChange={(event) => {
                        const { checked } = event.target;
                        setSelected((prev) =>
                          checked ? [...prev, data.id] : prev.filter((id) => id !== data.id)
                        );
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell sx={{ width: '25%' }}>
                    <Link
                      className="open-Visulize"
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={paths.dashboard.OpenVisualize(data.id)}
                    >
                      {data.name}
                    </Link>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {truncateDescription(data.description)}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'start',
                        flexWrap: 'wrap',
                        overflow: 'hidden',
                        width: '300px',
                      }}
                    >
                      {data.tags.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tag}
                          sx={{
                            fontWeight: 'normal',
                            fontFamily: 'poppins',
                            marginRight: '4px',
                            marginBottom: '4px',
                            backgroundColor: 'grey',
                          }}
                        />
                      ))}
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {formatFetchedDate(data.createdAt)}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                    sx={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    <Button
                      sx={{ maxWidth: '12px', padding: '5px' }}
                      onClick={(event) => popover.setAnchorEl(event.currentTarget)}
                    >
                      <Iconify icon="mdi:dots-vertical" />
                    </Button>

                    <Button onClick={() => handlePin(data.id)}>
                      {data.isPinned ? (
                        <Iconify icon="ic:sharp-push-pin" sx={{ rotate: '45deg' }} />
                      ) : (
                        <Iconify icon="ic:outline-push-pin" sx={{ rotate: '45deg' }} />
                      )}
                    </Button>

                    <CustomPopover
                      open={popover.open}
                      anchorEl={popover.anchorEl}
                      onClose={popover.onClose}
                      sx={{ marginTop: '10px' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={popover.onClose}>
                          <MenuList>
                            <MenuItem>
                              <Iconify icon="ic:baseline-file-open" /> Open
                            </MenuItem>
                            <MenuItem onClick={() => console.log(data.id)}>
                              <Iconify icon="ic:baseline-edit" /> Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleDeleteDashboard(data.id);
                              }}
                            >
                              <Iconify icon="ic:baseline-delete" /> Delete
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </CustomPopover>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
