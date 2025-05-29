import React from 'react';

import { Stack, Button, TextField, Typography, InputAdornment } from '@mui/material';

import { primary } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';

const VisulaizeHeader = () => (
  <Stack gap={5}>
    <div>
      {' '}
      <Typography fontFamily="poppins" color={primary.main} variant="h4" fontWeight="bold">
        Dashboards
      </Typography>
    </div>
    <Stack direction="row" justifyContent="space-between">
      <TextField
        placeholder="Search Dashboard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          background: 'white',
          width: { xs: 5, md: 260 },
          borderRadius: '10px',
          border: 'none',
        }}
      />

      <Button variant="contained" sx={{ fontWeight: '500' }}>
        Create Dasahboard
      </Button>
    </Stack>
  </Stack>
);

export default VisulaizeHeader;
