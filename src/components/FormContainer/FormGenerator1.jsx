import React from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
  Alert,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Clear as ClearIcon,
  CloudUpload as CloudUploadIcon,
  Description as FileIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomButton } from "../ui/Button/CustomButton";
import { useTheme } from "@mui/material/styles"; // ✅ Import useTheme

const getLabelWithAsterisk = (field) => (
  <>
    {field.label}
    {field.required && <span style={{ color: "red" }}> *</span>}
  </>
);

const renderField = (field, formik, theme) => {
  const handleClear = () => {
    formik.setFieldValue(field.name, field.type === "checkbox" ? false : "");
  };

  const hasError =
    formik.touched[field.name] && Boolean(formik.errors[field.name]);
  const errorMessage = formik.touched[field.name] && formik.errors[field.name];

  const valuePreview =
    !["checkbox", "file", "password"].includes(field.type) &&
    formik.values[field.name] ? (
      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          color: "text.secondary",
          display: "block",
          fontFamily: theme.typography.fontFamily, // ✅ theme font
        }}
      >
        You entered: {formik.values[field.name]?.toString()}
      </Typography>
    ) : null;

  const commonProps = {
    name: field.name,
    label: getLabelWithAsterisk(field),
    value: formik.values[field.name] || "",
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    error: hasError,
    helperText: errorMessage,
    size: "medium",
    variant: "outlined",
    sx: {
      fontFamily: theme.typography.fontFamily, // ✅ Apply theme font
    },
  };

  const clearButton = formik.values[field.name] ? (
    <InputAdornment position="end">
      <IconButton onClick={handleClear} size="small" edge="end">
        <ClearIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  ) : null;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
      return (
        <>
          <TextField
            type={field.type}
            {...commonProps}
            InputProps={{ endAdornment: clearButton }}
            placeholder={field.placeholder}
          />
          {valuePreview}
        </>
      );

    case "password":
      return (
        <TextField
          type="password"
          {...commonProps}
          InputProps={{ endAdornment: clearButton }}
          placeholder={field.placeholder}
        />
      );

    case "select":
      return (
        <>
          <TextField
            select
            {...commonProps}
            sx={{ minWidth: 200, fontFamily: theme.typography.fontFamily }}
            InputProps={{ endAdornment: clearButton }}
          >
            {field.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          {valuePreview}
        </>
      );

    case "checkbox":
      return (
        <Box sx={{ fontFamily: theme.typography.fontFamily }}>
          <FormControlLabel
            control={
              <Checkbox
                name={field.name}
                checked={Boolean(formik.values[field.name])}
                onChange={formik.handleChange}
              />
            }
            label={
              <Typography variant="body2">
                {getLabelWithAsterisk(field)}
              </Typography>
            }
          />
          {hasError && (
            <Typography variant="caption" color="error" sx={{ ml: 4 }}>
              <ErrorIcon
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              {errorMessage}
            </Typography>
          )}
        </Box>
      );

    case "date":
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={getLabelWithAsterisk(field)}
            value={formik.values[field.name] || null}
            onChange={(val) => formik.setFieldValue(field.name, val)}
            shouldDisableDate={field.shouldDisableDate}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  fullWidth
                  error={hasError}
                  helperText={errorMessage}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Stack direction="row" spacing={0}>
                        {params.InputProps?.endAdornment}
                        {formik.values[field.name] && (
                          <IconButton onClick={handleClear} size="small">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>
                    ),
                  }}
                />
                {valuePreview}
              </>
            )}
          />
        </LocalizationProvider>
      );

    case "time":
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label={getLabelWithAsterisk(field)}
            value={formik.values[field.name] || null}
            onChange={(val) => formik.setFieldValue(field.name, val)}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  fullWidth
                  error={hasError}
                  helperText={errorMessage}
                />
                {valuePreview}
              </>
            )}
          />
        </LocalizationProvider>
      );

    case "datetime":
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label={getLabelWithAsterisk(field)}
            value={formik.values[field.name] || null}
            onChange={(val) => formik.setFieldValue(field.name, val)}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  fullWidth
                  error={hasError}
                  helperText={errorMessage}
                />
                {valuePreview}
              </>
            )}
          />
        </LocalizationProvider>
      );

    case "file":
      return (
        <Box sx={{ fontFamily: theme.typography.fontFamily }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {getLabelWithAsterisk(field)}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <CloudUploadIcon color="action" />
            <label htmlFor={`upload-${field.name}`}>
              <Typography
                component="span"
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Click here to upload a file
              </Typography>
              <input
                hidden
                id={`upload-${field.name}`}
                type="file"
                accept={field.accept || "*"}
                onChange={(e) =>
                  formik.setFieldValue(field.name, e.target.files[0])
                }
              />
            </label>
            {formik.values[field.name] && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <FileIcon fontSize="small" color="success" />
                <Typography variant="body2">
                  {formik.values[field.name].name}
                </Typography>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => formik.setFieldValue(field.name, null)}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </Stack>
            )}
          </Box>
          {hasError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              <Typography variant="caption">{errorMessage}</Typography>
            </Alert>
          )}
        </Box>
      );

    case "textarea":
      return (
        <TextField
          multiline
          rows={field.rows || 4}
          {...commonProps}
          InputProps={{ endAdornment: clearButton }}
          placeholder={field.placeholder}
        />
      );

    default:
      return null;
  }
};

