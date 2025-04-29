import { Box, Button, TextField } from '@mui/material';

import { TitleColorPicker } from './TitleColorPicker';
import { ChartColorPicker } from './chartColorPicker';

const Properties = ({
  queryId,
  titleColor,
  setTitleColor,
  setChartColor,
}: {
  queryId: number;
  setTitleColor: React.Dispatch<React.SetStateAction<string>>;
  setChartColor?: any;
  titleColor: string;
}) => (
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
      <div> Control Pannel</div>
    </div>

    <div
      style={{
        padding: '0  10px',
        display: 'flex',
        gap: 14,
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <TextField fullWidth name="name" label="Title" sx={{ marginBottom: '15px' }} />
        <TextField
          name="query"
          fullWidth
          label="Descriptions "
          minRows={2}
          // value={customInstructions}
          multiline
        />
      </div>
      <div style={{ fontFamily: 'sans-serif' }}>
        <TitleColorPicker
          label="Title color"
          selectedColor={titleColor}
          setTitleColor={setTitleColor}
        />
        <ChartColorPicker label="Chart Color" setChartColor={setChartColor} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button sx={{ width: 'fit-content', fontWeight: '500' }} variant="contained">
          Reset
        </Button>
        <Button sx={{ width: 'fit-content', fontWeight: '500' }} variant="contained">
          Apply
        </Button>
      </div>
    </div>
  </Box>
);

export default Properties;
