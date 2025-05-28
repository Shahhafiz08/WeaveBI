import React from 'react';

import { Typography } from '@mui/material';

import { primary } from 'src/theme/core';

const VisulaizeHeader = () => (
  <Typography fontFamily="poppins" color={primary.main} variant="h4" fontWeight="600">
    Connections
  </Typography>
);

export default VisulaizeHeader;
