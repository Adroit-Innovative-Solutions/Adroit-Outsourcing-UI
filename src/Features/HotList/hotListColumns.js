// hotListColumns.js
import React from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import formatPhoneNumber from "../../utils/formatPhoneNumber";

const getHotListColumns = ({
  handleNavigate,
  handleEdit,
  handleDelete,
  loading,
}) => [
  {
    id: "consultantId",
    label: "Consultant ID",
    filterType: "text",
    render: (value, row) =>
      loading ? (
        <Skeleton width={100} />
      ) : (
        <Box
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": { textDecoration: "none" },
          }}
          onClick={() => handleNavigate(row.consultantId)}
        >
          {value}
        </Box>
      ),
  },
  {
    id: "candidate",
    label: "Candidate",
    filterType: "text",
    render: (value) => (loading ? <Skeleton width={120} /> : value),
  },
  {
    id: "email",
    label: "Email",
    filterType: "text",
    render: (value) => (loading ? <Skeleton width={150} /> : value),
  },
  {
    id: "location",
    label: "Location",
    filterType: "text",
    render: (value) => (loading ? <Skeleton width={100} /> : value),
  },
  {
    id: "experience",
    label: "Experience",
    filterType: "number",
    render: (value) => (loading ? <Skeleton width={50} /> : value),
  },
  {
    id: "addedBy",
    label: "Recruiter",
    filterType: "text",
    render: (value) => (loading ? <Skeleton width={80} /> : value),
  },
  {
    id: "phone",
    label: "Phone",
    render: (value) =>
      loading ? <Skeleton width={100} /> : formatPhoneNumber(value),
  },
  {
    id: "createdDate",
    label: "Created Date",
    filterType: "date",
    render: (value) => (loading ? <Skeleton width={90} /> : value),
  },
  {
    id: "actions",
    label: "Actions",
    render: (_, row) =>
      loading ? (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(row)}
            title="Edit candidate"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row)}
            title="Delete candidate"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      ),
  },
];

export default getHotListColumns;
