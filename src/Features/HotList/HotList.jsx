import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CustomTable from "../../components/ui/DataTable/CustomTable";
import CustomDrawer from "../../components/ui/Display/CustomDrawer";
import CreateHotListUser from "./CreateHotListUser";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { ConfirmDialog } from "../../components/ui/Feedback/ConfirmDialog";
import { hotlistAPI } from "../../utils/api";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import getHotListColumns from "./hotListColumns";

const HotList = React.memo(() => {
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formMode, setFormMode] = useState("create");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmRow, setConfirmRow] = useState(null);
  const navigate = useNavigate();

  // Memoized handlers to prevent unnecessary re-renders
  const handleCreate = useCallback(() => {
    setSelectedRow(null);
    setFormMode("create");
    setDrawerOpen(true);
  }, []);

  const handleEdit = useCallback((row) => {
    setSelectedRow(row);
    setFormMode("edit");
    setDrawerOpen(true);
  }, []);

  const handleDelete = useCallback((row) => {
    setConfirmRow(row);
    setConfirmOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (consultantId) => {
      navigate(`/layout/hotlist/${consultantId}`);
    },
    [navigate]
  );

  const confirmDelete = useCallback(async () => {
    if (!confirmRow) return;

    try {
      await hotlistAPI.deleteConsultant(confirmRow.consultantId);
      showSuccessToast(`${confirmRow.candidate} deleted successfully`);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showErrorToast(`Delete failed: ${error.message}`);
    } finally {
      setConfirmOpen(false);
      setConfirmRow(null);
    }
  }, [confirmRow]);

  const handleFormSuccess = useCallback(() => {
    setDrawerOpen(false);
    setSelectedRow(null);
    setFormMode("create");
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleFormCancel = useCallback(() => {
    setDrawerOpen(false);
    setSelectedRow(null);
    setFormMode("create");
  }, []);

  const handleConfirmClose = useCallback(() => {
    setConfirmOpen(false);
    setConfirmRow(null);
  }, []);

  // Memoized columns with stable references
  const columns = useMemo(
    () =>
      getHotListColumns({
        handleNavigate,
        handleEdit,
        handleDelete,
        loading,
      }),
    [handleNavigate, handleEdit, handleDelete, loading]
  );

  // Optimized fetch data function with request caching
  const fetchData = useCallback(
    async ({ page, limit, search = "", filters, signal }) => {
      setLoading(true);
      // Build parameters object
      const params = {
        page: page - 1,
        size: limit,
      };

      // Add filters only if they have values
      if (filters?.candidate) params.name = filters.candidate;
      if (filters?.status) params.status = filters.status;
      if (filters?.createdDate) params.date = filters.createdDate;
      if (filters?.consultantId) params.consultantId = filters.consultantId;
      if (filters?.email) params.email = filters.email;
      if (filters?.skills) params.skills = filters.skills;
      if (filters?.location) params.location = filters.location;
      if (filters?.experience) params.experience = filters.experience;
      if (filters?.visa) params.visa = filters.visa;

      try {
        const trimmedSearch = search.trim();
        const res = trimmedSearch
          ? await hotlistAPI.searchConsultants(trimmedSearch, params, {
              signal,
            })
          : await hotlistAPI.getAllConsultants(params, { signal });

        const content = res.data?.content || [];

        // Optimize data transformation
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
          createdDate: item.consultantAddedTimeStamp
            ? new Date(item.consultantAddedTimeStamp).toLocaleDateString(
                "en-IN"
              )
            : "N/A",
          ...item,
        }));

        return {
          data: formatted,
          total: res.data?.totalElements || formatted.length,
        };
      } catch (error) {
        // Don't show error for aborted requests
        if (error.name !== "AbortError") {
          showErrorToast(`Failed to load data: ${error.message}`);
        }
        return { data: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Memoized drawer title
  const drawerTitle = useMemo(() => {
    return formMode === "edit" && selectedRow
      ? `Edit ${selectedRow.candidate}`
      : "Add New Candidate";
  }, [formMode, selectedRow]);

  // Memoized confirm dialog message
  const confirmMessage = useMemo(() => {
    return `Are you sure you want to delete ${confirmRow?.candidate}? This action cannot be undone.`;
  }, [confirmRow]);

  return (
    <Box p={2}>
      <CustomTable
        columns={columns}
        fetchData={fetchData}
        title="Hotlist Candidates"
        key={refreshKey}
        onAdd={handleCreate} // Add this prop if your CustomTable supports it
      />

      <CustomDrawer
        open={drawerOpen}
        onClose={handleFormCancel}
        title={drawerTitle}
        width="lg"
        anchor="right"
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
        onClose={handleConfirmClose}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={confirmMessage}
        confirmText="Delete"
        cancelText="Cancel"
        type="error"
      />
    </Box>
  );
});

HotList.displayName = "HotList";

export default HotList;
