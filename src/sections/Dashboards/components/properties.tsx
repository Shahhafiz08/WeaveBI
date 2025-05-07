import { toast } from 'react-toastify';
import { useParams } from 'react-router';

import { Box, Button, TextField } from '@mui/material';

import { usePopover } from 'src/components/custom-popover';

import { updateQueryColors } from '../api/actions';
import { TitleColorPicker } from './title-color-picker';
import { ChartColorPicker } from './chart-color-picker';

const Properties = ({
  queryId,
  titleColor,
  setTitleColor,
  setChartColor,
  chartColor,
  incommingChartColor,
  incommingTitleColor,
}: {
  queryId: number;
  setTitleColor: React.Dispatch<React.SetStateAction<string>>;
  setChartColor?: any;
  titleColor: string;
  chartColor: any;
  incommingTitleColor: string;
  incommingChartColor: string;
}) => {
  const popover = usePopover();

  const { id } = useParams();

  const applyQueryColor = async () => {
    try {
      const response = await updateQueryColors({
        chartColor: chartColor?.[0],
        queryId,
        titleColor,
        dashboardId: Number(id),
      });

      toast.success(response.message);
      //  fetcDashboardInfo();
      return response;
    } catch (error) {
      toast.error(error);
    }
    return null;
  };

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
            incommingTitleColor={incommingTitleColor}
            label="Title color"
            selectedColor={titleColor}
            setTitleColor={setTitleColor}
          />
          <ChartColorPicker
            label="Chart Color"
            incommingChartColor={incommingChartColor}
            setChartColor={setChartColor}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button sx={{ width: 'fit-content', fontWeight: '500' }} variant="contained">
            Reset
          </Button>
          <Button
            sx={{ width: 'fit-content', fontWeight: '500' }}
            onClick={() => {
              applyQueryColor();
              popover.onClose();
            }}
            variant="contained"
          >
            Apply
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Properties;
