import * as React from 'react';
import { toast } from 'react-toastify';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import {
  Modal,
  Stack,
  Button,
  Checkbox,
  MenuList,
  MenuItem,
  TableBody,
  ClickAwayListener,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import Sectionheader from './Sectionheader';
import usetTableStyling from '../hooks/use-table-styling';
import { getDatabase, deleteDatabase } from './api/actions';
import ConfimationPopup from '../components/confermation-popup/confirmation-popup';
import useConfirmationPopup from '../components/confermation-popup/useConfirmation-popup';

type fetchDataType = {
  id: number;
  connectionName: string;
  description: string;
  updatedAt: string;
};

const { StyledTableCell, StyledTableRow } = usetTableStyling();

export default function DatabaseConnectionsView() {
  const popover = usePopover();

  const [rowId, setRowid] = React.useState(0);

  const [refresh, setRefresh] = React.useState<boolean>(false);
  const { handleCloseModal, handleOpenModal, modal } = useConfirmationPopup();

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

                          setRowid(row.id);

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
                        onClick={(e) => {
                          popover.setAnchorEl(e.currentTarget);
                        }}
                      >
                        <Iconify icon="uil:ellipsis-v" />
                      </Button>

                      <CustomPopover
                        open={popover.open}
                        anchorEl={popover.anchorEl}
                        onClose={popover.onClose}
                        sx={{ mt: 1 }}
                      >
                        <ClickAwayListener onClickAway={popover.onClose}>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                popover.onClose();
                              }}
                            >
                              <Iconify icon="ic:baseline-file-open" /> Open
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                popover.onClose();
                              }}
                            >
                              <Iconify icon="ic:baseline-edit" /> Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleOpenModal();
                              }}
                            >
                              <Iconify icon="ic:baseline-delete" />
                              Delete
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </CustomPopover>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={modal} onClose={handleCloseModal}>
          <ConfimationPopup
            buttonText="Delete"
            handleClose={handleCloseModal}
            handleAPICall={({ id }) => {
              if (id !== undefined) {
                return deleteDB(id);
              }
              return Promise.resolve(); // or optionally throw an error
            }}
            actionDescripton="Deleting the Database will delete all the data related to the database."
            id={rowId}
          />
        </Modal>
      </Stack>
    </div>
  );
}
