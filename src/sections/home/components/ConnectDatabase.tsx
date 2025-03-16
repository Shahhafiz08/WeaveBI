import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Stack,
  Alert,
  Button,
  MenuItem,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { testDatabase, connectDatabase } from '../api/actions';

type DatabaseInfoType = {
  closeForm: () => void;
};

const DatabaseInfo = ({ closeForm }: DatabaseInfoType) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    heigh: '70vh',
    bgcolor: 'white',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: '4%',
  };

  const DatabaseinfoSchemaSchema = zod.object({
    connectionName: zod.string().min(1, { message: 'Name is required!' }),
    name: zod.string().min(1, { message: 'Database is required!' }),
    username: zod.string().min(1, 'Username is required'),
    password: zod.string().min(1, { message: 'Password is required!' }),
    host: zod.string().min(1, 'Host Is required'),
    port: zod.number().min(1, 'Port Is required'),
    provider: zod.string().min(1, 'Please select a provider'),
    description: zod.string().min(1, 'Please select a provider'),
  });

  type DatabaseinfoSchemaType = zod.infer<typeof DatabaseinfoSchemaSchema>;

  const methods = useForm<DatabaseinfoSchemaType>({
    resolver: zodResolver(DatabaseinfoSchemaSchema),
  });

  const { handleSubmit } = methods;

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const password = useBoolean();
  const [isDisabled, setIsDisabled] = useState(false);

  const saveDatabase = async (data: any, actionType: 'save' | 'test') => {
    try {
      const dbDetails = {
        connectionName: data.name,
        provider: data.provider,
        description: data.description,
        name: data.name,
        host: data.host,
        password: data.password,
        port: data.port,
        username: data.username,
      };

      if (actionType === 'save') {
        setIsSaving(true);
        await connectDatabase(dbDetails);
        setSuccessMsg('Database Connected Successfully');
        setIsDisabled(true);
        setTimeout(() => {
          closeForm();
          setIsDisabled(false);
        }, 1000);
        setErrorMsg('');
        return;
      }

      setIsTesting(true);
      await testDatabase(dbDetails);
      setSuccessMsg('Connection to database is "OK"');
      setErrorMsg('');
    } catch (error: any) {
      setSuccessMsg('');
      setErrorMsg(error.message || 'An error occurred.');
    } finally {
      setIsSaving(false);
      setIsTesting(false);
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

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

      <Stack sx={{ ...style }}>
        <Stack direction="row" justifyContent="space-between" sx={{ marginBototm: 20 }}>
          <Typography variant="h4" sx={{ color: '#2E5077', marginBottom: '20px' }}>
            Create DataBase
          </Typography>
          <Button sx={{ borderRadius: '50%', widht: '50%', padding: 0 }} onClick={closeForm}>
            <Iconify icon="ic:baseline-close" />
          </Button>
        </Stack>

        <Field.Text name="connectionName" label="Connection Name" sx={{ marginBottom: '15px' }} />
        <Field.Text name="description" label="Descripton" sx={{ marginBottom: '15px' }} />

        <Stack>
          <Field.Select name="provider" label="Database Povider" sx={{ marginBottom: '15px' }}>
            <MenuItem value="mysql">MySQL</MenuItem>
            <MenuItem value="postgres">Postgres</MenuItem>
            <MenuItem value="oracledb">Oracle</MenuItem>
            <MenuItem value="mariadb">MariaDB</MenuItem>
          </Field.Select>
        </Stack>

        <Stack flexDirection="row" gap={5} justifyContent="space-between">
          <Field.Text name="username" required label="Username" sx={{ marginBottom: '15px' }} />
          <Field.Text
            sx={{ marginBottom: '20px' }}
            name="password"
            required
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Field.Text name="name" required label="Database Name" sx={{ marginBottom: '15px' }} />

        <Stack flexDirection="row" gap={5} justifyContent="space-between">
          <Field.Text name="host" required label="Host" fullWidth sx={{ marginBottom: '15px' }} />
          <Field.Text
            name="port"
            type="number"
            required
            fullWidth
            label="Port"
            sx={{ marginBottom: '15px' }}
          />
        </Stack>

        <Stack flexDirection="row" gap={5} justifyContent="center">
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
            disabled={isDisabled}
            loading={isSaving}
            type="button"
            onClick={handleSubmit((data) => saveDatabase(data, 'save'))}
            loadingPosition="start"
          >
            Save Database
          </LoadingButton>

          <LoadingButton
            variant="outlined"
            fullWidth
            color="inherit"
            size="large"
            loading={isTesting}
            type="button"
            onClick={handleSubmit((data) => saveDatabase(data, 'test'))}
            loadingPosition="start"
          >
            Test Connection
          </LoadingButton>
        </Stack>
      </Stack>
    </Form>
  );
};

export default DatabaseInfo;
