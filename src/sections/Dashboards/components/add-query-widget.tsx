import { useState } from 'react';
import { z, z as zod } from 'zod';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, MenuItem, Typography, FormControl } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

import { addQuery, getDashboardInfo, linkQueryToDashbord } from '../api/actions';

const AddWidgetSchema = zod.object({
  queryTitle: zod
    .string()
    .min(1, 'Enter a valid query title')
    .max(300, 'Query should be less than 300 characters'),
  query: zod.string().min(1, 'Enter a valid query'),
  limit: zod
    .number({ invalid_type_error: 'Output limit is required' })
    .min(1, 'Set an output limit')
    .max(20, 'Max limit is 20'),
  outputType: zod.string().min(1, 'Select the output type'),
  charts: zod.string().min(0, 'Please enter a valid value').or(z.literal('')),
});

type AddWidgetFormValues = zod.infer<typeof AddWidgetSchema>;

const AddQueryWidget = ({ fetchDashboardInfo }: { fetchDashboardInfo: () => void }) => {
  const { id } = useParams();
  const [checkChart, setCheckChart] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let chartType = '';
  const methods = useForm<AddWidgetFormValues>({
    resolver: zodResolver(AddWidgetSchema),
    defaultValues: {
      queryTitle: '',
      query: '',
      limit: 1,
      outputType: '',
      charts: '',
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = async (data: AddWidgetFormValues) => {
    try {
      if (data.outputType === 'charts') {
        chartType = data.charts;
      } else if (data.outputType !== 'chart') {
        chartType = data.outputType;
      }
      setIsLoading(true);
      const response = await addQuery({
        databaseId: 12,
        name: data.queryTitle,
        outputType: chartType,
        query: data.query,
      });

      toast.success(`${response.message} to the dashboard`);
      reset();
      await linkQueryToDashbord({ queryId: response.queryId, dashboardId: Number(id) });
      await getDashboardInfo(Number(id));
      fetchDashboardInfo();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight="500">
        Create Query
      </Typography>

      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormControl size="small" fullWidth>
          <Field.Text
            name="queryTitle"
            label="Query Title"
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Field.Text
            name="query"
            label="Enter your query..."
            minRows={2}
            multiline
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Field.Text
            name="limit"
            label="Output Limit"
            type="number"
            size="small"
            inputProps={{ min: 1, max: 20 }}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <Field.Select
            name="outputType"
            label="Output Type"
            onChange={(e) => {
              setCheckChart(e.target.value);
              setValue('outputType', e.target.value);
            }}
            size="small"
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            <MenuItem value="tabular">Tabular</MenuItem>
            <MenuItem value="descriptive">Descriptive</MenuItem>
            <MenuItem value="singleValue">Single Value</MenuItem>
            <MenuItem value="charts">Charts</MenuItem>
          </Field.Select>

          {checkChart === 'charts' && (
            <Field.Select
              name="charts"
              label="Select Charts"
              size="small"
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="Bar Chart">Bar Chart</MenuItem>
              <MenuItem value="Line Chart">Line Chart</MenuItem>
              <MenuItem value="Pie Chart">Pie Chart</MenuItem>
              <MenuItem value="Doughnut Chart">Doughnut Chart</MenuItem>
              <MenuItem value="Scatter Chart">Scatter Chart</MenuItem>
              <MenuItem value="Stacked Chart">Stacked Bar Chart</MenuItem>
            </Field.Select>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton loading={isLoading} variant="contained" type="submit">
              Run
            </LoadingButton>
          </Box>
        </FormControl>
      </Form>
    </Stack>
  );
};

export default AddQueryWidget;
