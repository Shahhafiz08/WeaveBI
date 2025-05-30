import { useState } from 'react';

import { Stack, Modal, Button, TextField, Typography, InputAdornment } from '@mui/material';

import { primary } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';

import SetupDashboard from './setup-dashboard';

const VisulaizeHeader = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack gap={5}>
      <div>
        {' '}
        <Typography fontFamily="poppins" color={primary.main} variant="h4" fontWeight="bold">
          Dashboards
        </Typography>
      </div>
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <TextField
          placeholder="Search Dashboard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" style={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            background: 'white',

            width: { xs: 5, md: 200 },
            borderRadius: '10px',
            border: 'none',
          }}
        />

        <Button
          variant="contained"
          sx={{ height: '40px', fontWeight: '500' }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Iconify icon="material-symbols:add" sx={{ marginRight: '10px' }} />
          Create Dasahboard
        </Button>
      </Stack>

      <Modal onClose={handleClose} open={open}>
        <SetupDashboard onClose={handleClose} />
      </Modal>
    </Stack>
  );
};

export default VisulaizeHeader;
