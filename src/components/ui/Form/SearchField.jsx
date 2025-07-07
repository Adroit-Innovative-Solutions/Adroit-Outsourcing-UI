import React, { useState, useEffect } from 'react';
import { CustomInput } from '../Input/CustomInput';
import { Search } from '@mui/icons-material';

export const SearchField = ({
  placeholder = 'Search...',
  onSearch,
  debounceMs = 300,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <CustomInput
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      startIcon={<Search />}
      {...props}
    />
  );
};
