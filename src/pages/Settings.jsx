import React from "react";
import { Box } from "@mui/system";
import * as Yup from "yup";
import FormGenerator from "../components/FormContainer/FormGenerator1";

const Settings = () => {
  const today = new Date();

  const fields = [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "text", required: true },
    {
      name: "birthDate",
      label: "Date of Birth",
      type: "date",
      required: true,
      shouldDisableDate: (date) => date > today,
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
      options: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "uk", label: "United Kingdom" },
        { value: "in", label: "India" },
      ],
    },
    {
      name: "resume",
      label: "Upload Resume",
      type: "file",
      required: true,
      accept: ".pdf,.doc,.docx",
    },
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      rows: 4,
    },
    {
      name: "newsletter",
      label: "Subscribe to newsletter",
      type: "checkbox",
    },
    {
      name: "terms",
      label: "I agree to the terms and conditions",
      type: "checkbox",
      required: true,
    },
  ];

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    birthDate: Yup.date()
      .max(today, "Birth date cannot be in the future")
      .required("Required"),
    country: Yup.string().required("Required"),
    resume: Yup.mixed().required("Resume is required"),
    bio: Yup.string().max(500, "Max 500 characters"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Box sx={{ p: 3, bgcolor: "grey.50", minHeight: "100vh" }}>
      <FormGenerator
        fields={fields}
        onSubmit={handleSubmit}
        title="Application Form"
        subtitle="Please fill out all required fields to complete your application."
        submitText="Submit Application"
        validationSchema={validationSchema}
      />
    </Box>
  );
};

export default Settings;
