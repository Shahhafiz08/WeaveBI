import React from 'react';

import { Button, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const ConfimationPopup = () => {
  const a = 0;
  return (
    <div>
      <Iconify icon="ic:baseline-close" />
      <Typography variant="h4">Are you sure you want to do this action?</Typography>
      <div>
        <Button variant="contained"> Confirm</Button>
        <Button variant="outlined"> Cancle</Button>
      </div>
    </div>
  );
};

export default ConfimationPopup;
