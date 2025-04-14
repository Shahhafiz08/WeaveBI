import React from 'react';

import { Paper, Button, MenuItem, MenuList, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import useDashboardDetails from '../hooks/dashboard-details';
import { downloadChartData, downloadTabularData } from '../api/actions';

const QueryOptions = ({ queryId, querytype }: { queryId: number; querytype?: string }) => {
  const popover = usePopover();
 
  const { anchorRef } = useDashboardDetails({});

  const downloadQueryData = async () => {
    function convertToFile(blob: any) {
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `query_data-${queryId}`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    try {
      if (querytype === 'tabular') {
        const downloadTabular = await downloadTabularData(queryId);
        const blob = new Blob([downloadTabular], {
          type: 'text/csv',
        });
        convertToFile(blob);
      } else {
        const downloadChart = await downloadChartData(queryId);
        const blob = new Blob([JSON.stringify(downloadChart)], {
          type: 'application/json',
        });
        convertToFile(blob);
      }
    } catch (error) {
      alert('Download failed');
    }
  };

  return (
    <>
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
    </>
  );
};

export default QueryOptions;
