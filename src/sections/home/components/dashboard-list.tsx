// DashboardTableList.tsx
import * as React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  Box,
  Chip,
  Stack,
  Modal,
  Table,
  Paper,
  Button,
  Checkbox,
  MenuList,
  MenuItem,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
  ClickAwayListener,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

import usetTableStyling from 'src/sections/hooks/use-table-styling';
import { useDatabaseId } from 'src/sections/context/databaseid-context';
import ConfimationPopup from 'src/sections/components/confermation-popup/confirmation-popup';
import useConfirmationPopup from 'src/sections/components/confermation-popup/useConfirmation-popup';

import { pinDashboardResponse, deleteDashboardResponse } from '../api/actions';

type Dashboard = {
  isPinned: boolean;
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tags: string[];
  databaseId: number;
};

type Props = {
  fetchDataApi: () => Promise<{ dashboards: Dashboard[] }>;
};

const { StyledTableCell, StyledTableRow } = usetTableStyling();

export default function DashboardTableList({ fetchDataApi }: Props) {
  const [dashboards, setDashboards] = React.useState<Dashboard[]>([]);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [popoverAnchor, setPopoverAnchor] = React.useState<HTMLElement | null>(null);
  const [activeDashboardId, setActiveDashboardId] = React.useState<number>(0);

  const { setDatabaseId } = useDatabaseId();
  const { handleCloseModal, handleOpenModal, modal } = useConfirmationPopup();

  const fetchData = React.useCallback(async () => {
    try {
      const data = await fetchDataApi();
      setDashboards(data.dashboards);
      data.dashboards.forEach((d) => setDatabaseId(d.databaseId));
    } catch (error) {
      toast.error('Error fetching dashboards');
    }
  }, [fetchDataApi, setDatabaseId]);

  const handleDeleteDashboard = async (id: number) => {
    try {
      const resp = await deleteDashboardResponse(id);
      toast.success(resp.message);
      handlePopoverClose();
      fetchData();
    } catch (err) {
      toast.error('Error deleting dashboard');
    }
  };

  const handlePinToggle = async (id: number) => {
    setDashboards((prev) => prev.map((d) => (d.id === id ? { ...d, isPinned: !d.isPinned } : d)));
    await pinDashboardResponse(id);
  };

  const handlePopoverOpen = (e: React.MouseEvent<HTMLElement>, id: number) => {
    setPopoverAnchor(e.currentTarget);
    setActiveDashboardId(id);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setActiveDashboardId(0);
  };

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tableHeadItems = ['Name', 'Description', 'Domain', 'Created', 'Action'];

  return (
    <Stack sx={{ boxShadow: 2, height: '400px', background: 'white' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selected.length === dashboards.length}
                  indeterminate={selected.length > 0 && selected.length < dashboards.length}
                  onChange={(e) => setSelected(e.target.checked ? dashboards.map((d) => d.id) : [])}
                />
              </StyledTableCell>
              {tableHeadItems.map((item) => (
                <StyledTableCell key={item}>{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dashboards.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  No dashboards found.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              dashboards.map((data) => (
                <React.Fragment key={data.id}>
                  <StyledTableRow>
                    <StyledTableCell>
                      <Checkbox
                        checked={selected.includes(data.id)}
                        onChange={(e) =>
                          setSelected((prev) =>
                            e.target.checked
                              ? [...prev, data.id]
                              : prev.filter((id) => id !== data.id)
                          )
                        }
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

                    <StyledTableCell>
                      {data.description.length > 60
                        ? `${data.description.slice(0, 60)}...`
                        : data.description}
                    </StyledTableCell>

                    <StyledTableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          overflow: 'hidden',
                          width: '300px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {data.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="medium"
                            sx={{
                              fontFamily: 'poppins',
                              marginRight: '4px',
                              marginBottom: '4px',
                              backgroundColor: '#F5F9FF',
                              color: '#2E4F7A',
                              '&:hover': {
                                cursor: 'default',
                                backgroundColor: '#F5F9FF',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </StyledTableCell>

                    <StyledTableCell>
                      {new Date(data.createdAt).toLocaleDateString('en-US')}
                    </StyledTableCell>

                    <StyledTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button onClick={(e) => handlePopoverOpen(e, data.id)}>
                        <Iconify icon="mdi:dots-vertical" />
                      </Button>
                      <Button onClick={() => handlePinToggle(data.id)}>
                        <Iconify
                          icon={data.isPinned ? 'ic:sharp-push-pin' : 'ic:outline-push-pin'}
                          sx={{ rotate: '45deg' }}
                        />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>

                  <CustomPopover
                    open={Boolean(popoverAnchor)}
                    anchorEl={popoverAnchor}
                    onClose={handlePopoverClose}
                    sx={{ mt: 1 }}
                  >
                    <ClickAwayListener onClickAway={handlePopoverClose}>
                      <MenuList>
                        <MenuItem>
                          <Link
                            to={paths.dashboard.OpenVisualize(data.id)}
                            style={{
                              textDecoration: 'none',
                              color: 'black',
                              display: 'flex',
                              gap: 8,
                            }}
                          >
                            <Iconify icon="ic:baseline-file-open" />
                            Open
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={() => console.log('Edit', activeDashboardId)}>
                          <Iconify icon="ic:baseline-edit" />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleOpenModal}>
                          <Iconify icon="ic:baseline-delete" />
                          Delete
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </CustomPopover>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modal} onClose={handleCloseModal}>
        <ConfimationPopup
          buttonText="Delete"
          handleClose={handleCloseModal}
          id={activeDashboardId}
          actionDescripton="Deleting the dashboard will remove all associated queries."
          handleAPICall={({ id }) =>
            id !== undefined ? handleDeleteDashboard(id) : Promise.resolve()
          }
        />
      </Modal>
    </Stack>
  );
}
