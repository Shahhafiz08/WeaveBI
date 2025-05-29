import * as React from 'react';
import { toast } from 'react-toastify';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import {
  Grow,
  Stack,
  Button,
  Popper,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
  ClickAwayListener,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import Sectionheader from './Sectionheader';
import usetTableStyling from '../hooks/use-table-styling';
import { getDatabase, deleteDatabase } from './api/actions';

type fetchDataType = {
  id: number;
  connectionName: string;
  description: string;
  updatedAt: string;
};

const { StyledTableCell, StyledTableRow } = usetTableStyling();

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
      console.log('dskjfnskjfdskjb', incomingData.databases);
    } catch (error) {
      console.error('Error fetching database:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  const deleteDB = async (id: number) => {
    try {
      const response = await deleteDatabase(id);
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  };
  const [selected, setSelected] = React.useState<number[]>([]);
  return (
    <div style={{ background: '#F4F6F8', height: '100vh' }}>
      <Sectionheader setRefresh={setRefresh} />
      <Stack sx={{ marginX: 5, marginY: 2, boxShadow: 2, borderRadius: 1 }}>
        <TableContainer
          sx={{
            postion: 'relative',
            width: '100%',
            height: '400px',
            background: 'white',
            borderRadius: '10px',
          }}
        >
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
                <StyledTableCell>Database Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="left">Last Updated</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getData.length <= 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    No dashboards found.
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                getData.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          setSelected((prev) =>
                            isChecked ? [...prev, row.id] : prev.filter((id) => id !== row.id)
                          );
                        }}
                      />
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </div>
  );
}
