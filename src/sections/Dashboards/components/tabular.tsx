import {
  Paper,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  tableCellClasses,
} from '@mui/material';

import { truncateString } from 'src/utils/helper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Tabular = ({
  queryid,
  queryName,
  queryData,
  heading,
}: {
  queryid: number;
  queryName: string;
  queryData: object[];
  heading: string[];
}) => (
  <div>
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <TableContainer sx={{ position: 'relative' }} component={Paper}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              {heading.map((item, i) => (
                <StyledTableCell key={i}>
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {queryData.map((rowItem: any, i) => (
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

export default Tabular;
