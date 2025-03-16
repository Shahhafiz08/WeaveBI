import * as React from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Button, Divider, Checkbox, MenuList, MenuItem, TableBody } from '@mui/material';

import { usePopover, CustomPopover } from 'src/layouts/components/custom-popover';

import { Iconify } from 'src/components/iconify';

import { getDashboardResponce } from '../api/actions';

type fetchDataType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tags: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DashboradList() {
  const popover = usePopover();

  const [getData, setGetdata] = React.useState<fetchDataType[]>([]);

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
    const formatedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    return formatedDate;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const incomingData = await getDashboardResponce();
        setGetdata(incomingData.dashboards);
      } catch (error) {
        console.error('Error fetching database:', error);
      }
    };
    fetchData();
  }, []);

  const deleteDashboards = [];
  return (
    <Stack sx={{ marginX: 1, marginY: 4, boxShadow: 2, borderRadius: 1 }}>
      <TableContainer component={Paper} sx={{ marginRight: 30, marginY: 3, postion: 'relative' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox />
              </StyledTableCell>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="left">Domain</StyledTableCell>
              <StyledTableCell align="left">Created</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {}
            {getData.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell>
                  <Checkbox />
                </StyledTableCell>
                <StyledTableCell component="th" scope="data">
                  {data.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {truncateDescription(data.description)}
                </StyledTableCell>
                <StyledTableCell align="left">{data.tags}</StyledTableCell>
                <StyledTableCell align="left">{formatfetchedDate(data.createdAt)}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={(event) => popover.setAnchorEl(event.currentTarget)}>
                    <Iconify icon="mdi:dots-vertical" />
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
                      <MenuItem>
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
