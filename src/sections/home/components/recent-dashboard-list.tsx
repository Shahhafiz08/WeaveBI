import * as React from 'react';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Chip,
  Stack,
  Button,
  Divider,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { usePopover, CustomPopover } from 'src/layouts/components/custom-popover';

import { Iconify } from 'src/components/iconify';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.common.black,
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

export default function RecentDashboardList() {
  const popover = usePopover();

  const [getData, setGetData] = React.useState<fetchDataType[]>([]);

  const maxDescriptionLength = 60;
  function truncateDescription(description: string) {
    const truncatedDescription =
      description.length > maxDescriptionLength
        ? `${description.slice(0, maxDescriptionLength)}...`
        : description;
    return truncatedDescription;
  }
  function formatfetchedDate(fetchedDate: string) {
    const date = new Date(fetchedDate);
    const formateDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    return formateDate;
  }

  const fetchData = async () => {
    try {
      const incomingData = await getDashboardResponse();
      setGetData(incomingData.dashboards);
    } catch (error) {
      console.error('Error fetching database:', error);
    }
  };

  // Individually Delete dashboard
  async function handleDeleteDashboard(dashboardId: number) {
    try {
      await deleteDashboardResponse(dashboardId);
      popover.onClose();
      fetchData();
    } catch (error) {
      alert(error);
    }
  }

  // Handle Pin Dashboard
  async function handlePin(dashboardId: number) {
    setGetData((prevData) =>
      prevData.map((dashboard) =>
        dashboard.id === dashboardId ? { ...dashboard, isPinned: !dashboard.isPinned } : dashboard
      )
    );
    await pinDashboardResponse(dashboardId);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const [selected, setSelected] = React.useState<number[]>([]);
  const tableHeadItems = ['Name', 'Description', 'Domain', 'Created', 'Action'];

  return (
    <Stack sx={{ marginX: 1, marginY: 4, boxShadow: 2, borderRadius: 1 }}>
      <TableContainer component={Paper} sx={{ marginRight: 30 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selected.length === getData.length}
                  indeterminate={selected.length > 0 && selected.length < getData.length}
                  onChange={(event: any) => {
                    const { checked } = event.target;
                    if (checked) {
                      setSelected(getData.map((item) => item.id));
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </StyledTableCell>
              {tableHeadItems &&
                tableHeadItems.map((item) => (
                  <StyledTableCell align="left">{item}</StyledTableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getData.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell>
                  <Checkbox
                    checked={selected.includes(data.id)}
                    onChange={(event: any) => {
                      const abc = event.target.checked;
                      if (abc) {
                        setSelected((prev) => [...prev, data.id]);
                      } else {
                        setSelected((prev) => prev?.filter((item) => item !== data.id));
                      }
                    }}
                  />
                </StyledTableCell>

                <StyledTableCell sx={{ width: '20%' }} component="th" scope="data">
                  <Link
                    className="open-dashboard"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                    to={paths.dashboard.OpenDashboard(data.id)}
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
                <StyledTableCell align="left">{formatfetchedDate(data.createdAt)}</StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Button onClick={(event) => popover.setAnchorEl(event.currentTarget)}>
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
                    slotProps={{ arrow: { placement: 'right-top' } }}
                  >
                    <MenuList>
                      <MenuItem>
                        <Iconify icon="ic:baseline-file-open" />
                        Open
                      </MenuItem>
                      <MenuItem>
                        <Iconify icon="ic:baseline-edit" />
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteDashboard(data.id)}>
                        <Iconify icon="ic:baseline-delete" />
                        Delete
                      </MenuItem>
                      <Divider sx={{ borderStyle: 'dashed' }} />
                    </MenuList>
                  </CustomPopover>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
