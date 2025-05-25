import * as React from 'react';
import { toast } from 'react-toastify';
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
import { CustomPopover } from 'src/components/custom-popover';

import usetTableStyling from 'src/sections/hooks/use-table-styling';

import {
  getDashboardResponse,
  pinDashboardResponse,
  deleteDashboardResponse,
} from '../api/actions';

type fetchDataType = {
  isPinned: boolean;
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tags: string[];
};

const { StyledTableCell, StyledTableRow } = usetTableStyling();

export default function RecentDashboardList() {
  const [getData, setGetData] = React.useState<fetchDataType[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [popoverAnchor, setPopoverAnchor] = React.useState<HTMLElement | null>(null);
  const [activeDashboardId, setActiveDashboardId] = React.useState<number | null>(null);

  const maxDescriptionLength = 60;

  function truncateDescription(description: string) {
    return description.length > maxDescriptionLength
      ? `${description.slice(0, maxDescriptionLength)}...`
      : description;
  }

  function formatFetchedDate(fetchedDate: string) {
    const date = new Date(fetchedDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  const fetchData = async () => {
    try {
      const incomingData = await getDashboardResponse();
      setGetData(incomingData.dashboards);
    } catch (error) {
      toast.error('Error fetching dashboard:', error);
    }
  };

  async function handleDeleteDashboard(dashboardId: number) {
    try {
      await deleteDashboardResponse(dashboardId);
      handlePopoverClose();
      fetchData();
    } catch (error) {
      alert(error);
    }
  }

  async function handlePin(dashboardId: number) {
    setGetData((prevData) =>
      prevData.map((dashboard) =>
        dashboard.id === dashboardId ? { ...dashboard, isPinned: !dashboard.isPinned } : dashboard
      )
    );
    await pinDashboardResponse(dashboardId);
  }

  function handlePopoverOpen(event: React.MouseEvent<HTMLElement>, dashboardId: number) {
    setPopoverAnchor(event.currentTarget);
    setActiveDashboardId(dashboardId);
  }

  function handlePopoverClose() {
    setPopoverAnchor(null);
    setActiveDashboardId(null);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const tableHeadItems = ['Name', 'Description', 'Domain', 'Created', 'Action'];

  return (
    <Stack sx={{ boxShadow: 2, height: '400px', borderRadius: 1, background: 'white' }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
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
              {tableHeadItems.map((item, index) => (
                <StyledTableCell key={index}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {getData.length <= 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                No dashboards found.
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            <TableBody>
              {getData.map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell>
                    <Checkbox
                      checked={selected.includes(data.id)}
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        setSelected((prev) =>
                          isChecked ? [...prev, data.id] : prev.filter((id) => id !== data.id)
                        );
                      }}
                    />
                  </StyledTableCell>

                  <StyledTableCell sx={{ width: '25%' }}>
                    <Link
                      className="open-dashboard"
                      style={{ textDecoration: 'none', color: 'black' }}
                      to={paths.dashboard.OpenDashboard(data.id)}
                    >
                      {data.name}
                    </Link>
                  </StyledTableCell>

                  <StyledTableCell>{truncateDescription(data.description)}</StyledTableCell>

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

                  <StyledTableCell>{formatFetchedDate(data.createdAt)}</StyledTableCell>

                  <StyledTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={(e) => handlePopoverOpen(e, data.id)}>
                      <Iconify icon="mdi:dots-vertical" />
                    </Button>

                    <Button onClick={() => handlePin(data.id)}>
                      <Iconify
                        icon={data.isPinned ? 'ic:sharp-push-pin' : 'ic:outline-push-pin'}
                        sx={{ rotate: '45deg' }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <CustomPopover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={() => handlePopoverClose()}
        sx={{ marginTop: '10px' }}
      >
        <ClickAwayListener onClickAway={() => handlePopoverClose()}>
          <MenuList>
            <MenuItem>
              <Iconify icon="ic:baseline-file-open" />
              Open
            </MenuItem>
            <MenuItem onClick={() => console.log('Edit:', activeDashboardId)}>
              <Iconify icon="ic:baseline-edit" />
              Edit
            </MenuItem>
            <MenuItem onClick={() => activeDashboardId && handleDeleteDashboard(activeDashboardId)}>
              <Iconify icon="ic:baseline-delete" />
              Delete
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
      </CustomPopover>
    </Stack>
  );
}
