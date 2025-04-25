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

import QueryOptions from '../query-options';
import { useColorPicker } from '../../hooks/useColorPicker';

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
  title,
  queryGraphData,
  queryId,
  queryName,
  queryData,
  heading,
}: {
  title: string;
  queryGraphData: string;
  queryId: number;
  queryName: string;
  queryData: object[];
  heading: string[];
}) => {
  const { titleColor, setTitleColor } = useColorPicker();
  return (
    <div>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ display: 'inline', color: `${titleColor}` }}>{queryName}</Typography>

          <QueryOptions
            querytype={queryGraphData}
            title={title}
            queryId={queryId}
            titleColor={titleColor}
            setTitleColor={setTitleColor}
          />
        </div>
        <TableContainer sx={{ position: 'relative', maxHeight: '300px' }} component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead style={{ position: 'relative' }}>
              <TableRow style={{ position: 'sticky', top: '-4px' }}>
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
};

export default Tabular;
