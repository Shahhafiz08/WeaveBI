import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { truncateString } from 'src/utils/helper';

import NoDataFound from 'src/sections/components/no-data-found';
import usetTableStyling from 'src/sections/hooks/use-table-styling';

import QueryOptions from '../query-options';

import type { Query } from '../../types/inference';

const Tabular = ({
  queryData,
  fetchDashboardInfo,
}: {
  queryData: Query;
  fetchDashboardInfo: () => void;
}) => {
  const { StyledTableCell, StyledTableRow } = usetTableStyling();
  const heading =
    Array.isArray(queryData.data) && queryData.data.length > 0 && queryData.data[0]
      ? Object.keys(queryData.data[0])
      : [];

  console.log(queryData);

  return (
    <div>
      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, userSelect: 'none' }}>
        <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <Typography style={{ textTransform: 'capitalize' }}>{queryData.name}</Typography>
          <QueryOptions fetchDashboardInfo={fetchDashboardInfo} query={queryData} />
        </div>
        <TableContainer sx={{ position: 'relative' }} component={Paper}>
          <Table sx={{ width: '100%' }}>
            {queryData.data.length <= 0 && <NoDataFound />}
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
              {queryData.data.map((rowItem: any, i: number) => (
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
