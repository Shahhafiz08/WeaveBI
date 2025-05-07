import React, { useRef } from 'react';

import { Paper, Button, Drawer, MenuItem, MenuList, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { Insights } from './insights';
import Properties from './properties';
import { useQueryOptions } from '../hooks/useQuery-options';

const QueryOptions = ({
  titleColor,
  setTitleColor,
  setChartColor,
  chartColor,
  title,
  queryId,
  querytype,
  incommingTitleColor,
  incommingChartColor,
}: {
  setChartColor?: React.Dispatch<React.SetStateAction<string[]>>;
  titleColor: string;
  chartColor: any;
  setTitleColor: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  queryId: number;
  querytype?: string;
  incommingTitleColor: string;
  incommingChartColor: string;
}) => {
  const popover = usePopover();

  const {
    showInsights,
    deleteDashboardQuery,
    downloadQueryData,
    toggleDrawer,
    open,
    insights,
    loading,
  } = useQueryOptions(queryId, querytype as string);

  const value = useRef<string>('');

  return (
    <>
      <Button type="button" onClick={popover.onOpen} style={{ justifyContent: 'end' }}>
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
                }}
              >
                <Iconify icon="mdi:download-circle-outline" sx={{ marginRight: '5px' }} />
                Download
              </MenuItem>
              <MenuItem
                onClick={() => {
                  value.current = 'insights';
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
                  value.current = 'properties';

                  toggleDrawer(true);

                  popover.onClose();
                }}
              >
                <Iconify icon="mdi:file-document-multiple-outline" sx={{ marginRight: '5px' }} />
                Properties
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteDashboardQuery(queryId);

                  popover.onClose();
                }}
              >
                <Iconify
                  icon="material-symbols:delete-outline-rounded"
                  sx={{ marginRight: '5px' }}
                />
                Delete
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </CustomPopover>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        {value.current === 'insights' && (
          <Insights
            queryId={queryId}
            loading={loading}
            showInsights={showInsights}
            title={title}
            insights={insights}
          />
        )}
        {value.current === 'properties' && (
          <Properties
            setTitleColor={setTitleColor}
            setChartColor={setChartColor}
            incommingTitleColor={incommingTitleColor}
            incommingChartColor={incommingChartColor}
            chartColor={chartColor}
            titleColor={titleColor}
            queryId={queryId}
          />
        )}
      </Drawer>
    </>
  );
};

export default QueryOptions;
