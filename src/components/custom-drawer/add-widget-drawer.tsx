
import type { ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton } from '@mui/material';

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
       
        },
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Drawer>
  );
}
