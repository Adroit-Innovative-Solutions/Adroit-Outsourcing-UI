import React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { StatusChip } from "../../components/ui/Display/StatusChip";
import { formatReadableDate } from "../../utils/dateUtils";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import { RenderRolesChips } from "../../utils/renderRolesChips";

export const getEmployeeColumns = (handleEdit, handleDelete, loading) => [
  {
    id: "userId",
    label: "Employee ID",
    render: (value) => (loading ? <Skeleton width={80} /> : value),
  },
  {
    id: "userName",
    label: "Name",
    render: (value) => (loading ? <Skeleton width={120} /> : value),
  },
  {
    id: "designation",
    label: "Designation",
    render: (value) => (loading ? <Skeleton width={100} /> : value),
  },

  {
    id: "email",
    label: "Official Email",
    render: (value) => (loading ? <Skeleton width={180} /> : value),
  },
  {
    id: "personalEmail",
    label: "Personal Email",
    render: (value) => (loading ? <Skeleton width={180} /> : value),
  },
  {
    id: "phoneNumber",
    label: "Phone",
    render: (value) =>
      loading ? <Skeleton width={100} /> : formatPhoneNumber(value),
  },

  {
    id: "gender",
    label: "Gender",
    render: (value) => (loading ? <Skeleton width={60} /> : value),
  },
  {
    id: "dob",
    label: "DOB",
    render: (value) =>
      loading ? <Skeleton width={90} /> : formatReadableDate(value),
  },
  {
    id: "joiningDate",
    label: "Joining Date",
    render: (value) =>
      loading ? <Skeleton width={110} /> : formatReadableDate(value),
  },

  // 
  {
    id: "status",
    label: "Status",
    render: (value) =>
      loading ? (
        <Skeleton variant="rectangular" width={80} height={28} />
      ) : (
        <StatusChip label={value} status={value?.toLowerCase()} />
      ),
  },

  {
    id: "updatedAt",
    label: "Updated-At",
    render: (value) =>
      loading ? <Skeleton width={120} /> : formatReadableDate(value, true),
  },
  {
    id: "createdAt",
    label: "Created-At",
    render: (value) =>
      loading ? <Skeleton width={120} /> : formatReadableDate(value, true),
  },

  {
    id: "actions",
    label: "Actions",
    render: (_, row) =>
      loading ? (
        <Skeleton variant="rectangular" width={60} height={30} />
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(row)}
            title="Edit employee"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row)}
            title="Delete employee"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
  },
];
