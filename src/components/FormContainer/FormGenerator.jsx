import React, { useState } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";

import {
  TextInput,
  EmailInput,
  PasswordInput,
  PhoneInput,
  DateInput,
  TimeInput,
  DateTimeInput,
  SelectInput,
  MultiSelectInput,
  RadioInput,
  CheckboxGroup,
  CheckboxInput,
  SwitchInput,
  SliderInput,
  RatingInput,
  AutocompleteInput,
  SearchInput,
  TextAreaInput,
} from "../ui/Form/FormComponents";

const FormGenerator = ({
  formConfig,
  onSubmit,
  onFieldChange,
  initialValues = {},
  submitButtonText = "Submit",
  title = "Dynamic Form",
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    formConfig.fields?.forEach((field) => {
      if (initialValues[field.name] !== undefined) {
        initialData[field.name] = initialValues[field.name];
      } else {
        switch (field.type) {
          case "multiselect":
          case "checkboxGroup":
            initialData[field.name] = field.defaultValue || [];
            break;
          case "checkbox":
          case "switch":
            initialData[field.name] = field.defaultValue || false;
            break;
          case "slider":
            initialData[field.name] = field.defaultValue || field.min || 0;
            break;
          case "rating":
            initialData[field.name] = field.defaultValue || 0;
            break;
          case "file":
            initialData[field.name] = null;
            break;
          default:
            initialData[field.name] = field.defaultValue || "";
        }
      }
    });
    return initialData;
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (fieldName) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }

    if (onFieldChange) {
      onFieldChange(fieldName, value, formData);
    }
  };

  const handleSpecialFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }

    if (onFieldChange) {
      onFieldChange(fieldName, value, formData);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    formConfig.fields?.forEach((field) => {
      const value = formData[field.name];
      if (field.required) {
        if (
          !value ||
          (Array.isArray(value) && value.length === 0) ||
          (field.type === "file" && value === null)
        ) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      if (field.validation && value) {
        const validationResult = field.validation(value, formData);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  // Helper function to get grid size for a field
  const getFieldGridSize = (field) => {
    // Priority: field.gridSize > formConfig.fieldGridSize > default
    const fieldGrid = field.gridSize;
    const defaultGrid = formConfig.fieldGridSize || { xs: 12, sm: 12, md: 6, lg: 4, xl: 3 };
    
    if (fieldGrid) {
      return {
        xs: fieldGrid.xs || defaultGrid.xs,
        sm: fieldGrid.sm || fieldGrid.xs || defaultGrid.sm,
        md: fieldGrid.md || fieldGrid.sm || fieldGrid.xs || defaultGrid.md,
        lg: fieldGrid.lg || fieldGrid.md || fieldGrid.sm || fieldGrid.xs || defaultGrid.lg,
        xl: fieldGrid.xl || fieldGrid.lg || fieldGrid.md || fieldGrid.sm || fieldGrid.xs || defaultGrid.xl,
      };
    }
    
    return defaultGrid;
  };

  const renderField = (field) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      value: formData[field.name],
      error: errors[field.name],
      helperText: field.helperText,
      required: field.required,
      disabled: field.disabled,
      ...field.props,
    };

    switch (field.type) {
      case "text":
        return (
          <TextInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            placeholder={field.placeholder}
            multiline={field.multiline}
            rows={field.rows}
          />
        );
      case "email":
        return (
          <EmailInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
          />
        );
      case "password":
        return (
          <PasswordInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
          />
        );
      case "phone":
        return (
          <PhoneInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
          />
        );
      case "date":
        return (
          <DateInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            min={field.min}
            max={field.max}
          />
        );
      case "time":
        return (
          <TimeInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
          />
        );
      case "datetime":
        return (
          <DateTimeInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
          />
        );
      case "select":
        return (
          <SelectInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            options={field.options || []}
          />
        );
      case "multiselect":
        return (
          <MultiSelectInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            options={field.options || []}
          />
        );
      case "radio":
        return (
          <RadioInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            options={field.options || []}
            row={field.row}
          />
        );
      case "checkboxGroup":
        return (
          <CheckboxGroup
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            options={field.options || []}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            {...commonProps}
            checked={formData[field.name]}
            onChange={(e) =>
              handleSpecialFieldChange(field.name, e.target.checked)
            }
          />
        );
      case "switch":
        return (
          <SwitchInput
            {...commonProps}
            checked={formData[field.name]}
            onChange={(e) =>
              handleSpecialFieldChange(field.name, e.target.checked)
            }
          />
        );
      case "slider":
        return (
          <SliderInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            min={field.min || 0}
            max={field.max || 100}
            step={field.step || 1}
            marks={field.marks}
          />
        );
      case "rating":
        return (
          <RatingInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            max={field.max || 5}
          />
        );
      case "autocomplete":
        return (
          <AutocompleteInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            options={field.options || []}
            multiple={field.multiple}
            freeSolo={field.freeSolo}
          />
        );
      case "search":
        return (
          <SearchInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            onSearch={field.onSearch}
            placeholder={field.placeholder}
          />
        );
      case "textarea":
        return (
          <TextAreaInput
            {...commonProps}
            onChange={handleFieldChange(field.name)}
            rows={field.rows || 3}
            placeholder={field.placeholder}
          />
        );
      case "file":
        return (
          <Box key={field.name}>
            <Typography variant="subtitle1" gutterBottom>
              {field.label} {field.required && "*"}
            </Typography>
            <input
              type="file"
              name={field.name}
              accept={field.accept || "*/*"}
              onChange={(e) =>
                handleSpecialFieldChange(field.name, e.target.files?.[0])
              }
            />
            {formData[field.name]?.name && (
              <Typography variant="body2" mt={1}>
                Selected: {formData[field.name]?.name}
              </Typography>
            )}
            {errors[field.name] && (
              <Typography color="error" variant="caption">
                {errors[field.name]}
              </Typography>
            )}
          </Box>
        );
      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  if (!formConfig || !formConfig.fields) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Invalid form configuration. Please provide a valid formConfig with
          fields array.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: formConfig.maxWidth || 800,
        mx: "auto",
        p: 3,
        backgroundColor: formConfig.bgColor || "transparent",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {formConfig.title || title}
      </Typography>

      {formConfig.description && (
        <>
          <Typography variant="body1" color="text.secondary" paragraph>
            {formConfig.description}
          </Typography>
          <Divider sx={{ mb: 3 }} />
        </>
      )}

      <Grid container spacing={formConfig.spacing || 3}>
        {formConfig.fields.map((field) => {
          const gridSize = getFieldGridSize(field);

          return (
            <Grid
              item
              xs={gridSize.xs}
              sm={gridSize.sm}
              md={gridSize.md}
              lg={gridSize.lg}
              xl={gridSize.xl}
              key={field.name}
            >
              {renderField(field)}
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 4, textAlign: formConfig.submitButtonAlign || "center" }}>
        <Button
          variant={formConfig.submitButtonVariant || "contained"}
          size={formConfig.submitButtonSize || "large"}
          onClick={handleSubmit}
          color={formConfig.submitButtonColor || "primary"}
          disabled={formConfig.submitDisabled}
        >
          {formConfig.submitButtonText || submitButtonText}
        </Button>
      </Box>
    </Box>
  );
};

export default FormGenerator;