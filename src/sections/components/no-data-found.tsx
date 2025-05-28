import React from 'react';

import { Stack } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const NoDataFound = () => (
  <Stack gap={5}>
    <div style={{ textAlign: 'center' }}>
      {' '}
      <img src="/src/assets/dashboard/no-data-found.svg" alt="" style={{ width: '200px' }} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {' '}
      Click <Iconify icon="uil:ellipsis-v" /> to{' '}
      <b style={{ marginLeft: '5px', marginRight: '5px' }}> Configure</b> your Query
    </div>
  </Stack>
);

export default NoDataFound;
