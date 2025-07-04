import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import FormGenerator from './FormGenerator'; // Adjust import path as needed

const FormGeneratorSample = () => {
  const [submitResults, setSubmitResults] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Sample Form Configuration 1: User Registration
  const userRegistrationConfig = {
    title: "User Registration Form",
    description: "Create your account by filling out the form below. All fields marked with * are required.",
    maxWidth: 900,
    spacing: 3,
    submitButtonText: "Create Account",
    submitButtonAlign: "center",
    submitButtonVariant: "contained",
    submitButtonColor: "primary",
    fields: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        required: true,
        gridSize: { xs: 12, md: 6 },
        placeholder: "Enter your first name",
        validation: (value) => {
          return value.length >= 2 || "First name must be at least 2 characters";
        }
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        required: true,
        gridSize: { xs: 12, md: 6 },
        placeholder: "Enter your last name",
        validation: (value) => {
          return value.length >= 2 || "Last name must be at least 2 characters";
        }
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        required: true,
        gridSize: { xs: 12 },
        helperText: "We'll never share your email with anyone else",
        validation: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value) || "Please enter a valid email address";
        }
      },
      {
        name: "password",
        type: "password",
        label: "Password",
        required: true,
        gridSize: { xs: 12, md: 6 },
        validation: (value) => {
          if (value.length < 8) return "Password must be at least 8 characters long";
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
          }
          return true;
        }
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        required: true,
        gridSize: { xs: 12, md: 6 },
        validation: (value, formData) => {
          return value === formData.password || "Passwords do not match";
        }
      },
      {
        name: "phone",
        type: "phone",
        label: "Phone Number",
        gridSize: { xs: 12, md: 6 },
        helperText: "Optional - for account recovery"
      },
      {
        name: "birthDate",
        type: "date",
        label: "Date of Birth",
        required: true,
        gridSize: { xs: 12, md: 6 },
        max: new Date().toISOString().split('T')[0], // Can't be future date
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        required: true,
        gridSize: { xs: 12, md: 6 },
        options: [
          { value: "us", label: "United States" },
          { value: "ca", label: "Canada" },
          { value: "uk", label: "United Kingdom" },
          { value: "au", label: "Australia" },
          { value: "de", label: "Germany" },
          { value: "fr", label: "France" },
          { value: "in", label: "India" },
          { value: "jp", label: "Japan" }
        ]
      },
      {
        name: "gender",
        type: "radio",
        label: "Gender",
        gridSize: { xs: 12, md: 6 },
        row: true,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "prefer-not-to-say", label: "Prefer not to say" }
        ]
      },
      {
        name: "interests",
        type: "multiselect",
        label: "Interests",
        gridSize: { xs: 12 },
        helperText: "Select all that apply",
        options: [
          { value: "technology", label: "Technology" },
          { value: "sports", label: "Sports" },
          { value: "music", label: "Music" },
          { value: "travel", label: "Travel" },
          { value: "cooking", label: "Cooking" },
          { value: "reading", label: "Reading" },
          { value: "gaming", label: "Gaming" },
          { value: "fitness", label: "Fitness" }
        ]
      },
      {
        name: "bio",
        type: "textarea",
        label: "About You",
        gridSize: { xs: 12 },
        placeholder: "Tell us a bit about yourself...",
        rows: 4,
        helperText: "Optional - share anything you'd like us to know"
      },
      {
        name: "newsletter",
        type: "checkbox",
        label: "Subscribe to our newsletter for updates and special offers",
        gridSize: { xs: 12 },
        defaultValue: true
      },
      {
        name: "terms",
        type: "checkbox",
        label: "I agree to the Terms of Service and Privacy Policy",
        required: true,
        gridSize: { xs: 12 }
      }
    ]
  };

  // Sample Form Configuration 2: Product Feedback
  const productFeedbackConfig = {
    title: "Product Feedback Survey",
    description: "Help us improve our product by sharing your experience",
    spacing: 2,
    submitButtonText: "Submit Feedback",
    submitButtonColor: "secondary",
    fields: [
      {
        name: "productName",
        type: "autocomplete",
        label: "Product Name",
        required: true,
        gridSize: { xs: 12, md: 12 },
        freeSolo: true,
        options: [
          "Product A",
          "Product B", 
          "Product C",
          "Product D",
          "Product E"
        ]
      },
      {
        name: "overallRating",
        type: "rating",
        label: "Overall Rating",
        required: true,
        gridSize: { xs: 12, md: 6 },
        max: 5
      },
      {
        name: "recommendationScore",
        type: "slider",
        label: "How likely are you to recommend this product? (0-10)",
        required: true,
        gridSize: { xs: 12, md: 6 },
        min: 0,
        max: 10,
        step: 1,
        marks: true,
        defaultValue: 5
      },
      {
        name: "usageFrequency",
        type: "radio",
        label: "How often do you use this product?",
        required: true,
        gridSize: { xs: 12 },
        options: [
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "rarely", label: "Rarely" }
        ]
      },
      {
        name: "features",
        type: "checkboxGroup",
        label: "Which features do you find most useful?",
        gridSize: { xs: 12 },
        options: [
          { value: "ease-of-use", label: "Ease of Use" },
          { value: "performance", label: "Performance" },
          { value: "design", label: "Design" },
          { value: "reliability", label: "Reliability" },
          { value: "support", label: "Customer Support" }
        ]
      },
      {
        name: "improvements",
        type: "textarea",
        label: "What improvements would you suggest?",
        gridSize: { xs: 12 },
        rows: 4,
        placeholder: "Share your suggestions for improvement..."
      },
      {
        name: "additionalComments",
        type: "textarea",
        label: "Additional Comments",
        gridSize: { xs: 12 },
        rows: 3,
        placeholder: "Any other feedback you'd like to share..."
      },
      {
        name: "followUp",
        type: "switch",
        label: "I'm open to follow-up questions about my feedback",
        gridSize: { xs: 12 }
      }
    ]
  };

  // Sample Form Configuration 3: Event Registration
  const eventRegistrationConfig = {
    title: "Event Registration",
    description: "Register for our upcoming conference",
    maxWidth: 800,
    submitButtonText: "Register Now",
    submitButtonVariant: "contained",
    fields: [
      {
        name: "attendeeName",
        type: "text",
        label: "Full Name",
        required: true,
        gridSize: { xs: 12, md: 6 }
      },
      {
        name: "company",
        type: "text",
        label: "Company/Organization",
        gridSize: { xs: 12, md: 6 }
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        required: true,
        gridSize: { xs: 12, md: 6 }
      },
      {
        name: "phone",
        type: "phone",
        label: "Phone Number",
        required: true,
        gridSize: { xs: 12, md: 6 }
      },
      {
        name: "eventDate",
        type: "date",
        label: "Preferred Event Date",
        required: true,
        gridSize: { xs: 12, md: 6 },
        min: new Date().toISOString().split('T')[0]
      },
      {
        name: "eventTime",
        type: "time",
        label: "Preferred Time",
        gridSize: { xs: 12, md: 6 },
        defaultValue: "09:00"
      },
      {
        name: "ticketType",
        type: "select",
        label: "Ticket Type",
        required: true,
        gridSize: { xs: 12, md: 6 },
        options: [
          { value: "early-bird", label: "Early Bird - $99" },
          { value: "regular", label: "Regular - $149" },
          { value: "vip", label: "VIP - $299" },
          { value: "student", label: "Student - $49" }
        ]
      },
      {
        name: "sessions",
        type: "multiselect",
        label: "Sessions of Interest",
        gridSize: { xs: 12 },
        options: [
          { value: "keynote", label: "Keynote Presentation" },
          { value: "tech-trends", label: "Technology Trends" },
          { value: "networking", label: "Networking Session" },
          { value: "workshops", label: "Hands-on Workshops" },
          { value: "panel", label: "Expert Panel Discussion" }
        ]
      },
      {
        name: "dietaryRestrictions",
        type: "textarea",
        label: "Dietary Restrictions/Allergies",
        gridSize: { xs: 12 },
        rows: 2,
        placeholder: "Please list any dietary restrictions or allergies..."
      },
      {
        name: "marketingEmails",
        type: "checkbox",
        label: "I'd like to receive marketing emails about future events",
        gridSize: { xs: 12 }
      }
    ]
  };

  const handleFormSubmit = (formData, formType) => {
    console.log(`${formType} Form Submitted:`, formData);
    const newResult = { type: formType, data: formData, timestamp: new Date().toISOString() };
    setSubmitResults(prev => [newResult, ...prev.slice(0, 4)]); // Keep last 5 submissions
    setLastSubmitted(formType);
    setShowAlert(true);
  };

  const handleFieldChange = (fieldName, value, allData) => {
    console.log(`Field ${fieldName} changed to:`, value);
    // You can add custom logic here, like dependent field updates
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom align="center">
        FormGenerator Sample Components
      </Typography>
      
      <Typography variant="body1" paragraph align="center" color="text.secondary">
        Here are three different examples showing how to use the FormGenerator component 
        with various field types and configurations.
      </Typography>

      {/* User Registration Form */}
      <Card sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          <FormGenerator
            formConfig={userRegistrationConfig}
            onSubmit={(data) => handleFormSubmit(data, "User Registration")}
            onFieldChange={handleFieldChange}
            initialValues={{
              newsletter: true
            }}
          />
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Product Feedback Form */}
      <Card sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          <FormGenerator
            formConfig={productFeedbackConfig}
            onSubmit={(data) => handleFormSubmit(data, "Product Feedback")}
            onFieldChange={handleFieldChange}
            initialValues={{
              followUp: false,
              recommendationScore: 5
            }}
          />
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Event Registration Form */}
      <Card sx={{ mt: 4, mb: 4 }}>
        <CardContent>
          <FormGenerator
            formConfig={eventRegistrationConfig}
            onSubmit={(data) => handleFormSubmit(data, "Event Registration")}
            onFieldChange={handleFieldChange}
            initialValues={{
              marketingEmails: true,
              eventTime: "09:00"
            }}
          />
        </CardContent>
      </Card>

      {/* Success/Result Display */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {lastSubmitted} form submitted successfully! Check console for details.
        </Alert>
      </Snackbar>

      {/* Form Data Display */}
      {submitResults.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Form Submissions:
            </Typography>
            {submitResults.map((result, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {result.type} - {new Date(result.timestamp).toLocaleString()}
                </Typography>
                <Box 
                  component="pre" 
                  sx={{ 
                    bgcolor: 'grey.100', 
                    p: 2, 
                    borderRadius: 1, 
                    overflow: 'auto',
                    fontSize: '0.875rem',
                    maxHeight: '300px'
                  }}
                >
                  {JSON.stringify(result.data, null, 2)}
                </Box>
                {index < submitResults.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FormGeneratorSample;

// Additional Example Configuration (can be used separately)
export const advancedFormConfig = {
  title: "Advanced Form Example",
  description: "Demonstrates all available field types and features",
  fields: [
    {
      name: "search",
      type: "search",
      label: "Search",
      gridSize: { xs: 12 },
      placeholder: "Search for something...",
      onSearch: (value) => console.log("Searching for:", value)
    },
    {
      name: "datetime",
      type: "datetime",
      label: "Date and Time",
      gridSize: { xs: 12, md: 6 }
    },
    {
      name: "multiAutoComplete",
      type: "autocomplete",
      label: "Multiple Autocomplete",
      multiple: true,
      gridSize: { xs: 12, md: 6 },
      options: ["Option 1", "Option 2", "Option 3", "Option 4"]
    }
  ]
};