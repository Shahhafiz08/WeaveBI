import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

import { primary } from 'src/theme/core';

// ----------------------------------------------------------------------

type Props = CardProps & {
  total: number;

  image: string;
  title: string;
};

export function KeyPoints({ title, total, image, sx, ...other }: Props) {
  const kpi = (
    <Box sx={{ gap: 0.5, display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h2" color={primary.main}>
        {' '}
        {total}
      </Typography>
      <img src={image} alt="" />
    </Box>
  );

  return (
    <Card
      sx={{
        display: 'flex',
        p: 3,
        width: '100%',
        height: '144px',

        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {kpi}
        <Box color={primary.main} sx={{ fontWeight: '500' }}>
          {title}
        </Box>
      </Box>
    </Card>
  );
}
