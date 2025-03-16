import { useState } from 'react';

import { Stack, Modal, Button } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import CreateQuery from './components/createQuery';

export default function QueryBuilderView() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        width: '100%',
      }}
    >
      <img
        src="/public/assets/images/home/query_screen_empty.png"
        style={{ maxWidth: '600px', transform: 'translateY(-50px)' }}
        alt=""
      />
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ display: 'flex', gap: 2, padding: '10px', paddingX: '30px' }}
      >
        <Iconify icon="ic:outline-plus" />
        Add Queries
      </Button>
      <Modal open={open} onClose={handleClose}>
        <CreateQuery closeForm={handleClose} />
      </Modal>
    </Stack>
  );
}
