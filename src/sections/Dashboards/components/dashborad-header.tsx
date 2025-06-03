import React, { useState } from 'react';

import {
  Modal,
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
import ConfimationPopup from 'src/sections/components/confermation-popup/confirmation-popup';
import useConfirmationPopup from 'src/sections/components/confermation-popup/useConfirmation-popup';

type DashboardProps = {
  edit?: boolean;
  refreshLoading: boolean;
  editDashboard: () => void;
  dashboardName: string;
  refreshDashboardQueries: () => Promise<void>;
  saveLayout: () => void;
  handleOpenSlider: () => void;
  renderableQueries: any[];
};

const DashboardHeader: React.FC<DashboardProps> = ({
  dashboardName,
  refreshLoading,
  handleOpenSlider,
  saveLayout,
  edit,
  editDashboard,
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
  const { handleCloseModal, handleOpenModal, modal } = useConfirmationPopup();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
      <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
        {dashboardName
          ? dashboardName.charAt(0).toUpperCase() + dashboardName.slice(1)
          : 'Dashboard'}
        {' Dashboard'}
      </Typography>
      {renderableQueries?.length > 0 && (
        <>
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

            <IconButton
              type="button"
              onMouseEnter={showDialogue}
              onMouseLeave={hideDialogue}
              onClick={() => {
                handleOpenModal();
              }}
              disabled={refreshLoading}
            >
              <Iconify icon="ic:baseline-autorenew" className={`${refreshLoading ? 'spin' : ''}`} />
            </IconButton>

            {dialogue && (
              <div style={{ position: 'absolute', top: '100%', left: '61%', zIndex: '99999' }}>
                <HoverDialogue />
              </div>
            )}

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
          <Modal open={modal} onClose={handleCloseModal}>
            <ConfimationPopup
              buttonText="Confirm"
              handleClose={handleCloseModal}
              handleAPICall={refreshDashboardQueries}
              actionDescripton="Are you sure you want to re-run the whole dashboard."
              id={undefined}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default DashboardHeader;
