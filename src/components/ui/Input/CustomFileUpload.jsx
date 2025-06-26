import React, { forwardRef, useRef } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  Typography,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export const CustomFileUpload = forwardRef(({
  label = 'Upload Document',
  accept = '.pdf,.doc,.docx',
  helperText,
  error = false,
  required = false,
  disabled = false,
  fullWidth = true,
  file,
  onChange,
  onRemove,
  maxSizeMB = 5,
}, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isValidSize = selectedFile.size / 1024 / 1024 <= maxSizeMB;
    if (!isValidSize) {
      alert(`File size should not exceed ${maxSizeMB} MB.`);
      return;
    }

    onChange?.(selectedFile);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <Box display="flex" flexDirection="column" width={fullWidth ? '100%' : 'auto'}>
      <Typography variant="body1" fontWeight={500} mb={1}>
        {label} {required && '*'}
      </Typography>

      <input
        ref={(el) => {
          inputRef.current = el;
          if (ref) typeof ref === 'function' ? ref(el) : (ref.current = el);
        }}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        hidden
        disabled={disabled}
      />

      <Box display="flex" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={handleClick}
          disabled={disabled}
        >
          {file ? 'Change File' : 'Choose File'}
        </Button>

        {file && (
          <Box>
            <Typography variant="body2">{file.name}</Typography>
            <Button size="small" color="error" onClick={onRemove}>
              Remove
            </Button>
          </Box>
        )}
      </Box>

      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </Box>
  );
});

CustomFileUpload.displayName = 'CustomFileUpload';
