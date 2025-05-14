import React, { useRef } from 'react';

import { Paper, Drawer, MenuItem, MenuList, IconButton, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { Insights } from './insights';
import Properties from './properties';
import { useQueryOptions } from '../hooks/useQuery-options';

type QueryOptionsTypes = {
  setChartColor?: React.Dispatch<React.SetStateAction<string[]>>;

  handleChangeXTitle?: (text: string) => void;
  handleChangeYTitle?: (text: string) => void;
  chartColor: any;
  title?: string;
  queryId: number;
  querytype?: string;
  incommingChartColor: string;
  chart?: string;
};
const QueryOptions = ({
  handleChangeXTitle,
  handleChangeYTitle,

  setChartColor,
  chartColor,
  title,
  queryId,
  querytype,
  chart,
  incommingChartColor,
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
  } = useQueryOptions(queryId, querytype as string);

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
                <Iconify
                  icon="material-symbols:dashboard-customize-outline-rounded"
                  sx={{ marginRight: '5px' }}
                />
                Customize
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
                Remove
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
            chart={chart}
            handleChangeXTitle={handleChangeXTitle}
            handleChangeYTitle={handleChangeYTitle}
            outputType={outputType}
            handleChangeOutputType={handleChangeOutputType}
            setChartColor={setChartColor}
            incommingChartColor={incommingChartColor}
            chartColor={chartColor}
            queryId={queryId}
          />
        )}
      </Drawer>
    </>
  );
};

export default QueryOptions;
