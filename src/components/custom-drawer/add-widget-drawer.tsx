import type { ReactNode } from 'react';

import { Drawer, IconButton } from '@mui/material';

import { Iconify } from '../iconify';

interface AddWidgetDrawerProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: ReactNode;
}

export default function AddWidgetDrawer({
  open,
  onClose,
  children,
  width = 300,
}: AddWidgetDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      variant="persistent"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          padding: 2,
          marginTop: 9,
          borderRadius: '16px 0px 0px 0px ',
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <Iconify icon="ic:baseline-close" />
        </IconButton>
      </div>
      {children}
    </Drawer>
  );
}
