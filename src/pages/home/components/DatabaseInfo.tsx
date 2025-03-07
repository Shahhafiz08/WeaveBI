import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { databaseInfo } from '../api/action';

const DatabaseInfo = () => {
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

  type DatabaseinfoSchemaType = Zod.infer<typeof DatabaseinfoSchemaSchema>;
  const methods = useForm<DatabaseinfoSchemaType>({
    resolver: zodResolver(DatabaseinfoSchemaSchema),
  });
  const { handleSubmit } = methods;
  const [errorMsg, setErrorMsg] = useState('');

  const saveDatabase = handleSubmit(async (data) => {
    try {
      databaseInfo({
        connectionName: data.name,
        provider: data.provider,
        description: data.description,
        name: data.name,
        host: data.host,
        password: data.password,
        port: data.port,
        username: data.username,
      });
    } catch (error) {
      setErrorMsg(error.message);
      console.log('Error in form ', errorMsg);
    }
  });
  const password = useBoolean();
  const renderDatabaseInfo = (
    <Stack sx={{ ...style }}>
      <Typography variant="h4" sx={{ color: '#2E5077', marginBottom: '20px' }}>
        {' '}
        Create DataBase
      </Typography>
      <Field.Text name="connectionName" label="Connection Name" sx={{ marginBottom: '15px' }} />
      <Field.Text name="description" label="Descripton" sx={{ marginBottom: '15px' }} />
      <Stack>
        <Field.Select name="provider" label="DB Provider" sx={{ marginBottom: '15px' }}>
          <MenuItem value="mysql">MySQL</MenuItem>
          <MenuItem value="postgres">Postgres</MenuItem>
          <MenuItem value="oracledb">Oracle</MenuItem>
          <MenuItem value="mariadb">MariaDB</MenuItem>
          <MenuItem value="mysql">MySQL</MenuItem>
        </Field.Select>
      </Stack>
      <Stack
        flexDirection="row"
        gap={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Field.Text name="username" required label="Username" sx={{ marginBottom: '15px' }} />
        <Field.Text
          //  helperText={errorMsg}
          sx={{ marginBottom: '20px' }}
          name="password"
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

      <Stack
        flexDirection="row"
        gap={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Field.Text
          name="host"
          required
          label="Host"
          fullWidth
          sx={{ marginBottom: '15px', direction: 'column' }}
        />
        <Field.Text
          name="port"
          type="number"
          required
          fullWidth
          label="Port"
          sx={{ marginBottom: '15px', display: 'inline' }}
        />
      </Stack>
      <Stack flexDirection="row" gap={5} display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" type="submit" sx={{ paddingX: '15px', paddingY: '13px' }}>
          Save Database
        </Button>
        <Button
          variant="outlined"
          onSubmit={saveDatabase}
          sx={{ paddingX: '15px', paddingY: '13px' }}
        >
          Test Connection
        </Button>
      </Stack>
    </Stack>
  );
  return (
    <Form methods={methods} onSubmit={saveDatabase}>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {renderDatabaseInfo}
    </Form>
  );
};

export default DatabaseInfo;
