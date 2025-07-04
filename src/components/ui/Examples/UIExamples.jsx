import React, { useState } from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import {
  CustomButton,
  CustomCard,
  CustomInput,
  CustomModal,
  CustomAlert,
  LoadingSpinner,
  CustomDataTable,
  FormField,
  SearchField,
  CustomBreadcrumb,
  CustomTabs,
  PageHeader,
  Section,
  StatusChip,
  EmptyState,
} from "../index";
import { useUI } from "../Providers/UIProvider";
import { Add, Edit, Delete, Person, Email, Search } from "@mui/icons-material";
import ExampleUsage from "../MultiStepForm/CustomStepperForm";
import Example from "../../FormContainer/StepperFormGenerator";

export const UIExamples = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const { notification, confirmDialog } = useUI();

  // Sample data for table
  const tableColumns = [
    {
      key: "name",
      label: "Name",
      minWidth: 170,
      filterable: true,
      filterType: "text",
    },
    {
      key: "email",
      label: "Email",
      minWidth: 200,
      filterable: true,
      filterType: "text",
    },
    {
      key: "status",
      label: "Status",
      minWidth: 100,
      render: (value) => (
        <StatusChip label={value} status={value.toLowerCase()} />
      ),
    },
    {
      key: "date",
      label: "Date",
      minWidth: 150,
      filterable: true,
      filterType: "date",
    },
  ];

  const tableData = [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      date: "2024-01-15",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Pending",
      date: "2024-01-16",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "Inactive",
      date: "2024-01-17",
    },
  ];

  const breadcrumbItems = [
    { label: "Components", path: "/components" },
    { label: "UI Examples", path: "/components/examples" },
  ];

  const tabs = [
    { label: "Overview", icon: <Person /> },
    { label: "Settings", badge: 2 },
    { label: "History" },
  ];

  const handleDeleteClick = () => {
    confirmDialog.showConfirmDialog({
      title: "Delete Item",
      message:
        "Are you sure you want to delete this item? This action cannot be undone.",
      type: "error",
      onConfirm: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        notification.showSuccess("Item deleted successfully!");
      },
    });
  };

  return (
    <Box p={3}>
      <PageHeader
        title="UI Component Library"
        subtitle="A comprehensive set of reusable components built with MUI"
        breadcrumb={<CustomBreadcrumb items={breadcrumbItems} />}
        actions={[
          <CustomButton
            key="add"
            startIcon={<Add />}
            onClick={() => notification.showSuccess("Button clicked!")}
          >
            Add New
          </CustomButton>,
        ]}
      />

      {/* Buttons Section */}
      <Section title="Buttons" subtitle="Various button styles and states">
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <CustomButton variant="contained">Primary</CustomButton>
          <CustomButton variant="outlined">Outlined</CustomButton>
          <CustomButton variant="text">Text</CustomButton>
          <CustomButton loading>Loading</CustomButton>
          <CustomButton disabled>Disabled</CustomButton>
          <CustomButton startIcon={<Edit />}>With Icon</CustomButton>
        </Stack>
      </Section>

      {/* Form Components */}
      <Section
        title="Form Components"
        subtitle="Input fields and form elements"
      >
        <Stack spacing={3}>
          <FormField label="Name" required>
            <CustomInput placeholder="Enter your name" />
          </FormField>

          <FormField label="Email">
            <CustomInput
              type="email"
              placeholder="Enter your email"
              startIcon={<Email />}
            />
          </FormField>

          <SearchField
            placeholder="Search components..."
            onSearch={setSearchValue}
          />
          {searchValue && (
            <Typography variant="body2" color="text.secondary">
              Searching for: {searchValue}
            </Typography>
          )}
        </Stack>
      </Section>

      {/* Navigation Components */}
      <Section title="Navigation" subtitle="Tabs and navigation elements">
        <CustomTabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          tabs={tabs}
        />
        <Box mt={2}>
          <Typography>Selected tab: {tabs[tabValue]?.label}</Typography>
        </Box>
      </Section>

      {/* Cards */}
      <Section title="Cards" subtitle="Content containers">
        <Stack spacing={2}>
          <CustomCard
            title="Sample Card"
            subtitle="Card subtitle"
            actions={[
              <CustomButton key="edit" size="small" startIcon={<Edit />}>
                Edit
              </CustomButton>,
              <CustomButton
                key="delete"
                size="small"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete
              </CustomButton>,
            ]}
          >
            <Typography variant="body2">
              This is a sample card with content, actions, and a subtitle.
            </Typography>
          </CustomCard>
        </Stack>
      </Section>

      {/* Status Chips */}
      <Section title="Status Indicators" subtitle="Status chips and badges">
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <StatusChip label="Active" status="active" />
          <StatusChip label="Pending" status="pending" />
          <StatusChip label="Inactive" status="inactive" />
          <StatusChip label="Error" status="error" />
          <StatusChip label="Warning" status="warning" />
          <StatusChip label="Info" status="info" />
        </Stack>
      </Section>

      {/* Data Table */}
      <Section
        title="Data Table"
        subtitle="Table with pagination and selection"
      >
        <CustomDataTable
          columns={tableColumns}
          data={tableData}
          selectable
          actions={(row) => (
            <Stack direction="row" spacing={1}>
              <CustomButton size="small" startIcon={<Edit />}>
                Edit
              </CustomButton>
              <CustomButton
                size="small"
                color="error"
                onClick={handleDeleteClick}
              >
                Delete
              </CustomButton>
            </Stack>
          )}
        />
      </Section>

      {/* Alerts */}
      <Section title="Alerts" subtitle="Notification messages">
        <Stack spacing={2}>
          <CustomAlert severity="success" title="Success!">
            This is a success alert with a title.
          </CustomAlert>
          <CustomAlert severity="warning">
            This is a warning alert without a title.
          </CustomAlert>
          <CustomAlert
            severity="error"
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
          >
            This is a dismissible error alert.
          </CustomAlert>
        </Stack>
      </Section>

      {/* Modal */}
      <Section title="Modal" subtitle="Dialog and modal windows">
        <CustomButton onClick={() => setModalOpen(true)}>
          Open Modal
        </CustomButton>

        <CustomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Sample Modal"
          actions={[
            <CustomButton
              key="cancel"
              variant="outlined"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </CustomButton>,
            <CustomButton
              key="save"
              onClick={() => {
                setModalOpen(false);
                notification.showSuccess("Changes saved!");
              }}
            >
              Save
            </CustomButton>,
          ]}
        >
          <Typography>
            This is a sample modal with actions and a close button.
          </Typography>
        </CustomModal>
      </Section>

      {/* Loading States */}
      <Section title="Loading States" subtitle="Loading indicators">
        <Stack spacing={3} alignItems="center">
          <LoadingSpinner text="Loading data..." />
          <CustomButton loading>Loading Button</CustomButton>
        </Stack>
      </Section>

      {/* Empty State */}
      <Section title="Empty State" subtitle="No data placeholder">
        <EmptyState
          title="No items found"
          description="There are no items to display. Click the button below to add your first item."
          actionText="Add First Item"
          onAction={() => notification.showInfo("Add item clicked!")}
        />
      </Section>
      <Section title="Confirmation Dialogs" subtitle="User confirmation">
        <ExampleUsage />
      </Section>

      <Section title="Multi-Step Form" subtitle="Custom Stepper Form">
        <Example />
      </Section>
    </Box>
  );
};
