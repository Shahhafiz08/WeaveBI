import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Stack, Button, MenuItem, TextField, Typography, FormControl } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

const AddQueryWidget = () => {
  const addWegit = zod.object({
    limit: zod.number().min(1, 'Set an output limit'),
    query: zod.string().min(1, 'Enter a valid query'),
    Querytitle: zod
      .string()
      .min(1, 'Enter a valid query')
      .max(300, 'Query should be less than 300 Characters'),
    outputType: zod.string().min(1, 'Select the output type '),
  });
  type addWedgitSchema = zod.infer<typeof addWegit>;
  const [checkChart, setCheckChart] = useState('');
  const methods = useForm<addWedgitSchema>({
    resolver: zodResolver(addWegit),
    defaultValues: {
      limit: 0,
      query: '',
      outputType: '',
    },
  });

  return (
    <Stack paddingRight={3}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight="500">
          Create Query
        </Typography>
      </div>
      <Form methods={methods}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Query Title"
            id="Query Title "
            variant="outlined"
            margin="normal"
            sx={{ marginBottom: '15px' }}
          />

          <Field.Text
            fullWidth
            required
            name="query"
            label="Enter your query..."
            minRows={2}
            multiline
            sx={{ marginBottom: '15px' }}
          />

          <TextField
            id="limit"
            label="Output pLimit"
            type="number"
            inputProps={{ min: 1, max: 20 }}
            sx={{ width: 120, marginBottom: '15px' }}
          />

          <Field.Select
            name="outputType"
            label="Output Type"
            onChange={(e) => {
              setCheckChart(e.target.value);
            }}
            sx={{ marginBottom: '15px' }}
          >
            <MenuItem value="tabular">Tabular</MenuItem>
            <MenuItem value="descriptive">Descriptive</MenuItem>
            <MenuItem value="charts">Charts</MenuItem>
          </Field.Select>
          {checkChart === 'charts' && (
            <Field.Select name="charts" label="Select Charts" sx={{ width: '100%' }}>
              <MenuItem value="Bar Chart">Bar Chart</MenuItem>
              <MenuItem value="Line Chart">Line Chart</MenuItem>
              <MenuItem value="Pie Chart">Pie Chart</MenuItem>
              <MenuItem value="Doughnut Chart">Doughnut Chart</MenuItem>
              <MenuItem value="Scatter Chart">Scatter Chart</MenuItem>
              <MenuItem value="Stacked Bar Chart">Stacked Bar Chart</MenuItem>
            </Field.Select>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
            <Button variant="contained">Run</Button>
          </Box>
        </FormControl>
      </Form>
    </Stack>
  );
};

export default AddQueryWidget;
