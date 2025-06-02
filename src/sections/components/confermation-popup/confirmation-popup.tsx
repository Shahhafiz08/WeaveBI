import React from 'react';

import { Button, IconButton, Typography } from '@mui/material';

import { primary } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';

import exclamation from '../../../assets/home/exclamation.svg';

type props = {
  handleAPICall: (id: number) => void;
  handleClose: () => void;
  actionDescripton: string;
  buttonText: string;
  id?: number;
};

const ConfimationPopup = ({
  handleAPICall,
  handleClose,
  id,
  actionDescripton,
  buttonText,
}: props) => (
  <div
    style={{
      display: 'flex',
      top: '40%',
      left: '40%',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <div
      style={{
        background: 'white',
        position: 'relative',
        padding: 20,
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '200px',
        borderRadius: '15px',
        borderTop: '4px solid #193E6D',
        alignItems: 'center',
      }}
    >
      <IconButton onClick={handleClose} style={{ position: 'absolute', top: '2%', right: '1%' }}>
        <Iconify icon="ic:baseline-close" />
      </IconButton>
      <Typography variant="h4" color={primary.main}>
        Are you sure?
      </Typography>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '10%',
        }}
      >
        <div style={{ width: '50px', height: '50px' }}>
          <img src={exclamation} alt="exclamaion" />
        </div>

        <Typography variant="subtitle1" width="75%" fontWeight="500" fontFamily="poppins">
          {actionDescripton}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Button
          style={{ fontWeight: '500' }}
          variant="contained"
          onClick={() => {
            if (id) {
              handleAPICall(id);
            }

            handleClose();
          }}
        >
          {buttonText}
        </Button>
        <Button style={{ fontWeight: '500' }} variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  </div>
);

export default ConfimationPopup;
