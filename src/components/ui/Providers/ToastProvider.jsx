// src/components/CustomToaster.tsx
import { Toaster } from 'react-hot-toast';
import { CheckCircle, Error, Info, HourglassEmpty } from '@mui/icons-material';

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 4000,
        success: {
          icon: <CheckCircle style={{ color: '#2e7d32' }} />,
          style: {
            border: '1px solid #c8e6c9',
            padding: '12px 16px',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
        error: {
          icon: <Error style={{ color: '#d32f2f' }} />,
          style: {
            border: '1px solid #ffcdd2',
            padding: '12px 16px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
        loading: {
          icon: <HourglassEmpty style={{ color: '#1565c0' }} />,
          style: {
            border: '1px solid #bbdefb',
            padding: '12px 16px',
            backgroundColor: '#e3f2fd',
            color: '#0d47a1',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
        blank: {
          icon: <Info style={{ color: '#0288d1' }} />,
          style: {
            border: '1px solid #b3e5fc',
            padding: '12px 16px',
            backgroundColor: '#e1f5fe',
            color: '#0277bd',
            fontWeight: 500,
            borderRadius: 8,
          },
        },
      }}
    />
  );
};

export default CustomToaster;
