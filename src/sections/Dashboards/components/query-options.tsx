import React, { useRef } from 'react';

import { Paper, Drawer, MenuItem, MenuList, IconButton, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { Insights } from './insights';
import Properties from './properties';
import { useQueryOptions } from '../hooks/useQuery-options';

import type { Query } from '../types/inference';

type QueryOptionsTypes = {
  setChartColor?: React.Dispatch<React.SetStateAction<string[]>>;
  handleChangeXTitle?: (text: string) => void;
  handleChangeYTitle?: (text: string) => void;
  querytype?: string;
  isChart?: string;
  chartColor?: any;
  showOptions?: string;
  query: Query;
  changeChatType?: string;
};
const QueryOptions = ({
  query,
  handleChangeXTitle,
  handleChangeYTitle,
  setChartColor,
  changeChatType,
  querytype,
  showOptions,
  chartColor,
  isChart,
}: QueryOptionsTypes) => {
  const popover = usePopover();
  const {
    showInsights,
    deleteDashboardQuery,
    downloadQueryData,
    toggleDrawer,
    open,
    insights,
    loading,
    handleChangeOutputType,
    outputType,
  } = useQueryOptions(query?.databaseId, query?.outputType);

  const value = useRef<string>('');

  return (
    <>
      <IconButton onClick={popover.onOpen} sx={{ width: 30, height: 30 }}>
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
                  showInsights(query.databaseId);
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
                <Iconify
                  icon="material-symbols:dashboard-customize-outline-rounded"
                  sx={{ marginRight: '5px' }}
                />
                Customize
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteDashboardQuery(query.databaseId);
                  popover.onClose();
                }}
              >
                <Iconify
                  icon="material-symbols:delete-outline-rounded"
                  sx={{ marginRight: '5px' }}
                />
                Remove
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </CustomPopover>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        {value.current === 'insights' && (
          <Insights
            query={query}
            loading={loading}
            showInsights={showInsights}
            insights={insights}
          />
        )}
        {value.current === 'properties' && (
          <Properties
            changeChatType={changeChatType}
            showOptions={showOptions}
            chartColor={chartColor}
            query={query}
            isChart={isChart}
            handleChangeXTitle={handleChangeXTitle}
            handleChangeYTitle={handleChangeYTitle}
            outputType={outputType}
            handleChangeOutputType={handleChangeOutputType}
            setChartColor={setChartColor}
          />
        )}
      </Drawer>
    </>
  );
};

export default QueryOptions;
