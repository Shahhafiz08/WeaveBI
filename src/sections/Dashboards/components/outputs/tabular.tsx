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
import { useColorPicker } from '../../hooks/useColor-picker';

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
  const { titleColor, setTitleColor, chartColor, setChartColor } = useColorPicker();
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: Array.isArray(chartColor) ? chartColor[7] : '#F0F0F0',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: Array.isArray(chartColor) ? chartColor[7] : '#F0F0F0',
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, userSelect: 'none' }}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ display: 'inline', color: `${titleColor}` }}>{queryName}</Typography>

          <QueryOptions
            querytype={queryGraphData}
            title={title}
            queryId={queryId}
            titleColor={titleColor}
            setTitleColor={setTitleColor}
            setChartColor={setChartColor}
            chartColor={chartColor}
          />
        </div>
        <TableContainer sx={{ position: 'relative', maxHeight: '320px' }} component={Paper}>
          <Table sx={{ width: '100%' }}>
            <TableHead style={{ position: 'relative', color: titleColor ?? '#637381' }}>
              <TableRow style={{ position: 'sticky', top: '0.01px' }}>
                {heading.map((item, i) => (
                  <StyledTableCell key={i} style={{}}>
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
