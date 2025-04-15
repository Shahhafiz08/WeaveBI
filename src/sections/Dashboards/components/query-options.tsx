import React from 'react';

import { Paper, Button, Drawer, MenuItem, MenuList, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { Insights } from './insights';
import { useInsights } from '../hooks/insight-hook';

const QueryOptions = ({
  title,
  queryId,
  querytype,
}: {
  title?: string;
  queryId: number;
  querytype?: string;
}) => {
  const popover = usePopover();

  const { showInsights, downloadQueryData, toggleDrawer, open, insights, loading } = useInsights(
    queryId,
    querytype as string
  );

  return (
    <>
      <Button type="button" onClick={popover.onOpen}>
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
                  popover.onClose();
                  downloadQueryData();
                  console.log('download clicked');
                }}
              >
                <Iconify icon="mdi:download-circle-outline" sx={{ marginRight: '5px' }} />
                Download
              </MenuItem>
              <MenuItem
                onClick={() => {
                  showInsights(queryId);
                  toggleDrawer(true);
                  popover.onClose();
                }}
              >
                <Iconify icon="material-symbols-light:info-outline" sx={{ marginRight: '5px' }} />
                Insights
              </MenuItem>
              <MenuItem
                onClick={() => {
                  popover.onClose();
                }}
              >
                <Iconify icon="mdi:file-document-multiple-outline" sx={{ marginRight: '5px' }} />
                Properties
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </CustomPopover>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <Insights queryId={queryId} loading={loading} showInsights={showInsights} title={title} insights={insights} />
      </Drawer>
    </>
  );
};

export default QueryOptions;
