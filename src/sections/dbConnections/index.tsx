import * as React from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Grow,
  Stack,
  Alert,
  Button,
  Popper,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
  ClickAwayListener,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { getDatabase, deleteDatabase } from './api/actions';
import Sectionheader from '../home/components/Sectionheader';

type fetchDataType = {
  id: number;
  connectionName: string;
  description: string;
  updatedAt: string;
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

export default function DatabaseConnectionsView() {
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };
  const [getData, setGetdata] = React.useState<fetchDataType[]>([]);

  const fetchData = async () => {
    try {
      const incomingData = await getDatabase();
      setGetdata(incomingData.databases);
    } catch (error) {
      console.error('Error fetching database:', error);
    }
  };
  const [successMsg, setSuccessMsg] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const deleteDB = async (id: number) => {
    try {
      await deleteDatabase(id);
      setSuccessMsg(successMsg || 'Database deleted successfully');

      fetchData();
    } catch (error) {
      setErrorMsg('Something went wrong');
    }
  };

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (successMsg || errorMsg) {
      const clearResponce = setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
      return () => clearTimeout(clearResponce);
    }
  });

  return (
    <>
      <Sectionheader setRefresh={setRefresh} />

      {!!successMsg && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}
      <Stack sx={{ marginX: 5, marginY: 10, boxShadow: 2, borderRadius: 1 }}>
        <TableContainer component={Paper} sx={{ marginRight: 30, marginY: 3, postion: 'relative' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox />
                </StyledTableCell>
                <StyledTableCell>Database Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="left">Last Updated</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData.map((row) => (
                <StyledTableRow>
                  <StyledTableCell>
                    <Checkbox />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.connectionName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.description}</StyledTableCell>
                  <StyledTableCell align="left">{row.updatedAt}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button sx={{ backgroundColor: '#00B8D914', marginRight: '20px' }}>
                      Actions
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
                      placement="right-end"
                      transition
                      id={row.id.toString()}
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
                              >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                                <MenuItem onClick={() => deleteDB(row.id)}>Delete</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
