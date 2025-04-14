import React from 'react';

import { Button, Drawer } from '@mui/material';

export const Insights = () => {
  const [open, setOpen] = React.useState(false);

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }
  return (
    <div>
      <Button onClick={() => toggleDrawer()}>Open drawer</Button>
 <Drawer>dsdsds </Drawer>
    </div>
  );
};
