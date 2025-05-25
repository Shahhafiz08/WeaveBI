import React from 'react';
import Markdown from 'markdown-to-jsx';

import {
  Box,
  Button,
  Switch,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import type { Query } from '../types/inference';

export const Insights = ({
  query,
  insights,
  loading,
  showInsights,
}: {
  query: Query;
  insights: string;
  loading: boolean;
  showInsights: (browseOnline?: boolean, addInstructions?: string) => Promise<null>;
}) => {
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [isHidden, setIsHidden] = React.useState<string>('none');
  const [addInstructions, setAddInstructions] = React.useState<boolean>(true);
  const [customInstructions, setCustomInstructions] = React.useState<string>('');
  const [browseOnline, setBrowseOnline] = React.useState<boolean>(false);

  const handleIsDisabled = (val: boolean) => {
    setIsDisabled(() => val);
    if (val) {
      setCustomInstructions('');
    }
  };

  const handleIsHidden = () => {
    setAddInstructions((prev) => !prev);

    if (addInstructions === false) {
      setIsHidden('none');
    } else {
      setIsHidden('flex');
    }
    return null;
  };
  const handleBrowseOnline = () => {
    setBrowseOnline((prev) => !prev);
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
        <div>
          <Iconify
            icon="material-symbols:info-outline-rounded"
            sx={{ marginRight: '5px', fontWeight: '600' }}
          />
        </div>
        <div> Insights</div>
      </div>
      <Typography style={{ fontWeight: 500, fontSize: '1.1rem' }}>{query.name}</Typography>
      <Box
        sx={{
          borderRadius: '10px',
          height: '200px',
          overflowY: 'scroll',
          position: 'relative',
          alignItems: 'top',
          padding: '20px',
          backgroundColor: '#F4F6F8',
          fontWeight: 500,
        }}
      >
        {loading ? (
          <CircularProgress sx={{ position: 'absolute', top: '40%', left: '45%' }} size="40px" />
        ) : (
          <Markdown style={{ padding: '10px' }}>{insights}</Markdown>
        )}
      </Box>
      <FormControlLabel
        onChange={() => {
          handleIsHidden();
        }}
        control={<Switch name="" />}
        label="Add instructions"
      />
      <div
        style={{
          padding: '0  10px',
          display: ` ${isHidden}`,
          gap: '10px',
          flexDirection: 'column',
        }}
      >
        <FormControlLabel
          onChange={() => {
            handleBrowseOnline();
          }}
          control={<Checkbox name="" />}
          label="Browse Online"
        />
        <FormControlLabel
          onChange={(_, val) => {
            handleIsDisabled(!val);
          }}
          control={<Checkbox name="" />}
          label="Add custom Instructions"
        />
        <TextField
          onChange={(e) => {
            setCustomInstructions(e.target.value);
          }}
          disabled={isDisabled}
          name="query"
          fullWidth
          label="Enter your instructions "
          minRows={4}
          value={customInstructions}
          multiline
        />
        <Button
          onClick={() => {
            showInsights(browseOnline, customInstructions);
          }}
          sx={{ width: 'fit-content', fontWeight: '500' }}
          variant="contained"
        >
          Generate New Insights
        </Button>
      </div>
    </Box>
  );
};
