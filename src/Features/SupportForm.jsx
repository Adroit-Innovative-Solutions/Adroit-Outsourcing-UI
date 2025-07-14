import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
} from "@mui/material";

const categories = ["UI", "Backend", "Performance", "Security", "Other"];
const severities = ["Low", "Medium", "High"];

const BugReportForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    severity: "",
    steps: "",
    expected: "",
    actual: "",
    screenshot: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) form.append(key, val);
    });

    try {
      const res = await fetch("http://your-api.com/bug-report", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Error submitting bug");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Bug submission failed.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary.main">
        Report a Bug
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        <TextField
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel>Severity</InputLabel>
          <Select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            label="Severity"
          >
            {severities.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Steps to Reproduce"
        name="steps"
        value={formData.steps}
        onChange={handleChange}
        multiline
        rows={3}
        required
        fullWidth
      />

      <TextField
        label="Expected Behavior"
        name="expected"
        value={formData.expected}
        onChange={handleChange}
        multiline
        rows={2}
        required
        fullWidth
      />

      <TextField
        label="Actual Behavior"
        name="actual"
        value={formData.actual}
        onChange={handleChange}
        multiline
        rows={2}
        required
        fullWidth
      />

      <Box>
        <Button variant="outlined" component="label">
          Upload Screenshot (optional)
          <input
            type="file"
            hidden
            name="screenshot"
            accept="image/*"
            onChange={handleChange}
          />
        </Button>

        {formData.screenshot && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Preview:
            </Typography>
            <Box
              component="img"
              src={URL.createObjectURL(formData.screenshot)}
              alt="Screenshot"
              sx={{
                maxWidth: 300,
                mt: 1,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        type="submit"
        size="large"
        sx={{ mt: 2 }}
        color="primary"
      >
        Submit Bug
      </Button>

      {submitted && (
        <Typography color="success.main" mt={2}>
          ✅ Your bug report has been submitted!
        </Typography>
      )}
    </Box>
  );
};

export default BugReportForm;
