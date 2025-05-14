import { LoadingButton } from '@mui/lab';
import { Box, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { ChartColorPicker } from './chart-color-picker';
import { useProperties } from '../hooks/use-properties';

const Properties = ({
  queryId,
  handleChangeXTitle,
  handleChangeYTitle,
  outputType,
  chart,
  setChartColor,
  chartColor,
  handleChangeOutputType,
  incommingChartColor,
}: {
  queryId: number;
  setChartColor?: any;
  handleChangeXTitle?: (text: string) => void;
  handleChangeYTitle?: (text: string) => void;
  handleChangeOutputType: ({ output }: { output: string }) => void;
  chartColor: any;
  chart?: string;
  outputType: string | undefined;
  incommingChartColor: string;
}) => {
  const { applyQueryColor, applying } = useProperties({ chartColor, queryId });

  return (
    <Box
      display="flex"
      justifyContent="start"
      flexDirection="column"
      gap={2}
      width={400}
      fontWeight={600}
      style={{ background: 'white' }}
      height="100vh"
      paddingTop={3}
      paddingLeft={2}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div> Customize</div>
      </div>

      <div
        style={{
          padding: '0  10px',
          display: 'flex',
          gap: 14,
          flexDirection: 'column',
        }}
      >
        {/* Change description and title and chart type */}
        <div style={{ marginBottom: 5, display: 'flex', flexDirection: 'column', gap: 15 }}>
          <FormControl size="small">
            <TextField fullWidth name="name" label="Title" size="small" />
            <TextField
              size="small"
              name="query"
              fullWidth
              label="Descriptions "
              minRows={2}
              // value={customInstructions}
              multiline
            />
          </FormControl>
          
          <FormControl size="small">
            <InputLabel id="chart_type">Chart Type</InputLabel>
            <Select
              labelId="chart_type"
              id="demo-simple-select"
              // value={age}
              onChange={(e) => handleChangeOutputType({ output: e.target.value as string })}
              label="Chart Type"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="pie chart">Pie</MenuItem>
              <MenuItem value="doughnut chart">Doughnut</MenuItem>
              <MenuItem value="bar chart">Bar</MenuItem>
              <MenuItem value="line chart">Line</MenuItem>
              <MenuItem value="scatter chart">Scatter</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Change chart color */}

        <ChartColorPicker
          label="Chart Color"
          incommingChartColor={incommingChartColor}
          setChartColor={setChartColor}
        />

        {/* add  X & Y axis */}
        <div style={{ marginBottom: 5, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {chart === 'chart' && (
            <>
              {' '}
              <TextField
                fullWidth
                name="name"
                label="X-axis Title"
                size="small"
                onChange={(e) => {
                  if (handleChangeXTitle) handleChangeXTitle(e.target.value);
                }}
              />
              <TextField
                fullWidth
                name="name"
                label="Y-axis Title"
                size="small"
                onChange={(e) => {
                  if (handleChangeYTitle) handleChangeYTitle(e.target.value);
                }}
              />
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button sx={{ width: 'fit-content', fontWeight: '500' }} variant="contained">
            Reset
          </Button>
          <LoadingButton
            loading={applying}
            sx={{ width: 'fit-content', fontWeight: '500' }}
            onClick={() => {
              applyQueryColor();
            }}
            variant="contained"
          >
            Apply
          </LoadingButton>
        </div>
      </div>
    </Box>
  );
};

export default Properties;
