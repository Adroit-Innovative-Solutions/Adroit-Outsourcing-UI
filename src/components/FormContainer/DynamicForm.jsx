import React from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomButton } from "../ui/Button/CustomButton";

// ICON IMPORTS
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
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

// ICON MAP
const iconMap = {
  Person: <PersonIcon />,
  Email: <EmailIcon />,
  School: <SchoolIcon />,
  LocationOn: <LocationOnIcon />,
  Phone: <PhoneIcon />,
  Smartphone: <SmartphoneIcon />,
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
};

const DynamicForm = ({
  config,
  onSubmit,
  title,
  initialValues = {},
  onCancel, // optional
}) => {
  const theme = useTheme();

  const generatedInitialValues = {};
  const validationSchema = {};

  const allFields = config.flatMap((section) => section.fields);
  allFields.forEach((field) => {
    if (initialValues[field.name] !== undefined) {
      generatedInitialValues[field.name] = field.multiple
        ? [...initialValues[field.name]]
        : initialValues[field.name];
    } else {
      generatedInitialValues[field.name] = field.multiple ? [""] : "";
    }

    if (field.required) {
      validationSchema[field.name] = field.multiple
        ? Yup.array().of(Yup.string().required("Required"))
        : Yup.string().required("Required");
    }
  });

  const formik = useFormik({
    initialValues: generatedInitialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit,
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

    switch (field.type) {
      case "text":
      case "link":
        return (
          <TextField
            fullWidth
            name={fieldName}
            label={field.label}
            type={field.type === "link" ? "url" : "text"}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched[field.name] &&
                (field.multiple
                  ? formik.errors[field.name]?.[index]
                  : formik.errors[field.name])
            )}
            helperText={
              formik.touched[field.name] &&
              (field.multiple
                ? formik.errors[field.name]?.[index]
                : formik.errors[field.name])
            }
            InputProps={inputProps}
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
            error={Boolean(
              formik.touched[field.name] &&
                (field.multiple
                  ? formik.errors[field.name]?.[index]
                  : formik.errors[field.name])
            )}
            helperText={
              formik.touched[field.name] &&
              (field.multiple
                ? formik.errors[field.name]?.[index]
                : formik.errors[field.name])
            }
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
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            error={Boolean(
              formik.touched[field.name] && formik.errors[field.name]
            )}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
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
            error={Boolean(
              formik.touched[field.name] && formik.errors[field.name]
            )}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
            InputProps={inputProps}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
        maxWidth: 1200,
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
                  {field.multiple ? (
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
            Submit
          </CustomButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default DynamicForm;
