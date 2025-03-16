import React from 'react';

import { Stack, Button, Typography } from '@mui/material';

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
      <Typography variant="h3" fontWeight="medium">
        Connection Names
      </Typography>
      <Stack gap={5} direction="row">
        <Button
          onClick={() => {
            handleRefresh();
          }}
        >
          <Iconify icon="ic:baseline-autorenew" />
        </Button>
        <Button>
          <Iconify icon="ic:round-more-vert" />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Sectionheader;
