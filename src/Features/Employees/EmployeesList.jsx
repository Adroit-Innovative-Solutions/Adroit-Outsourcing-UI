import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomTable from "../../components/ui/DataTable/CustomTable";
import { employeeAPI } from "../../utils/api";
import { getEmployeeColumns } from "./employeeColumns";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../store/slices/employeeSlice";

const EmployeesList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false); // ✅ New loading state
  const dispatch = useDispatch();

  const handleEdit = useCallback((row) => {
    console.log("Edit clicked", row);
    setSelectedRow(row);
    // setRefreshKey(prev => prev + 1); // trigger refresh after modal
  }, []);

  const handleDelete = (row) => {
    dispatch(deleteEmployee(row.userId)).then(() => {
      setRefreshKey((prev) => prev + 1);
    });
  };

  const fetchData = useCallback(async ({ page, limit, filters }) => {
    const params = {
      page: page - 1,
      size: limit,
      ...filters,
    };

    setLoading(true); // ✅ Start loading
    try {
      const res = await employeeAPI.getAll(params);
      const content = res?.data?.content || [];

      const formatted = content.map((emp) => ({
        ...emp,
        dob: emp.dob ? new Date(emp.dob).toLocaleDateString("en-IN") : "N/A",
        joiningDate: emp.joiningDate
          ? new Date(emp.joiningDate).toLocaleDateString("en-IN")
          : "N/A",
      }));

      return {
        data: formatted,
        total: res.data?.totalElements || formatted.length,
      };
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      return { data: [], total: 0 };
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  }, []);

  return (
    <Box p={2}>
      <CustomTable
        key={refreshKey}
        title="Employee List"
        columns={getEmployeeColumns(handleEdit, handleDelete, loading)} // ✅ Pass loading
        fetchData={fetchData}
        pagination
        showSearch
      />
    </Box>
  );
};

export default EmployeesList;
