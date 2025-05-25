import { styled, TableRow, TableCell, tableCellClasses } from '@mui/material';

import { primary } from 'src/theme/core';

const usetTableStyling = () => {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F5F9FF',
      color: '#193E6D',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: primary.gray,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return {
    StyledTableCell,
    StyledTableRow,
  };
};
export default usetTableStyling;
