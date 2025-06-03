import React from 'react';

import { Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const HoverDialogue = () => (
  <Box
    style={{
      width: '100%',
      textAlign: 'start',
      borderRadius: 15,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: '10px',
      boxShadow: '0px 0px 1px 2px #f5f3f2',
      background: 'white',
      padding: '20px',
      alignItems: 'center',
    }}
  >
    <Iconify color="red" icon="mdi:alert" />
    <div style={{ fontSize: '15px' }}>
      <b style={{ color: '#193E6D', fontSize: '17px' }}>Note:</b> This action will re-run all
      associated queries. The displayed results may differ due to updated data.
    </div>
  </Box>
);

export default HoverDialogue;
