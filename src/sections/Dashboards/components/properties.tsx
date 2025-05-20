import { LoadingButton } from '@mui/lab';
import { Box, Button, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { ChartColorPicker } from './chart-color-picker';
import { useProperties } from '../hooks/use-properties';

import type { Query } from '../types/inference';

type PropertiesType = {
  query: Query;
  setChartColor?: any;
  handleChangeXTitle?: (text: string) => void;
  handleChangeYTitle?: (text: string) => void;
  handleChangeOutputType: ({ output }: { output: string }) => void;
  isChart?: string;
  outputType?: string;
  chartColor: any;
  showOptions?: string;
  changeChatType?: string;
};
const Properties = ({
  query,
  handleChangeXTitle,
  handleChangeYTitle,
  outputType,
  showOptions,
  isChart,
  chartColor,
  setChartColor,
  changeChatType,
  handleChangeOutputType,
}: PropertiesType) => {
  const {
    applyQueryColor,
    applying,
    title,
    handleQueryTitleChange,
    handleQueryDescriptionChange,
    description,
    updateQueryOptions,
  } = useProperties({
    outputType,
    query,
    chartColor,
  });

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
        <div>Customize</div>
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
          <FormControl size="small" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              name="name"
              label="Title"
              size="small"
              value={title}
              onChange={(e) => {
                handleQueryTitleChange(e.target.value);
              }}
            />
            <TextField
              required
              size="small"
              name="query"
              fullWidth
              label="Query"
              minRows={2}
              onChange={(e) => {
                handleQueryDescriptionChange(e.target.value);
              }}
              value={description}
              multiline
            />
          </FormControl>
          {changeChatType === 'changeit' && (
            <FormControl size="small" required>
              <InputLabel id="chart_type">Chart Type</InputLabel>
              <Select
                labelId="chart_type"
                id="demo-simple-select"
                onChange={(e) => handleChangeOutputType({ output: e.target.value as string })}
                label="Chart Type"
                defaultValue={outputType}
              >
                <MenuItem value="pie chart">Pie</MenuItem>
                <MenuItem value="doughnut chart">Doughnut</MenuItem>
                <MenuItem value="bar chart">Bar</MenuItem>
                <MenuItem value="line chart">Line</MenuItem>
                <MenuItem value="scatter chart">Scatter</MenuItem>
                <MenuItem value="stacked chart">Stacked</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>

        {/* Change chart color */}

        <ChartColorPicker
          showOptions={showOptions}
          label="Chart Color"
          setChartColor={setChartColor}
        />

        {/* add  X & Y axis */}
        <div style={{ marginBottom: 5, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {isChart === 'chart' && (
            <>
              {' '}
              <TextField
                fullWidth
                name="name"
                label="X-axis label"
                size="small"
                onChange={(e) => {
                  if (handleChangeXTitle) handleChangeXTitle(e.target.value);
                }}
              />
              <TextField
                fullWidth
                name="name"
                label="Y-axis label"
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
              updateQueryOptions();
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
