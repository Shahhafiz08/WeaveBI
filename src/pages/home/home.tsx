import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Stack, Modal, Button } from '@mui/material';

import { CONFIG } from 'src/config-global';

import DatabaseInfo from './components/DatabaseInfo';

// ----------------------------------------------------------------------

const metadata = { title: `Home ${CONFIG.site.name}` };

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Stack
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center  ', height: '80vh' }}
      >
        <div className="flex items-center justify-center">
          <img src="/public/assets/images/home/home_emptydb.png" alt="" />
        </div>
        <Button
          variant="contained"
          sx={{ paddingX: '15px', paddingY: '13px' }}
          onClick={handleOpen}
        >
          <img
            src="/public/assets/icons/home/ic-connection-db.svg"
            alt=""
            style={{ marginRight: '20px' }}
          />
          Connect Database
        </Button>
        <Modal open={open} onClose={handleClose}>
          <DatabaseInfo />
        </Modal>
      </Stack>
    </>
  );
}
