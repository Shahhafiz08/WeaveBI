import { styled } from '@mui/material';

export const useCustomDrawer = () => {
  const drawerWidth = 300;
  const MainContent = styled('div', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{ open: boolean }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: open ? drawerWidth : 0,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  }));
  return { MainContent };
};
