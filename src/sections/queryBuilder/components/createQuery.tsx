import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Alert, Stack, Button, MenuItem, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { getDatabase } from 'src/sections/dbConnections/api/actions';

import { runAQuery, createQuery } from '../api/actions';

import type { QueryResponse } from '../api/actions';

type QueryInfoType = {
  closeForm: () => void;
};

const CreateQuery = ({ closeForm }: QueryInfoType) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '65vh',
    bgcolor: 'white',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '4%',
  };

  const EneterQuerySchemaSchema = zod.object({
    name: zod.string().min(1, { message: 'Name is required!' }),
    query: zod.string().min(1, { message: 'Please enter query name!' }),
    outputType: zod.string().min(1, 'Output is required'),
    databaseId: zod.number().min(1, { message: 'Database selection is required!' }).nullable(),
    charts: zod.string().nullable(),
  });

  type EnterQuerySchemaType = zod.infer<typeof EneterQuerySchemaSchema>;

  const methods = useForm<EnterQuerySchemaType>({
    resolver: zodResolver(EneterQuerySchemaSchema),
    defaultValues: {
      name: '',
      query: '',
      outputType: '',
      databaseId: null,
      charts: null,
    },
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [databases, setDatabases] = useState<any[]>([]);
  const [queryId, setQueryId] = useState<number>(0);

  const { handleSubmit, setValue, watch } = methods;

  const values = watch();
  // Save query
  const saveQuery = async (data: any) => {
    const queryDetails = {
      name: data.name,
      query: data.query,
      outputType: data.outputType,
      databaseId: data.databaseId,
      selectedChart: data?.charts ?? null,
    };

    try {
      setIsSaving(true);
      setIsRunning(true);
      const response: QueryResponse = await createQuery(queryDetails);
      setQueryId(response?.id);
      console.log(response, 'response');
      setIsDisabled(false);

      setSuccessMsg('YOour Query is saved');
    } catch (error) {
      setErrorMsg(error);
    } finally {
      setIsSaving(false);
      setIsRunning(false);
    }
  };
  // Select database
  async function selectDatabase() {
    const data = await getDatabase();
    return data;
  }

  useEffect(() => {
    selectDatabase().then((data) => {
      setDatabases(data.databases);
    });
  }, []);
  // Run Query
  async function runQuery() {
    try {
      await runAQuery(queryId);
    } catch (error) {
      setErrorMsg(error);
    }
  }

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (successMsg || errorMsg) {
      const clearResponce = setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
      return () => clearTimeout(clearResponce);
    }
  });

  return (
    <Form methods={methods}>
      {!!successMsg && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Stack
        sx={{
          ...style,
        }}
      >
        <Stack
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          sx={{ marginBottom: 2 }}
        >
          <Typography variant="h4" sx={{ color: '#2E5077', marginBottom: '20px' }}>
            Enter Query
          </Typography>
          <Button onClick={closeForm} style={{ borderRadius: '50%' }}>
            <Iconify icon="ic:baseline-close" />
          </Button>
        </Stack>
        <Stack direction="row" gap={3}>
          <Field.Text required name="name" label="Query Name" sx={{ marginBottom: '15px' }} />

          <Field.Select name="outputType" label="Output Type" sx={{ marginBottom: '15px' }}>
            <MenuItem value="tabular">Tabular</MenuItem>
            <MenuItem value="descriptive">Descriptive</MenuItem>
            <MenuItem value="charts">Charts</MenuItem>
          </Field.Select>
        </Stack>
        <Stack direction="row" gap={3}>
          <Field.Autocomplete
            label="Select your database"
            name="databaseId"
            options={databases}
            getOptionLabel={(option) => option.connectionName || ''}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            value={databases.find((db) => db.id === watch('databaseId')) || null}
            onChange={(_, newValue) => {
              setValue('databaseId', newValue ? newValue.id : null);
            }}
            sx={{ width: '100%', marginBottom: '15px' }}
          />

          {values.outputType === 'charts' && (
            <Field.Select name="charts" label="Select Charts" sx={{ width: '100%' }}>
              <MenuItem value="Bar Chart">Bar Chart</MenuItem>
              <MenuItem value="Line Chart">Line Chart</MenuItem>
              <MenuItem value="Pie Chart">Pie Chart</MenuItem>
              <MenuItem value="Bubble Chart">Bubble Chart</MenuItem>
              <MenuItem value="Doughnut Chart">Doughnut Chart</MenuItem>
              <MenuItem value="Scatter Chart">Scatter Chart</MenuItem>
              <MenuItem value="Stacked Bar Chart">Stacked Bar Chart</MenuItem>
            </Field.Select>
          )}
        </Stack>

        <Field.Text
          required
          name="query"
          label="Enter your query..."
          minRows={2}
          multiline
          sx={{ marginBottom: '15px' }}
        />

        <Stack flexDirection="row" gap={5} justifyContent="center">
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
            loading={isSaving}
            type="button"
            onClick={handleSubmit((data) => saveQuery(data))}
            loadingPosition="start"
          >
            Save Query
          </LoadingButton>

          <LoadingButton
            variant="outlined"
            fullWidth
            color="inherit"
            size="large"
            disabled={isDisabled}
            loading={isRunning}
            type="button"
            onClick={handleSubmit(() => runQuery())}
            loadingPosition="start"
          >
            Run query
          </LoadingButton>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CreateQuery;
