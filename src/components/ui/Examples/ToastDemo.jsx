import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
} from '../../../utils/toastUtils';

const ToastDemo = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="success" onClick={() => showSuccessToast('Saved successfrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrully!')}>
        Success
      </Button>
      <Button variant="contained" color="error" onClick={() => showErrorToast('Something went wrong.')}>
        Error
      </Button>
      <Button variant="contained" color="info" onClick={() => showInfoToast('This is a neutral info.')}>
        Info
      </Button>
      <Button variant="contained" color="warning" onClick={() => showLoadingToast('Uploading...')}>
        Loading
      </Button>
    </Stack>
  );
};

export default ToastDemo;
