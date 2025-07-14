import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Divider,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  useTheme,
  Pagination,
  Stack,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search,
  Clear,
  FilterList,
  FilterListOff,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { CustomButton } from "../Button/CustomButton";
import CustomLinearLoader from "../Loading/CustomLinearLoader";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100%",
}));

const ScrollSyncWrapper = styled(Box)(({ theme }) => ({
  overflowX: "auto",
  overflowY: "auto",
  width: "100%",
  flex: 1,
  minHeight: 0,
  "&::-webkit-scrollbar": {
    height: "8px",
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[400],
    borderRadius: "4px",
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.grey[600]
          : theme.palette.grey[500],
    },
  },
  scrollbarWidth: "thin",
  scrollbarColor: `${
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[400]
  } ${
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[100]
  }`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 3,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.grey[200],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const StyledTableBodyCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

const FilterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const ActiveFiltersContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const RowsPerPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const LoadingOverlay = styled(Backdrop)(({ theme }) => ({
  position: "absolute",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  color: theme.palette.primary.main,
}));

const ScrollableTableContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
}));

const ScrollableTableHeader = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  overflowX: "hidden",
  overflowY: "hidden",
  width: "100%",
  position: "relative",
  zIndex: 3,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ScrollableTableBody = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowX: "auto",
  overflowY: "auto",
  width: "100%",
  minHeight: 0, // Important for flex child to be scrollable
  "&::-webkit-scrollbar": {
    height: "8px",
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[400],
    borderRadius: "4px",
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.grey[600]
          : theme.palette.grey[500],
    },
  },
  "&::-webkit-scrollbar-corner": {
    background:
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100],
  },
  // For Firefox
  scrollbarWidth: "thin",
  scrollbarColor: `${
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[400]
  } 
    ${
      theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[100]
    }`,
}));

