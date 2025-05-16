import {
  Paper,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  tableCellClasses,
} from '@mui/material';

import { truncateString } from 'src/utils/helper';

import { primary } from 'src/theme/core';

import QueryOptions from '../query-options';

import type { QueryResponse } from '../../types/inference';

const Tabular = ({ query }: QueryResponse) => {
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: primary.gray,
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
  const heading = Array.isArray(query.data) ? Object.keys(query.data[0]) : [];

  return (
    <div>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, userSelect: 'none' }}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{query.name}</Typography>
          <QueryOptions query={query} />
        </div>
        <TableContainer sx={{ position: 'relative', maxHeight: '320px' }} component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead style={{ position: 'relative' }}>
              <TableRow style={{ position: 'sticky', top: '0.01px' }}>
                {heading.map((item, i) => (
                  <StyledTableCell key={i} style={{}}>
                    {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {query.data.map((rowItem: any, i:number) => (
                <StyledTableRow key={i}>
                  {Object.keys(rowItem).map((item, _) => (
                    <StyledTableCell key={_}>{truncateString(rowItem[item], 20)}</StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Tabular;
