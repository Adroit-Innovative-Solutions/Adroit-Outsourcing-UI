// components/support/SupportForm.jsx
import React from "react";
import { Box } from "@mui/material";
import * as Yup from "yup";
import FormGenerator from "../components/FormContainer/FormGenerator1";

const SupportForm = () => {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },
    {
      name: "issueType",
      label: "Issue Type",
      type: "select",
      required: true,
      options: [
        { label: "Bug Report", value: "bug" },
        { label: "Feature Request", value: "feature" },
        { label: "Account Issue", value: "account" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "message",
      label: "Issue Description",
      type: "textarea",
      rows: 4,
      required: true,
      gridSize: { xs: 12, sm: 6, md: 12 },
    },
    {
      name: "screenshot",
      label: "Upload Screenshot (Optional)",
      type: "file",
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    issueType: Yup.string().required("Please select an issue type"),
    message: Yup.string().required("Please describe the issue"),
    screenshot: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("Support Issue Submitted:", values);
    alert("Your support request has been submitted!");
    resetForm();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <FormGenerator
        fields={fields}
        onSubmit={handleSubmit}
        title="Support Request"
        subtitle="Submit an issue and our team will assist you shortly."
        submitText="Send Request"
        validationSchema={validationSchema}
      />
    </Box>
  );
};

export default SupportForm;
