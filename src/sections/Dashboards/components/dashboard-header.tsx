import React from 'react';

import {
  Grow,
  Paper,
  Button,
  Popper,
  MenuItem,
  MenuList,
  Typography,
  ClickAwayListener,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

const DashboardHeader = ({
  renderableQueries,
  dashboardData,
  handleClose,
  handleToggle,
  editDashboard,
  anchorRef,
  open = true,
}: {
  renderableQueries: Array<[]>;
  dashboardData: string;
  handleClose: (event: Event | React.SyntheticEvent) => void;
  handleToggle: () => void;
  editDashboard: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  open?: boolean;
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h3" color="primary" sx={{ mb: 4 }}>
      {dashboardData ? dashboardData.charAt(0).toUpperCase() + dashboardData.slice(1) : 'Dashboard'}
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
          onClick={() => {
            handleToggle();
          }}
        >
          <Iconify icon="uil:ellipsis-v" />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          disablePortal
          sx={{ zIndex: 111 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    // autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    sx={{ marginTop: '10px' }}
                  >
                    <MenuItem>
                      <Iconify icon="ic:outline-save" sx={{ marginRight: '5px' }} />
                      Save
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        editDashboard();
                        handleClose(e);
                      }}
                    >
                      <Iconify icon="mdi:application-edit-outline" sx={{ marginRight: '5px' }} />
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
);
export default DashboardHeader;
