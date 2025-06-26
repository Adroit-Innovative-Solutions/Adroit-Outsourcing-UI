import React, { useState } from "react";
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
  useMediaQuery,
  Pagination,
  Stack,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  MoreVert,
  Search,
  Clear,
  FilterList,
  FilterListOff,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { CustomButton } from "../Button/CustomButton";
import  CustomLinearLoader  from "../Loading/CustomLinearLoader";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    borderRadius: 8,
    margin: theme.spacing(1),
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 2,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.background.default
      : theme.palette.grey[100],
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    overflow: "auto",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "table-row",
  },
  [theme.breakpoints.down("md")]: {
    display: "none", // Hide table rows on mobile, we'll use cards instead
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const MobileTableCell = styled(TableCell)(({ theme }) => ({
  // This component will be unused in favor of cards on mobile
}));

// Mobile Card Components
const MobileCardContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const MobileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: 16,
  background: theme.palette.mode === "dark" 
    ? `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
  boxShadow: theme.palette.mode === "dark"
    ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)"
    : "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.mode === "dark"
      ? "0 16px 48px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)"
      : "0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardBody = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const CardField = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1),
  borderRadius: 8,
  backgroundColor: theme.palette.mode === "dark" 
    ? theme.palette.grey[800] 
    : theme.palette.grey[50],
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" 
      ? theme.palette.grey[700] 
      : theme.palette.grey[100],
  },
}));

const CardFieldLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  minWidth: "35%",
}));

const CardFieldValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "0.95rem",
  color: theme.palette.text.primary,
  textAlign: "right",
  flex: 1,
  wordBreak: "break-word",
}));

const CardActions = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

const SelectionIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
  zIndex: 2,
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.grey[50],
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
  },
}));

const FilterHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "stretch",
  },
}));

const FilterGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(1.5),
  },
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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
  },
}));

const RowsPerPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    order: 2,
  },
}));

const LoadingOverlay = styled(Backdrop)(({ theme }) => ({
  position: "absolute",
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  color: theme.palette.primary.main,
}));

export const CustomDataTable = ({
  columns = [],
  data = [],
  selectable = false,
  pagination = true,
  rowsPerPageOptions = [5, 10, 25, 50],
  onRowClick,
  actions,
  filters = true,
  loading = false, // New loading prop
  loadingColor = "primary", // New loading color prop
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [columnFilters, setColumnFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
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

    if (e.target.value === "" && Object.keys(columnFilters).length === 0) {
      setShowFilters(false);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    if (Object.keys(columnFilters).length === 0) {
      setShowFilters(false);
    }
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

      if (Object.keys(newFilters).length === 0 && !searchText) {
        setShowFilters(false);
      }

      return newFilters;
    });
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
              endAdornment={
                value && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => clearColumnFilter(column.key)}
                      edge="end"
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = pagination
    ? filteredData.slice(startIndex, endIndex)
    : filteredData;

  const hasFilters = searchText || Object.keys(columnFilters).length > 0;
  const activeFiltersCount =
    Object.keys(columnFilters).filter((key) => columnFilters[key]).length +
    (searchText ? 1 : 0);

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
    <Box position="relative">
      <StyledTableContainer component={Paper} {...props}>
        {/* Loading Overlay */}
        <LoadingOverlay open={loading}>
          <CircularProgress color={loadingColor} size={60} />
        </LoadingOverlay>

        {/* Top Linear Loader */}
        {/* {loading && (
          <Box position="absolute" top={0} left={0} right={0} zIndex={3}>
            <CustomLinearLoader color={loadingColor} height={3} />
          </Box>
        )} */}

        {filters && (
          <FilterContainer>
            <FilterHeader>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    flexDirection: "column",
                    gap: 1.5,
                  },
                }}
              >
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
                          sx={{
                            border: "1px solid",
                            borderColor: "grey.400",
                            borderRadius: "50%",
                            padding: "4px",
                          }}
                        >
                          <Clear fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    minWidth: isMobile ? "100%" : 400,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "50px",
                    },
                    [theme.breakpoints.down("md")]: {
                      width: "100%",
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
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        width: "100%",
                      },
                    }}
                  >
                    Clear All ({activeFiltersCount})
                  </CustomButton>
                )}
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                sx={{
                  [theme.breakpoints.down("md")]: {
                    width: "100%",
                    justifyContent: "space-between",
                  },
                }}
              >
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
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Column Filters
              </Typography>
              <FilterGrid>
                {columns
                  .filter((column) => column.filterable !== false)
                  .map((column) => (
                    <Box key={`filter-${column.key}`}>
                      {getFilterComponent(column)}
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
                        onDelete={() => setSearchText("")}
                        size="small"
                        variant="outlined"
                        disabled={loading}
                      />
                    )}
                    {Object.entries(columnFilters).map(([columnKey, value]) => {
                      if (!value) return null;
                      const column = columns.find((col) => col.key === columnKey);
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

        {/* Desktop Table View */}
        {!isMobile && (
          <Table
            stickyHeader
            sx={{
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <StyledTableHead>
              <TableRow>
                {selectable && (
                  <StyledTableCell padding="checkbox" width="48px">
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
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.key}
                    align={column.align || "left"}
                    sx={{
                      minWidth: column.minWidth,
                      width: column.width || "auto",
                    }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                {actions && (
                  <StyledTableCell align="right" width="120px">
                    Actions
                  </StyledTableCell>
                )}
              </TableRow>
            </StyledTableHead>

            <StyledTableBody style={{ maxHeight: props.maxHeight || "400px" }}>
              {paginatedData.map((row, index) => {
                const actualIndex = (page - 1) * rowsPerPage + index;
                const isItemSelected = isSelected(actualIndex);

                return (
                  <StyledTableRow
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
                      cursor: loading ? "default" : onRowClick ? "pointer" : "default",
                      pointerEvents: loading ? "none" : "auto"
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, actualIndex)}
                          disabled={loading}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align || "left"}
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: column.width || "200px",
                        }}
                      >
                        {column.render
                          ? column.render(row[column.key] || "", row, actualIndex)
                          : row[column.key] || ""}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell align="right">
                        {typeof actions === "function"
                          ? actions(row, actualIndex)
                          : actions}
                      </TableCell>
                    )}
                  </StyledTableRow>
                );
              })}
              {paginatedData.length === 0 && !loading && (
                <TableRow>
                  <TableCell
                    colSpan={
                      columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                    }
                    align="center"
                  >
                    <Typography variant="body2" color="text.secondary" py={2}>
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </StyledTableBody>
          </Table>
        )}

        {/* Mobile Cards View */}
        {isMobile && (
          <MobileCardContainer
            sx={{
              opacity: loading ? 0.6 : 1,
              transition: "opacity 0.3s ease",
              pointerEvents: loading ? "none" : "auto",
            }}
          >
            {paginatedData.map((row, index) => {
              const actualIndex = (page - 1) * rowsPerPage + index;
              const isItemSelected = isSelected(actualIndex);
              
              // Find primary field (first non-ID column or first column)
              const primaryColumn = columns.find(col => 
                col.key !== 'id' && col.key !== '_id'
              ) || columns[0];
              
              const primaryValue = primaryColumn ? row[primaryColumn.key] : '';

              return (
                <MobileCard
                  key={actualIndex}
                  onClick={
                    loading || !onRowClick
                      ? undefined
                      : (event) => onRowClick(event, row, actualIndex)
                  }
                  sx={{
                    cursor: loading ? "default" : onRowClick ? "pointer" : "default",
                    borderLeft: isItemSelected ? `4px solid ${theme.palette.primary.main}` : 'none',
                    backgroundColor: isItemSelected 
                      ? theme.palette.mode === "dark" 
                        ? theme.palette.primary.dark + '20'
                        : theme.palette.primary.light + '20'
                      : 'inherit',
                  }}
                >
                  {selectable && (
                    <SelectionIndicator>
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => {
                          event.stopPropagation();
                          handleClick(event, actualIndex);
                        }}
                        disabled={loading}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          '&.Mui-checked': {
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                          },
                        }}
                      />
                    </SelectionIndicator>
                  )}

                  <CardHeader>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: theme.palette.text.primary,
                          marginBottom: 0.5,
                        }}
                      >
                        {primaryColumn?.render 
                          ? primaryColumn.render(primaryValue, row, actualIndex)
                          : primaryValue || 'Item'}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {primaryColumn?.label || 'Item'}
                      </Typography>
                    </Box>
                    {actions && (
                      <Box 
                        onClick={(e) => e.stopPropagation()}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {typeof actions === "function"
                          ? actions(row, actualIndex)
                          : actions}
                      </Box>
                    )}
                  </CardHeader>

                  <CardBody>
                    {columns
                      .filter(column => column.key !== primaryColumn?.key)
                      .slice(0, 4) // Show max 4 additional fields
                      .map((column) => {
                        const value = row[column.key];
                        if (value === undefined || value === null || value === '') {
                          return null;
                        }

                        return (
                          <CardField key={column.key}>
                            <CardFieldLabel>{column.label}</CardFieldLabel>
                            <CardFieldValue>
                              {column.render
                                ? column.render(value, row, actualIndex)
                                : value}
                            </CardFieldValue>
                          </CardField>
                        );
                      })}
                      
                    {columns.length > 5 && (
                      <CardField>
                        <CardFieldLabel>More fields</CardFieldLabel>
                        <CardFieldValue sx={{ 
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}>
                          +{columns.length - 5} more
                        </CardFieldValue>
                      </CardField>
                    )}
                  </CardBody>
                </MobileCard>
              );
            })}
            
            {paginatedData.length === 0 && !loading && (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 2,
                }}
              >
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  No records found
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            )}
          </MobileCardContainer>
        )}

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
              sx={{
                [theme.breakpoints.down("md")]: {
                  order: 3,
                  textAlign: "center",
                },
                opacity: loading ? 0.6 : 1,
              }}
            >
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)}{" "}
              of {filteredData.length} entries
            </Typography>

            <Stack
              spacing={2}
              alignItems="center"
              sx={{
                [theme.breakpoints.down("md")]: {
                  order: 1,
                },
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                size={isMobile ? "small" : "medium"}
                showFirstButton
                showLastButton
                disabled={loading}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
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