import { z as zod } from 'zod';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import { Chip, Stack, Button, Typography, IconButton } from '@mui/material';

import { primary } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { getDashboardResponse } from 'src/sections/home/api/actions';
import { selectDatabase } from 'src/sections/queryBuilder/api/actions';

import { createDashboard } from '../api/action';
import { Abc } from '../context/dashbord-context';

import type { createDashboardType } from '../types/types';

type SetupDashboardprops = {
  onClose: () => void;
};

const SetupDashboard = ({ onClose }: SetupDashboardprops) => {
  const DashboardSchema = zod.object({
    name: zod.string().min(1, { message: 'Name is required!' }),
    description: zod.string().min(1, 'Output is required'),
    databaseId: zod.number().min(1, { message: 'Database selection is required!' }),
    tagArray: zod
      .array(zod.string())
      .max(3, "Can't add more that 3 tags")
      .refine((val) => val.length > 0, {
        message: 'Please add at least one tag',
      }),
  });

  type DashboardType = zod.infer<typeof DashboardSchema>;

  const methods = useForm<DashboardType>({
    resolver: zodResolver(DashboardSchema),
    defaultValues: {
      name: '',
      description: '',
      databaseId: 0,
      tagArray: [],
    },
  });

  const { handleSubmit, setValue, getValues, watch, formState } = methods;
  const { errors } = formState;
  const { setIsDashboard, isDashboard } = Abc();

  const istag = watch('tagArray') || [];
  const [tag, setTag] = useState('');
  const [databases, setDatabases] = useState<any[]>([]);

  const handleAddTag = () => {
    const currentTags = getValues('tagArray') || [];
    const trimmedTag = tag.trim();
    if (!trimmedTag || currentTags.includes(trimmedTag)) return;

    if (currentTags.length >= 3) {
      return;
    }
    const newTags = [...currentTags, trimmedTag];
    setValue('tagArray', newTags, { shouldValidate: true });
    setTag('');
  };

  const addDahboard = useCallback(
    async ({ name, description, databaseId, tags }: createDashboardType) => {
      try {
        const response = await createDashboard({ name, description, databaseId, tags });
        await getDashboardResponse();
        console.log('dsssdsdds', response);
        toast.success(response.message);
        setIsDashboard((prev) => !prev);
      } catch (error) {
        toast.error(error);
      }
    },
    [setIsDashboard]
  );
  console.log(isDashboard);

  useEffect(() => {
    selectDatabase().then((data) => {
      setDatabases(data.databases);
    });
    getDashboardResponse();
  }, []);

  return (
    <div
      style={{
        background: 'white',
        width: '400px',
        maxWidth: '600px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '16px',
        padding: '20px',
      }}
    >
      <Stack
        justifyContent="space-between"
        display="flex"
        flexDirection="row"
        sx={{ marginBottom: 2, padding: '10px' }}
        borderBottom="2px solid 	#F0F0F0 "
      >
        <Typography variant="h6" color={primary.main} sx={{ fontWeight: '500' }}>
          Setup Your Dashboard
        </Typography>
        <IconButton onClick={onClose}>
          <Iconify icon="ic:baseline-close" />
        </IconButton>
      </Stack>

      <Form methods={methods}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
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

          <Field.Text required name="name" label="Dashboard Name" sx={{ marginBottom: '15px' }} />
          <Field.Text
            required
            name="description"
            label="Dashboard Description"
            sx={{ marginBottom: '15px' }}
          />

          <Stack direction="row" justifyContent="space-between" width="100%">
            <Field.Text
              name="dummyTag" // not used by Zod
              label="Dashboard Tags"
              sx={{ width: '50%', height: '100%' }}
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              disabled={watch('tagArray')?.length >= 3}
            />
            <Button sx={{ height: '50px' }} variant="contained" onClick={handleAddTag}>
              Add
            </Button>
          </Stack>

          {errors.tagArray && (
            <Typography variant="caption" color="error" sx={{ alignSelf: 'flex-start', mt: 1 }}>
              {errors.tagArray.message}
            </Typography>
          )}

          <Stack marginTop={2} width="100%" direction="row" flexWrap="wrap">
            {istag.map((item) => (
              <Chip
                key={item}
                size="small"
                label={item}
                sx={{
                  padding: 2,
                  fontWeight: 'normal',
                  fontFamily: 'poppins',
                  marginRight: '4px',
                  marginBottom: '4px',
                  backgroundColor: 'grey',
                }}
              />
            ))}
          </Stack>

          <LoadingButton
            style={{ width: 'fit-content', marginTop: '20px' }}
            variant="contained"
            onClick={handleSubmit((data) => {
              // console.log(data);
              addDahboard({
                databaseId: data.databaseId,
                description: data.description,
                name: data.name,
                tags: data.tagArray,
              });
              onClose();
            })}
          >
            Create
          </LoadingButton>
        </div>
      </Form>
    </div>
  );
};

export default SetupDashboard;
