import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Fab } from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import CustomTable from "../../components/ui/DataTable/CustomTable";
import CustomDrawer from "../../components/ui/Display/CustomDrawer";
import CreateHotListUser from "./CreateHotListUser";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { ConfirmDialog } from "../../components/ui/Feedback/ConfirmDialog";

const HotList = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmRow, setConfirmRow] = useState(null);
  const navigate = useNavigate();

  // Handle creating new candidate
  const handleCreate = () => {
    setSelectedRow(null);
    setFormMode("create");
    setDrawerOpen(true);
  };

  // Handle editing existing candidate
  const handleEdit = (row) => {
    setSelectedRow(row);
    setFormMode("edit");
    setDrawerOpen(true);
  };

  // Handle delete with better UX
  const handleDelete = (row) => {
    setConfirmRow(row);
    setConfirmOpen(true);
  };
  const confirmDelete = async () => {
    if (!confirmRow) return;

    try {
      const res = await fetch(
        `http://192.168.0.115:8090/hotlist/deleteConsultant/${confirmRow.consultantId}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${res.status}: ${res.statusText}`
        );
      }

      showSuccessToast(`${confirmRow.candidate} deleted successfully`);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Delete failed:", error);
      showErrorToast(`Delete failed: ${error.message}`);
    } finally {
      setConfirmOpen(false);
      setConfirmRow(null);
    }
  };

  // Handle successful form submission
  const handleFormSuccess = (data, operation) => {
    setDrawerOpen(false);
    setSelectedRow(null);
    setFormMode("create");
    setRefreshKey((prev) => prev + 1);

    // Optional: You could update the table data directly instead of refreshing
    // This would provide better UX for large datasets
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setDrawerOpen(false);
    setSelectedRow(null);
    setFormMode("create");
  };

  const columns = [
    {
      id: "consultantId",
      label: "Consultant ID",
      filterType: "text",
      render: (value, row) => (
        <Box
          sx={{
            color: "primary.main",
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": { textDecoration: "none" },
          }}
          onClick={() => navigate(`/layout/hotlist/${row.consultantId}`)}
        >
          {value}
        </Box>
      ),
    },
    { id: "candidate", label: "Candidate", filterType: "text" },
    { id: "email", label: "Email", filterType: "text" },
    { id: "location", label: "Location", filterType: "text" },
    { id: "experience", label: "Experience", filterType: "number" },
    { id: "addedBy", label: "Recruiter", filterType: "text" },
    { id: "phone", label: "Phone" },

    {
      id: "createdDate",
      label: "Created Date",
      filterType: "date",
    },
    {
      id: "actions",
      label: "Actions",
      render: (_, row) => (
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

const fetchData = async ({ page, limit, search = "", filters }) => {
  const params = new URLSearchParams();
  params.append("page", page - 1); // backend uses 0-based page index
  params.append("size", limit);

  // Apply filters
  if (filters?.candidate) params.append("name", filters.candidate);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.createdDate) params.append("date", filters.createdDate);
  if (filters?.consultantId) params.append("consultantId", filters.consultantId);
  if (filters?.email) params.append("email", filters.email);
  if (filters?.skills) params.append("skills", filters.skills);
  if (filters?.location) params.append("location", filters.location);
  if (filters?.experience) params.append("experience", filters.experience);
  if (filters?.visa) params.append("visa", filters.visa);

  let url = "";

  // Use search endpoint if search term exists
  if (search.trim()) {
    url = `http://192.168.0.115:8090/hotlist/search/${encodeURIComponent(search.trim())}?${params.toString()}`;
  } else {
    url = `http://192.168.0.115:8090/hotlist/allConsultants?${params.toString()}`;
  }

  const res = await fetch(url);
  const json = await res.json();

  const content = json.data?.content || [];

  const formatted = content.map((item) => ({
    consultantId: item.consultantId || "N/A",
    candidate: item.name || "N/A",
    email: item.emailId || "N/A",
    skills: item.technology || "N/A",
    location: item.location || "N/A",
    experience: item.experience || "N/A",
    addedBy: item.recruiter || "N/A",
    phone: item.marketingContact || "N/A",
    status: item.status || "N/A",
    visa: item.marketingVisa || "N/A",
    createdDate: new Date(item.consultantAddedTimeStamp).toLocaleDateString("en-IN"),
    ...item,
  }));

  return {
    data: formatted,
    total: json.data?.totalElements || content.length,
  };
};



  // Dynamic drawer title
  const getDrawerTitle = () => {
    if (formMode === "edit" && selectedRow) {
      return `Edit ${selectedRow.candidate}`;
    }
    return "Add New Candidate";
  };

  return (
    <Box p={2}>
      <CustomTable
        columns={columns}
        fetchData={fetchData}
        title="Hotlist Candidates"
        key={refreshKey}
      />

      <CustomDrawer
        open={drawerOpen}
        onClose={handleFormCancel}
        title={getDrawerTitle()}
        width="lg"
        anchor="bottom"
      >
        <CreateHotListUser
          initialValues={selectedRow || {}}
          mode={formMode}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      </CustomDrawer>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete ${confirmRow?.candidate}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="error"
      />
    </Box>
  );
};

export default HotList;
