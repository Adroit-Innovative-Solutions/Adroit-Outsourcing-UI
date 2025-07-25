import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  useTheme,
  Paper,
  InputAdornment,
  Chip,
  Select,
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { CustomButton } from "../ui/Button/CustomButton";
import PhoneInput from "../ui/Input/PhoneInput"; // Import the PhoneInput component

// ICON IMPORTS
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GroupIcon from "@mui/icons-material/Group";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AdjustIcon from "@mui/icons-material/Adjust";
import PublicIcon from "@mui/icons-material/Public";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GavelIcon from "@mui/icons-material/Gavel";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CodeIcon from "@mui/icons-material/Code";
import TimelineIcon from "@mui/icons-material/Timeline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import CommentIcon from "@mui/icons-material/Comment";
import WcIcon from "@mui/icons-material/Wc";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DialpadIcon from "@mui/icons-material/Dialpad";

// ICON MAP
const iconMap = {
  id: <DialpadIcon />,
  Lock: <LockIcon />,
  Person: <PersonIcon />,
  Email: <EmailIcon />,
  AlternateEmail: <AlternateEmailIcon />,
  School: <SchoolIcon />,
  LocationOn: <LocationOnIcon />,
  Phone: <PhoneIcon />,
  Smartphone: <SmartphoneIcon />,
  PhoneAndroid: <PhoneAndroidIcon />,
  LinkedIn: <LinkedInIcon />,
  Group: <GroupIcon />,
  PersonSearch: <PersonSearchIcon />,
  SupervisorAccount: <SupervisorAccountIcon />,
  BusinessCenter: <BusinessCenterIcon />,
  Adjust: <AdjustIcon />,
  Public: <PublicIcon />,
  TravelExplore: <TravelExploreIcon />,
  VerifiedUser: <VerifiedUserIcon />,
  Gavel: <GavelIcon />,
  CompareArrows: <CompareArrowsIcon />,
  Code: <CodeIcon />,
  Timeline: <TimelineIcon />,
  CalendarToday: <CalendarTodayIcon />,
  EditCalendar: <EditCalendarIcon />,
  Event: <EventIcon />,
  AttachMoney: <AttachMoneyIcon />,
  RequestQuote: <RequestQuoteIcon />,
  Comment: <CommentIcon />,
  Wc: <WcIcon />,
  CalendarMonth: <CalendarMonthIcon />,
  EventAvailable: <EventAvailableIcon />,
  Badge: <BadgeIcon />,
  AssignmentInd: <AssignmentIndIcon />,
  ToggleOn: <ToggleOnIcon />,
  UploadFile: <UploadFileIcon />,
  AttachFile: <AttachFileIcon />,
};

