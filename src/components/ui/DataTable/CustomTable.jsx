import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Typography,
  useTheme,
  Backdrop,
  Box,
  IconButton,
  Grid,
  MenuItem,
  Divider,
  InputAdornment,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import MultiColorSpinner from "../Loading/MultiColorSpinner";

const CustomTable = ({
  columns,
  fetchData,
  title = "Data Table",
  refreshKey,
}) => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [throttledSearch, setThrottledSearch] = useState(search);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});

  // Throttle search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setThrottledSearch(search);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      const result = await fetchData({
        page: page + 1,
        limit: rowsPerPage,
        search: throttledSearch,
        filters,
      });
      setRows(result.data || []);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page, rowsPerPage, throttledSearch, filters, refreshKey]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (id, value) => {
    setFilters((prev) => ({ ...prev, [id]: value }));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        p: 2,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title + Search + Filter Icon */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        justifyContent="space-between"
        mb={2}
      >
        <Typography
          variant="h3"
          color="primary"
          fontWeight={500}
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          sx={{
            flex: 2,
            maxWidth: 450,
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={search ? "primary" : "action"} />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={() => setFilterOpen((prev) => !prev)}>
          <FilterListIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Filters Panel */}
      {filterOpen && (
        <Grid container spacing={2} mb={2}>
          {columns
            .filter((col) => col.filterType)
            .map((col) => (
              <Grid item xs={12} sm={6} md={4} key={col.id}>
                {col.filterType === "text" && (
                  <TextField
                    fullWidth
                    label={col.label}
                    size="small"
                    value={filters[col.id] || ""}
                    onChange={(e) => handleFilterChange(col.id, e.target.value)}
                  />
                )}
                {col.filterType === "select" && (
                  <TextField
                    select
                    fullWidth
                    label={col.label}
                    size="small"
                    value={filters[col.id] || ""}
                    onChange={(e) => handleFilterChange(col.id, e.target.value)}
                  >
                    {(col.options || []).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                {col.filterType === "date" && (
                  <TextField
                    fullWidth
                    type="date"
                    label={col.label}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={filters[col.id] || ""}
                    onChange={(e) => handleFilterChange(col.id, e.target.value)}
                  />
                )}
              </Grid>
            ))}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      )}

      {/* Table Section */}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          maxHeight: "70vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 8, height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.grey[600],
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        <TableContainer
          component={Box}
          sx={{
            minWidth: "max-content", // 👈 Ensures table is wide enough for scroll to activate
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    sx={{
                      fontWeight: "bold",
                      whiteSpace: "nowrap", // 👈 Prevents cell wrapping
                      backgroundColor: theme.palette.grey[200],
                      color: theme.palette.text.primary,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No records found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, i) => (
                  <TableRow key={i} hover>
                    {columns.map((col) => (
                      <TableCell key={col.id} sx={{ whiteSpace: "nowrap" }}>
                        {col.render
                          ? col.render(row[col.id], row)
                          : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Loading Spinner */}
      <Backdrop
        open={loading}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
          backgroundColor: "rgba(255,255,255,0.6)",
        }}
      >
        <MultiColorSpinner />
      </Backdrop>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage="Rows per page"
      />
    </Paper>
  );
};

export default CustomTable;
