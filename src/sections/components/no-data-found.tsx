import { Stack } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import nodata from '../../assets/dashboard/no-data-found.svg';

const NoDataFound = () => (
  <Stack gap={5}>
    <div style={{ textAlign: 'center' }}>
      {' '}
      <img src={nodata} alt="" style={{ width: '200px' }} />
    </div>
    <div
      style={{
        flexWrap: 'wrap',
        fontSize: '17px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {' '}
      Click <Iconify icon="uil:ellipsis-v" />
      above to <b style={{ marginLeft: '5px', marginRight: '5px' }}> Configure</b> your Query
    </div>
  </Stack>
);

export default NoDataFound;
