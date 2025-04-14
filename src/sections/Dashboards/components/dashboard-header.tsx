import React from 'react';

import { Paper, Button, MenuItem, MenuList, Typography, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { StyledArrow } from 'src/components/custom-popover/styles';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import useDashboardDetails from '../hooks/dashboard-details';

type DashboardProps = {
  id: string | number;
  edit?: boolean;
  editDashboard: () => void;
  saveDashboard: () => void;
  refreshLoading: boolean;
  refreshDashboardQueries: () => void;
};

const DashboardHeader: React.FC<DashboardProps> = ({
  id,
  edit,
  editDashboard,
  refreshLoading,
  saveDashboard,
  refreshDashboardQueries,
}) => {
  const popover = usePopover();
  const { dashboardData, renderableQueries, anchorRef } = useDashboardDetails({
    id,
  });

  // eslint-disable-next-line consistent-return

  const dashboardName = dashboardData?.name || '';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
        {dashboardName
          ? dashboardName.charAt(0).toUpperCase() + dashboardName.slice(1)
          : 'Dashboard'}
        {' Dashboard'}
      </Typography>
      {renderableQueries?.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          {edit ? (
            <Button
              onClick={saveDashboard}
              type="button"
              variant="contained"
              sx={{
                fontWeight: 'medium',
                paddingX: '15px',
                maxHeight: '40px',
              }}
            >
              Save
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              sx={{
                fontWeight: 'medium',
                paddingX: '15px',
                maxHeight: '40px',
              }}
            >
              + Add Widget
            </Button>
          )}

          <StyledArrow />

          <Button
            type="button"
            onClick={() => {
              refreshDashboardQueries();
            }}
            disabled={refreshLoading}
          >
            <Iconify icon="ic:baseline-autorenew" className={`${refreshLoading ? 'spin' : ''}`} />
          </Button>

          <Button type="button" ref={anchorRef} onClick={popover.onOpen}>
            <Iconify icon="uil:ellipsis-v" />
          </Button>

          <CustomPopover
            open={popover.open}
            anchorEl={popover.anchorEl}
            onClose={popover.onClose}
            sx={{ marginTop: '10px' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={popover.onClose}>
                <MenuList id="composition-menu" aria-labelledby="composition-button">
                  <MenuItem
                    onClick={() => {
                      editDashboard();
                      popover.onClose();
                    }}
                  >
                    <Iconify icon="mdi:application-edit-outline" sx={{ marginRight: '5px' }} />
                    Edit
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </CustomPopover>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