const DynamicForm = ({
  config,
  onSubmit,
  title,
  initialValues = {},
  onCancel, // optional
  submitButtonText, 
}) => {
  const theme = useTheme();

  // State for managing country codes for phone fields
  const [countryCodes, setCountryCodes] = useState({});

  const generatedInitialValues = {};
  const validationSchema = {};

  const allFields = config.flatMap((section) => section.fields);
  allFields.forEach((field) => {
    if (initialValues[field.name] !== undefined) {
      generatedInitialValues[field.name] = field.multiple
        ? [...initialValues[field.name]]
        : initialValues[field.name];
    } else {
      if (field.type === "multiselect") {
        generatedInitialValues[field.name] = [];
      } else {
        generatedInitialValues[field.name] = field.multiple ? [""] : "";
      }
    }

    // Initialize country code for phone fields
    if (field.type === "phone") {
      if (!countryCodes[field.name]) {
        setCountryCodes((prev) => ({
          ...prev,
          [field.name]: "+91", // Default to India
        }));
      }
    }

    if (field.required) {
      if (field.type === "multiselect") {
        validationSchema[field.name] = Yup.array()
          .min(1, "At least one option must be selected")
          .required("Required");
      } else if (field.type === "file") {
        validationSchema[field.name] = field.multiple
          ? Yup.array()
              .min(1, "At least one file must be selected")
              .required("Required")
          : Yup.mixed().required("A file is required");
      } else {
        validationSchema[field.name] = field.multiple
          ? Yup.array().of(Yup.string().required("Required"))
          : Yup.string().required("Required");
      }
    }

    // Add email validation for email fields
    if (field.type === "email") {
      const baseValidation = Yup.string().email("Invalid email format");
      validationSchema[field.name] = field.required
        ? baseValidation.required("Required")
        : baseValidation;
    }

    if (field.type === "password") {
      const baseValidation = Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      validationSchema[field.name] = field.required
        ? baseValidation.required("Required")
        : baseValidation;
    }

    if (field.type === "file") {
      generatedInitialValues[field.name] = field.multiple ? [] : null;
    }

    // Add phone validation for phone fields
    if (field.type === "phone") {
      const baseValidation = Yup.string().min(
        10,
        "Phone number must be at least 10 digits"
      );
      validationSchema[field.name] = field.required
        ? baseValidation.required("Required")
        : baseValidation;
    }

    // Add file size validation
    if (field.type === "file" && field.maxSize) {
      const maxSizeInBytes = field.maxSize * 1024 * 1024; // Convert MB to bytes
      if (field.multiple) {
        validationSchema[field.name] = Yup.array().of(
          Yup.mixed().test(
            "fileSize",
            `File size must be less than ${field.maxSize}MB`,
            (value) => !value || value.size <= maxSizeInBytes
          )
        );
      } else {
        validationSchema[field.name] = Yup.mixed().test(
          "fileSize",
          `File size must be less than ${field.maxSize}MB`,
          (value) => !value || value.size <= maxSizeInBytes
        );
      }
    }
  });

  const formik = useFormik({
    initialValues: generatedInitialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      const transformedValues = { ...values };

      allFields.forEach((field) => {
        // 📞 Add country code to phone numbers
        if (field.type === "phone" && values[field.name]) {
          const countryCode = countryCodes[field.name] || "+91";
          const phoneNumber = values[field.name].replace(/\s/g, "");
          transformedValues[field.name] = `${countryCode}${phoneNumber}`;
        }

        // 📎 Convert files to base64 or keep as is for preview or further upload
        if (field.type === "file" && values[field.name]) {
          if (field.multiple) {
            transformedValues[field.name] = values[field.name].map((file) =>
              typeof file === "string" ? file : file.name
            );
          } else {
            transformedValues[field.name] =
              typeof values[field.name] === "string"
                ? values[field.name]
                : values[field.name]?.name;
          }
        }
      });

      onSubmit(transformedValues);
    },

    enableReinitialize: true,
  });

  const handleAddMore = (name) => {
    formik.setFieldValue(name, [...formik.values[name], ""]);
  };

  const handleRemove = (name, index) => {
    const list = [...formik.values[name]];
    list.splice(index, 1);
    formik.setFieldValue(name, list);
  };

  const handleCountryCodeChange = (fieldName, newCountryCode) => {
    setCountryCodes((prev) => ({
      ...prev,
      [fieldName]: newCountryCode,
    }));
  };

  const handleFileRemove = (fieldName, fileIndex = null) => {
    const field = allFields.find((f) => f.name === fieldName);
    if (field?.multiple && fileIndex !== null) {
      const currentFiles = [...formik.values[fieldName]];
      currentFiles.splice(fileIndex, 1);
      formik.setFieldValue(fieldName, currentFiles);
    } else {
      formik.setFieldValue(fieldName, field?.multiple ? [] : null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderField = (field, value, index = null) => {
    const fieldName = index !== null ? `${field.name}[${index}]` : field.name;
    const icon = field.icon ? iconMap[field.icon] : null;
    const inputProps = icon
      ? {
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }
      : {};

    const getError = () => {
      if (field.multiple && index !== null) {
        return formik.touched[field.name] && formik.errors[field.name]?.[index];
      }
      return formik.touched[field.name] && formik.errors[field.name];
    };

    const error = getError();

    switch (field.type) {
      case "text":
      case "link":
      case "email":
        return (
          <TextField
            fullWidth
            name={fieldName}
            label={field.label}
            type={
              field.type === "link"
                ? "url"
                : field.type === "email"
                ? "email"
                : "text"
            }
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(error)}
            helperText={error}
            InputProps={inputProps}
          />
        );
      case "password":
        return (
          <TextField
            fullWidth
            name={fieldName}
            label={field.label}
            type="password"
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(error)}
            helperText={error}
            InputProps={inputProps}
            autoComplete="new-password"
          />
        );

      case "phone":
        return (
          <PhoneInput
            label={field.label}
            name={fieldName}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={error}
            required={field.required}
            countryCode={countryCodes[field.name] || "+91"}
            setCountryCode={(newCode) =>
              handleCountryCodeChange(field.name, newCode)
            }
          />
        );

      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            name={fieldName}
            label={field.label}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(error)}
            helperText={error}
            InputProps={inputProps}
          />
        );

      case "date":
        return (
          <TextField
            fullWidth
            name={fieldName}
            label={field.label}
            type="date"
            value={value || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            error={Boolean(error)}
            helperText={error}
            InputProps={inputProps}
          />
        );

      case "select":
        return (
          <TextField
            fullWidth
            select
            name={field.name}
            label={field.label}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(error)}
            helperText={error}
            InputProps={inputProps}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case "file":
        return (
          <Box>
            {/* Hidden File Input */}
            <input
              id={fieldName}
              name={fieldName}
              type="file"
              multiple={field.multiple}
              onChange={(event) => {
                const files = event.currentTarget.files;
                if (files && files.length > 0) {
                  formik.setFieldValue(
                    field.name,
                    field.multiple ? Array.from(files) : files[0]
                  );
                }
              }}
              onBlur={formik.handleBlur}
              accept={field.accept || "*"}
              style={{ display: "none" }}
            />

            {/* Link-style Upload Trigger */}
            <label htmlFor={fieldName}>
              <Typography
                component="span"
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: "primary.main",
                  textDecoration: "underline",
                  display: "inline-block",
                  mb: 1,
                }}
              >
                {field.multiple ? "Upload Files" : "Upload File"}
              </Typography>
            </label>

            {/* File Acceptance Info */}
            {field.accept && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mb: 1, display: "block" }}
              >
                Accepted formats: {field.accept}
              </Typography>
            )}

            {/* File Size Info */}
            {field.maxSize && (
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mb: 1, display: "block" }}
              >
                Max size: {field.maxSize}MB per file
              </Typography>
            )}

            {/* Preview Selected Files */}
            {formik.values[field.name] && (
              <Box mt={1}>
                {field.multiple
                  ? formik.values[field.name]?.map((file, idx) => (
                      <Chip
                        key={idx}
                        label={`${file?.name} ${
                          file?.size ? `(${formatFileSize(file.size)})` : ""
                        }`}
                        variant="outlined"
                        size="small"
                        onDelete={() => handleFileRemove(field.name, idx)}
                        sx={{ mr: 1, mb: 1, maxWidth: "300px" }}
                      />
                    ))
                  : formik.values[field.name]?.name && (
                      <Chip
                        label={`${formik.values[field.name]?.name} ${
                          formik.values[field.name]?.size
                            ? `(${formatFileSize(
                                formik.values[field.name].size
                              )})`
                            : ""
                        }`}
                        variant="outlined"
                        size="small"
                        onDelete={() => handleFileRemove(field.name)}
                        sx={{ maxWidth: "300px" }}
                      />
                    )}
              </Box>
            )}

            {/* Error Text */}
            {error && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 0.5, display: "block" }}
              >
                {error}
              </Typography>
            )}
          </Box>
        );

      case "multiselect":
        return (
          <FormControl fullWidth error={Boolean(error)}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              name={field.name}
              value={value || []}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              input={<OutlinedInput label={field.label} />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((val) => {
                    const option = field.options?.find(
                      (opt) => opt.value === val
                    );
                    return (
                      <Chip
                        key={val}
                        label={option?.label || val}
                        size="small"
                      />
                    );
                  })}
                </Box>
              )}
              startAdornment={
                icon && <InputAdornment position="start">{icon}</InputAdornment>
              }
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },

        mx: "auto",
        my: 4,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 400,
            color: theme.palette.primary.main,
            borderLeft: `6px solid ${theme.palette.primary.main}`,
            pl: 2,
            py: 1,
            backgroundColor: theme.palette.background.default,
            borderRadius: 1,
            letterSpacing: 0.5,
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
        >
          {title}
        </Typography>

        {config.map((section, sectionIndex) => (
          <Box key={section.section || sectionIndex} sx={{ mb: 5 }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                color: theme.palette.text.secondary,
              }}
            >
              {section.section}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              {section.fields.map((field) => (
                <Box
                  key={field.name}
                  sx={{
                    flex: "1 1 300px",
                    minWidth: "250px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {field.multiple && field.type !== "file" ? (
                    <>
                      {formik.values[field.name]?.map((val, idx) => (
                        <Box
                          key={`${field.name}-${idx}`}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {renderField(field, val, idx)}
                          <IconButton
                            color="error"
                            onClick={() => handleRemove(field.name, idx)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                      <CustomButton
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddMore(field.name)}
                      >
                        Add More
                      </CustomButton>
                    </>
                  ) : (
                    renderField(field, formik.values[field.name])
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))}

        <Box textAlign="right" display="flex" justifyContent="flex-end" gap={2}>
          {onCancel && (
            <CustomButton
              variant="outlined"
              color="secondary"
              onClick={onCancel}
            >
              Cancel
            </CustomButton>
          )}

          <CustomButton
            variant="outlined"
            color="primary"
            onClick={() => formik.resetForm()}
            disabled={formik.isSubmitting}
          >
            Reset
          </CustomButton>

          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            loading={formik.isSubmitting}
          >
            {submitButtonText}
          </CustomButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default DynamicForm;