const generateValidationSchema = (fields) => {
  const shape = {};
  fields.forEach((field) => {
    let validator;

    switch (field.type) {
      case "email":
        validator = Yup.string().email("Invalid email");
        break;
      case "number":
        validator = Yup.number().typeError("Must be a number").nullable();
        break;
      case "checkbox":
        validator = Yup.boolean();
        if (field.required) validator = validator.oneOf([true], "Required");
        break;
      case "file":
        validator = Yup.mixed().nullable();
        if (field.required) validator = validator.required("File is required");
        break;
      case "date":
      case "time":
      case "datetime":
        validator = Yup.date().nullable().typeError("Invalid date");
        break;
      default:
        validator = Yup.string().trim();
    }

    if (field.required && field.type !== "checkbox") {
      validator = validator.required(`${field.label} is required`);
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};

const getGridSize = (field) => {
  if (["file", "textarea"].includes(field.type)) return { xs: 12 };
  if (field.gridSize) return field.gridSize;
  return { xs: 12, sm: 6, md: 6, lg: 4, xl: 4 };
};

const FormGenerator = ({
  fields,
  initialValues = {},
  onSubmit,
  title = "Form",
  subtitle = "",
  submitText = "Submit",
  loading = false,
  validationSchema: externalValidationSchema,
}) => {
  const theme = useTheme(); // ✅ Initialize useTheme
  const formik = useFormik({
    initialValues: fields.reduce((acc, field) => {
      acc[field.name] =
        initialValues[field.name] !== undefined
          ? initialValues[field.name]
          : field.type === "checkbox"
          ? false
          : "";
      return acc;
    }, {}),
    validationSchema:
      externalValidationSchema || generateValidationSchema(fields),
    onSubmit,
  });

  return (
    <Box sx={{ p: 4, fontFamily: theme.typography.fontFamily }}>
      <Box
        mb={4}
        p={2}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 2,
          borderLeft: "6px solid",
          borderColor: "primary.main",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            color: "primary.main",
            mb: 0.5,
            fontFamily: "Space Grotesk", // ✅ Use theme font
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: theme.typography.fontFamily }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid key={field.name} item {...getGridSize(field)}>
              {renderField(field, formik, theme)}
            </Grid>
          ))}

          <Grid item xs={12}>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <CustomButton
                type="button"
                color="primary"
                variant="outlined"
                onClick={formik.handleReset}
              >
                Reset
              </CustomButton>
              <CustomButton type="submit" loading={loading}>
                {submitText}
              </CustomButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormGenerator;
