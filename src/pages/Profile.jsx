import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

// Custom Components
import {
  CustomDataTable,
  StatusChip,
  CustomModal,
  CustomButton,
  CustomInput,
} from "../components/ui";
import { ConfirmDialog } from "../components/ui/Feedback/ConfirmDialog"; // Adjust path as needed

const roles = ["Admin", "Employee", "BDM", "Team Lead", "SuperAdmin"];
const statuses = ["Active", "Inactive"];

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    joinDate: "",
  });

  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Employee",
      status: "Inactive",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "BDM",
      status: "Active",
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Team Lead",
      status: "Active",
      joinDate: "2023-01-25",
    },
    {
      id: 5,
      name: "Chris Lee",
      email: "chris.lee@example.com",
      role: "Employee",
      status: "Inactive",
      joinDate: "2023-04-05",
    },
    {
      id: 6,
      name: "Rachel Green",
      email: "rachel.green@example.com",
      role: "SuperAdmin",
      status: "Active",
      joinDate: "2022-12-01",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "BDM",
      status: "Active",
      joinDate: "2023-05-15",
    },
    {
      id: 8,
      name: "Sarah Connor",
      email: "sarah.connor@example.com",
      role: "Team Lead",
      status: "Inactive",
      joinDate: "2023-06-20",
    },
    {
      id: 9,
      name: "Alex Turner",
      email: "alex.turner@example.com",
      role: "Employee",
      status: "Active",
      joinDate: "2023-07-10",
    },
    {
      id: 10,
      name: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-08-01",
    },
  ]);

  const handleEdit = (row) => {
    setEditRow(row);
    setFormValues({
      name: row.name,
      email: row.email,
      role: row.role,
      status: row.status,
      joinDate: row.joinDate,
    });
    setEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formValues.name.trim()) return alert("Name is required");
    if (!formValues.email.trim()) return alert("Email is required");
    if (!formValues.role) return alert("Role is required");
    if (!formValues.status) return alert("Status is required");
    if (!formValues.joinDate) return alert("Join Date is required");

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 1000));
      setData((prev) =>
        prev.map((item) =>
          item.id === editRow.id ? { ...item, ...formValues } : item
        )
      );
      setEditModalOpen(false);
      setEditRow(null);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (row) => {
    setRowToDelete(row);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (rowToDelete) {
      setData((prev) => prev.filter((item) => item.id !== rowToDelete.id));
      setRowToDelete(null);
      setConfirmDialogOpen(false);
    }
  };

  const columns = [
    { key: "id", label: "ID", minWidth: 50, filterable: true, filterType: "text" },
    { key: "name", label: "Name", minWidth: 120, filterable: true, filterType: "text" },
    { key: "email", label: "Email", minWidth: 170, filterable: true, filterType: "text" },
    {
      key: "role",
      label: "Role",
      minWidth: 100,
      filterable: true,
      filterType: "select",
      filterOptions: roles,
    },
    {
      key: "status",
      label: "Status",
      minWidth: 100,
      filterable: true,
      filterType: "select",
      filterOptions: statuses,
      render: (value) => <StatusChip status={value.toLowerCase()} label={value} />,
    },
    {
      key: "joinDate",
      label: "Join Date",
      minWidth: 120,
      filterable: true,
      filterType: "date",
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <>
      <CustomDataTable
        columns={columns}
        data={data}
        loading={isLoading}
        selectable={true}
        pagination={true}
        filters={true}
        maxHeight="600px"
        onRowClick={(event, row, index) => console.log("Row clicked:", row)}
        actions={(row) => (
          <>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleEdit(row)} color="primary">
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(row)} color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      />

      {/* Edit Modal */}
      <CustomModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={`Edit Profile - ${editRow?.name || ""}`}
        actions={[
          <CustomButton
            key="cancel"
            variant="outlined"
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </CustomButton>,
          <CustomButton key="save" onClick={handleSave} loading={isSubmitting}>
            Update User
          </CustomButton>,
        ]}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 400,
            mt: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <CustomInput
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />

          <CustomInput
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formValues.role}
              label="Role"
              onChange={handleInputChange}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={formValues.status}
              label="Status"
              onChange={handleInputChange}
              required
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomInput
            label="Join Date"
            type="date"
            name="joinDate"
            value={formValues.joinDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Box>
      </CustomModal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${rowToDelete?.name}?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="error"
        loading={false}
      />
    </>
  );
};

export default Profile;
