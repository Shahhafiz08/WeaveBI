import React, { useState } from 'react';

import {
  Paper,
  Button,
  MenuItem,
  MenuList,
  Typography,
  IconButton,
  ClickAwayListener,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { StyledArrow } from 'src/components/custom-popover/styles';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import HoverDialogue from 'src/sections/components/hover-dialogue';

type DashboardProps = {
  id: string | number;
  edit?: boolean;
  editDashboard: () => void;
  dashboardName: string;
  refreshLoading: boolean;
  refreshDashboardQueries: () => void;
  saveLayout: () => void;
  handleOpenSlider: () => void;
  renderableQueries: any[];
};

const DashboardHeader: React.FC<DashboardProps> = ({
  dashboardName,
  id,
  handleOpenSlider,
  saveLayout,
  edit,
  editDashboard,
  refreshLoading,
  renderableQueries,
  refreshDashboardQueries,
}) => {
  const popover = usePopover();
  const [dialogue, setDialogue] = useState<Boolean>(false);
  const showDialogue = () => {
    setDialogue(true);
    console.log('entered');
  };
  const hideDialogue = () => {
    setDialogue(false);
    console.log('leaved');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
        {dashboardName
          ? dashboardName.charAt(0).toUpperCase() + dashboardName.slice(1)
          : 'Dashboard'}
        {' Dashboard'}
      </Typography>
      {renderableQueries?.length > 0 && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {edit ? (
            <Button
              onClick={() => {
                saveLayout();
              }}
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
              onClick={handleOpenSlider}
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
            sx={{ fontWeight: 'medium', postion: 'relative' }}
            variant="contained"
            type="button"
            onMouseEnter={showDialogue}
            onMouseLeave={hideDialogue}
            onClick={() => {
              refreshDashboardQueries();
            }}
          >
            Re-Run
          </Button>
          {dialogue && <HoverDialogue />}

          <IconButton type="button" onClick={popover.onOpen}>
            <Iconify icon="uil:ellipsis-v" />
          </IconButton>

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
