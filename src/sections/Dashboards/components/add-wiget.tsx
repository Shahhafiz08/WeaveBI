import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Paper, Button, TextField, Typography, IconButton } from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

const BottomSheet = () => {
  const addWegit = zod.object({
    limit: zod.number().min(1, 'Set an output limit'),
    query: zod.string().min(1, 'Enter a valid query'),
    connectionName: zod.string().min(1, 'Enter a valid query'),
  });
  type addWedgitSchema = zod.infer<typeof addWegit>;
  const methods = useForm<addWedgitSchema>({
    resolver: zodResolver(addWegit),
    defaultValues: {
      limit: 0,
      query: '',
      connectionName: '',
    },
  });
  return (
    <Box
      id="query-section"
      sx={{
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '100px',
        height: '40vh',
        width: '100%',
      }}
    >
      <Paper
        elevation={3}
        id="outer-div"
        sx={{
          padding: '10px 25px',
          borderRadius: '20px',
          border: '2px solid rgb(239, 237, 237)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'centre',
          gap: 2,
          position: 'absolute',
          width: '88%',
        }}
      >
        {/* Drag Handle */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            id="dragable"
            sx={{
              width: 100,
              height: 5,
              borderRadius: 20,
              backgroundColor: '#ccc',
              cursor: 'grab',
              '&:hover': { backgroundColor: '#797875' },
            }}
          />
        </Box>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="title" sx={{ fontSize: '1.1 rem' }}>
            Create Query
          </Typography>
          <IconButton sx={{ padding: '0' }} id="cross">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form and Output */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5%' }}>
          {/* Left: Form */}
          <Box
            className="form-side"
            sx={{
              p: 2,
              borderRadius: 2,
              border: '2px solid rgb(239, 237, 237)',
              width: '50%',
            }}
          >
            <Form methods={methods}>
              <TextField
                fullWidth
                label="Connection Name"
                id="connection-name"
                variant="outlined"
                margin="normal"
              />

              {/* <Typography sx={{ fontSize: '1rem', mt: 2, mb: 1 }}>Query Description</Typography> */}
              <Field.Text
                required
                name="query"
                label="Enter your query..."
                minRows={2}
                multiline
                sx={{ marginBottom: '15px' }}
              />

              <TextField
                id="limit"
                label="Limit"
                type="number"
                inputProps={{ min: 1, max: 20 }}
                sx={{ mt: 2, width: 100 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    width: 100,
                    height: 50,
                    backgroundColor: '#193e6d',
                    borderRadius: '15px',
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  Run
                </Button>
              </Box>
            </Form>
          </Box>

          {/* Right: Output */}
          <Box
            className="output-side"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10%',
              width: '60%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                {['charts.svg', 'table.svg', 'text.svg'].map((icon, i) => (
                  <Box
                    key={i}
                    className="outputs"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontSize: 25,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      className="output-icons"
                      src={`/icons/${icon}`}
                      alt={icon.split('.')[0]}
                      style={{ width: 30 }}
                    />
                    {icon.split('.')[0].charAt(0).toUpperCase() + icon.split('.')[0].slice(1)}
                  </Box>
                ))}
              </Box>

              <Box sx={{ width: 20 }}>
                <img src="/icons/elipse.svg" alt="" style={{ cursor: 'pointer' }} />
              </Box>
            </Box>

            <Box
              className="chart"
              sx={{
                border: '2px solid rgb(188, 184, 184)',
                height: 350,
                width: '100%',
              }}
            >
              chart
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BottomSheet;
