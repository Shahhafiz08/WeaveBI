import React from 'react';

import { Box } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const HoverDialogue = () => (
  <Box
    fontFamily="poppins"
    style={{
      display: 'flex',
      justifyContent: 'center',
      zIndex: '20',
      flexDirection: 'column',
      gap: '10px',
      borderRadius: '16px',
      position: 'absolute',
      top: '14%',
      left: '78%',
      width: '300px',
      height: 'fit-content',
      background: 'white',
      padding: '20px',
      alignItems: 'center',

    }}
  >
    <Iconify color="red" icon="mdi:alert" />
    <div>
      <b>Note:</b> This action will re-run all associated queries. The displayed results may differ
      due to updated data.
    </div>
  </Box>
);

export default HoverDialogue;