export const CustomDataTable = ({
  columns = [],
  data = [],
  selectable = false,
  pagination = true,
  rowsPerPageOptions = [5, 10, 15, 25, 30],
  onRowClick,
  actions,
  filters = true,
  loading = false,
  loadingColor = "primary",
  tableHeight = "100%",
  onSelectionChange,
  serverSide = false,
  totalCount = 0,
  onPageChange,
  onRowsPerPageChange,
  ...props
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  // Sync horizontal scrolling between header and body
  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;

    if (!header || !body) return;

    const handleBodyScroll = () => {
      if (header) {
        header.scrollLeft = body.scrollLeft;
      }
    };

    body.addEventListener("scroll", handleBodyScroll);

    return () => {
      body.removeEventListener("scroll", handleBodyScroll);
    };
  }, []);

  // Call onSelectionChange when selection changes
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = selected.map((index) => data[index]).filter(Boolean);
      onSelectionChange(selectedRows, selected);
    }
  }, [selected, data, onSelectionChange]);

  // Calculate column widths
  const getColumnWidth = (column, index) => {
    if (column.width) return column.width;

    // Default widths based on column type
    if (selectable && index === 0) return "60px"; // Checkbox column
    if (actions && index === columns.length + (selectable ? 1 : 0))
      return "120px"; // Actions column

    // Auto-calculate width based on content
    const totalAvailableWidth = 100;
    const reservedWidth = (selectable ? 60 : 0) + (actions ? 120 : 0);
    const remainingWidth = totalAvailableWidth - reservedWidth;
    const columnWidth = remainingWidth / columns.length;

    return `${Math.max(columnWidth, 10)}%`;
  };

  const handleChangePage = (event, newPage) => {
    if (serverSide) {
      onPageChange(newPage);
    } else {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (serverSide) {
      onRowsPerPageChange(newRowsPerPage);
    } else {
      setRowsPerPage(newRowsPerPage);
      setPage(1);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((row, index) =>
        pagination ? (page - 1) * rowsPerPage + index : index
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    event.stopPropagation(); // Prevent row click when clicking checkbox

    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchText("");
    setPage(1);
  };

  const handleColumnFilterChange = (columnKey, value) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
    setPage(1);
  };

  const clearColumnFilter = (columnKey) => {
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[columnKey];
      return newFilters;
    });
    setPage(1);
  };

  const clearAllFilters = () => {
    setSearchText("");
    setColumnFilters({});
    setShowFilters(false);
    setPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const getFilterComponent = (column) => {
    const value = columnFilters[column.key] || "";

    switch (column.filterType) {
      case "select":
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{`Filter ${column.label}`}</InputLabel>
            <Select
              value={value}
              label={`Filter ${column.label}`}
              onChange={(e) =>
                handleColumnFilterChange(column.key, e.target.value)
              }
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {column.filterOptions?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {value && (
              <IconButton
                size="small"
                onClick={() => clearColumnFilter(column.key)}
                sx={{
                  position: "absolute",
                  right: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Clear fontSize="small" />
              </IconButton>
            )}
          </FormControl>
        );

      case "date":
        return (
          <TextField
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            label={`Filter ${column.label}`}
            value={value}
            onChange={(e) =>
              handleColumnFilterChange(column.key, e.target.value)
            }
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => clearColumnFilter(column.key)}
                    edge="end"
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );

      default:
        return (
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder={`Filter ${column.label}`}
            value={value}
            onChange={(e) =>
              handleColumnFilterChange(column.key, e.target.value)
            }
            InputProps={{
              endAdornment: value && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => clearColumnFilter(column.key)}
                    edge="end"
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
    }
  };

  const filteredData = data.filter((row) => {
    // Search filter
    if (searchText) {
      const matches = columns.some((column) => {
        const value = row[column.key];
        return (
          value !== undefined &&
          value !== null &&
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        );
      });
      if (!matches) return false;
    }

    // Column filters
    for (const [columnKey, filterValue] of Object.entries(columnFilters)) {
      if (filterValue) {
        const column = columns.find((col) => col.key === columnKey);
        const cellValue = row[columnKey];

        if (column?.filterType === "select") {
          if (cellValue !== filterValue) return false;
        } else if (column?.filterType === "date") {
          if (!cellValue) return false;
          const cellDate = new Date(cellValue).toISOString().split("T")[0];
          const filterDate = filterValue;
          if (cellDate !== filterDate) return false;
        } else {
          if (
            cellValue === undefined ||
            cellValue === null ||
            !cellValue
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          ) {
            return false;
          }
        }
      }
    }

    return true;
  });

  const totalPages = serverSide
    ? Math.ceil(totalCount / rowsPerPage)
    : Math.ceil(filteredData.length / rowsPerPage);

  const startIndex = serverSide
    ? (page - 1) * rowsPerPage
    : (page - 1) * rowsPerPage;
  const endIndex = serverSide
    ? Math.min(startIndex + rowsPerPage, totalCount)
    : startIndex + rowsPerPage;

  const paginatedData = serverSide
    ? data
    : pagination
    ? filteredData.slice(startIndex, endIndex)
    : filteredData;

  const hasFilters = searchText || Object.keys(columnFilters).length > 0;
  const activeFiltersCount =
    Object.keys(columnFilters).filter((key) => columnFilters[key]).length +
    (searchText ? 1 : 0);

  // Get unique values for select filters
  const getFilterOptions = (column) => {
    if (column.filterOptions) return column.filterOptions;

    const values = data
      .map((row) => row[column.key])
      .filter((value) => value !== undefined && value !== null && value !== "")
      .map((value) => value.toString());

    return [...new Set(values)].sort();
  };

  if (data.length === 0 && !loading) {
    return (
      <StyledTableContainer component={Paper}>
        <Box p={4} textAlign="center">
          <Typography variant="h6" color="text.secondary">
            No data available
          </Typography>
        </Box>
      </StyledTableContainer>
    );
  }

  return (
    <Box position="relative" sx={{ width: "100%", height: tableHeight }}>
      <StyledTableContainer component={Paper} {...props}>
        {/* Loading Overlay */}
        <LoadingOverlay open={loading}>
          <CircularProgress color={loadingColor} size={60} />
        </LoadingOverlay>

        {filters && (
          <FilterContainer>
            <FilterHeader>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search here..."
                  value={searchText}
                  onChange={handleSearchChange}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                    endAdornment: searchText && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={clearSearch}
                          edge="end"
                          disabled={loading}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    minWidth: 400,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                    },
                  }}
                />

                {hasFilters && (
                  <CustomButton
                    variant="outlined"
                    size="small"
                    onClick={clearAllFilters}
                    startIcon={<FilterListOff />}
                    disabled={loading}
                  >
                    Clear All ({activeFiltersCount})
                  </CustomButton>
                )}
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                {activeFiltersCount > 0 && (
                  <Chip
                    label={`${activeFiltersCount} active`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                <Tooltip title={showFilters ? "Hide Filters" : "Show Filters"}>
                  <IconButton
                    onClick={toggleFilters}
                    color="primary"
                    disabled={loading}
                  >
                    <FilterList />
                    {showFilters ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </Tooltip>
              </Box>
            </FilterHeader>

            <Collapse in={showFilters}>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="subtitle2"
                gutterBottom
                color="text.secondary"
              >
                Column Filters
              </Typography>
              <FilterGrid>
                {columns
                  .filter((column) => column.filterable !== false)
                  .map((column) => (
                    <Box key={`filter-${column.key}`}>
                      {getFilterComponent({
                        ...column,
                        filterOptions: getFilterOptions(column),
                      })}
                    </Box>
                  ))}
              </FilterGrid>

              {hasFilters && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                  >
                    Active Filters:
                  </Typography>
                  <ActiveFiltersContainer>
                    {searchText && (
                      <Chip
                        label={`Global: "${searchText}"`}
                        onDelete={clearSearch}
                        size="small"
                        variant="outlined"
                        disabled={loading}
                      />
                    )}
                    {Object.entries(columnFilters).map(([columnKey, value]) => {
                      if (!value) return null;
                      const column = columns.find(
                        (col) => col.key === columnKey
                      );
                      return (
                        <Chip
                          key={columnKey}
                          label={`${column?.label}: "${value}"`}
                          onDelete={() => clearColumnFilter(columnKey)}
                          size="small"
                          variant="outlined"
                          disabled={loading}
                        />
                      );
                    })}
                  </ActiveFiltersContainer>
                </>
              )}
            </Collapse>
          </FilterContainer>
        )}

        {/* Linear Loader below filters/above table header */}
        {loading && (
          <Box>
            <CustomLinearLoader color={loadingColor} height={2} />
          </Box>
        )}

        {/* Table Container with perfect alignment */}
        <ScrollableTableContainer>
          <ScrollSyncWrapper>
            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
              <StyledTableHead>
                <TableRow>
                  {selectable && (
                    <StyledTableCell
                      padding="checkbox"
                      sx={{ width: "60px", minWidth: "60px", maxWidth: "60px" }}
                    >
                      <Checkbox
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < filteredData.length
                        }
                        checked={
                          filteredData.length > 0 &&
                          selected.length === filteredData.length
                        }
                        onChange={handleSelectAllClick}
                        disabled={loading}
                      />
                    </StyledTableCell>
                  )}
                  {columns.map((column, index) => (
                    <StyledTableCell
                      key={column.key}
                      align={column.align || "left"}
                      sx={{
                        width: getColumnWidth(column, index),
                        minWidth: column.minWidth || "100px",
                        maxWidth: column.maxWidth || "none",
                      }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                  {actions && (
                    <StyledTableCell
                      align="right"
                      sx={{
                        width: "120px",
                        minWidth: "120px",
                        maxWidth: "120px",
                      }}
                    >
                      Actions
                    </StyledTableCell>
                  )}
                </TableRow>
              </StyledTableHead>

              <TableBody>
                {paginatedData.map((row, index) => {
                  const actualIndex = pagination
                    ? (page - 1) * rowsPerPage + index
                    : index;
                  const isItemSelected = isSelected(actualIndex);

                  return (
                    <TableRow
                      hover
                      onClick={
                        loading || !onRowClick
                          ? undefined
                          : (event) => onRowClick(event, row, actualIndex)
                      }
                      role={selectable ? "checkbox" : undefined}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={actualIndex}
                      selected={isItemSelected}
                      sx={{
                        cursor: loading
                          ? "default"
                          : onRowClick
                          ? "pointer"
                          : "default",
                        pointerEvents: loading ? "none" : "auto",
                      }}
                    >
                      {selectable && (
                        <StyledTableBodyCell
                          padding="checkbox"
                          sx={{
                            width: "60px",
                            minWidth: "60px",
                            maxWidth: "60px",
                          }}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleClick(event, actualIndex)
                            }
                            disabled={loading}
                          />
                        </StyledTableBodyCell>
                      )}
                      {columns.map((column, colIndex) => (
                        <StyledTableBodyCell
                          key={column.key}
                          align={column.align || "left"}
                          sx={{
                            width: getColumnWidth(column, colIndex),
                            minWidth: column.minWidth || "100px",
                            maxWidth: column.maxWidth || "none",
                          }}
                        >
                          {column.render
                            ? column.render(
                                row[column.key] || "",
                                row,
                                actualIndex
                              )
                            : row[column.key] || ""}
                        </StyledTableBodyCell>
                      ))}
                      {actions && (
                        <StyledTableBodyCell
                          align="right"
                          sx={{
                            width: "120px",
                            minWidth: "120px",
                            maxWidth: "120px",
                          }}
                        >
                          {typeof actions === "function"
                            ? actions(row, actualIndex)
                            : actions}
                        </StyledTableBodyCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollSyncWrapper>
        </ScrollableTableContainer>

        {/* Linear Loader above pagination */}
        {loading && pagination && filteredData.length > 0 && (
          <Box>
            <CustomLinearLoader color={loadingColor} height={2} />
          </Box>
        )}

        {pagination && filteredData.length > 0 && (
          <PaginationContainer>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ opacity: loading ? 0.6 : 1 }}
            >
              Showing {startIndex + 1}-
              {Math.min(
                endIndex,
                serverSide ? totalCount : filteredData.length
              )}{" "}
              of {serverSide ? totalCount : filteredData.length} entries
            </Typography>

            <Stack spacing={2} alignItems="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                disabled={loading}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "50%", // Make it circular
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    minHeight: 36,
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                  opacity: loading ? 0.6 : 1,
                }}
              />
            </Stack>

            <RowsPerPageContainer>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ opacity: loading ? 0.6 : 1 }}
              >
                Rows per page:
              </Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  variant="standard"
                  disabled={loading}
                  sx={{ opacity: loading ? 0.6 : 1 }}
                >
                  {rowsPerPageOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </RowsPerPageContainer>
          </PaginationContainer>
        )}
      </StyledTableContainer>
    </Box>
  );
};
