import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import CustomPopover from '../components/ui/Display/CustomPopover';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Submitted:\n${JSON.stringify(formData, null, 2)}`);
      setFormData({ name: '', email: '' });
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '' });
    setErrors({});
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 3,
        mt: 5,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <CustomPopover>
          <Typography variant="subtitle1" gutterBottom>
            Quick Actions
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Button fullWidth size="small" onClick={handleReset}>
            Reset Form
          </Button>
          <Button
            fullWidth
            size="small"
            color="error"
            onClick={() => setErrors({ email: 'Manual error!' })}
          >
            Trigger Error
          </Button>
        </CustomPopover>
      </Box>

      <Typography variant="h5" mb={2} fontWeight="bold">
        Simple Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
          />

          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SimpleForm;


