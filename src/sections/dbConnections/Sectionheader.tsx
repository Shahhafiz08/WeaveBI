import React from 'react';

import { Stack, Typography, IconButton } from '@mui/material';

import { primary } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';

type SectionheaderProps = {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sectionheader: React.FC<SectionheaderProps> = ({ setRefresh }) => {
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Stack
      direction="row"
      gap={20}
      justifyContent="space-between"
      alignItems="center"
      marginLeft={5}
      marginRight={10}
    >
      <Typography variant="h3" fontWeight="semibold" fontFamily="poppins" color={primary.main}>
        Connection Names
      </Typography>
      <Stack gap={5} direction="row">
        <IconButton
          onClick={() => {
            handleRefresh();
          }}
        >
          <Iconify icon="ic:baseline-autorenew" />
        </IconButton>
        <IconButton>
          <Iconify icon="ic:round-more-vert" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Sectionheader;
