import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  useTheme,
  Stack,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const ExpandableAccordionList = ({
  data = [],
  summaryKey = "name",
  excludeKeys = [],
  title = "",
  onEdit,
  onDelete,
  pageSize = 3,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and paginate
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((item) =>
      getSummary(item).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getSummary = (item) =>
    typeof summaryKey === "function"
      ? summaryKey(item)
      : item[summaryKey] || "Untitled";

  const handleMenuOpen = (event, item) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleEdit = () => {
    if (onEdit && selectedItem) {
      onEdit(selectedItem);
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (onDelete && selectedItem) {
      onDelete(selectedItem);
    }
    handleMenuClose();
  };

  const renderDetails = (item) =>
    Object.entries(item)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value], index, arr) => (
        <Box key={key} mb={1.5}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="baseline"
            flexWrap="wrap"
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.secondary,
                minWidth: "120px",
                fontSize: isMobile ? "0.813rem" : "0.875rem",
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                wordBreak: "break-word",
                flex: 1,
                fontSize: isMobile ? "0.813rem" : "0.875rem",
              }}
            >
              {String(value)}
            </Typography>
          </Stack>
          {index < arr.length - 1 && <Divider sx={{ mt: 1.5, opacity: 0.3 }} />}
        </Box>
      ));

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {title && (
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{
            mb: 2,
            fontWeight: 600,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder={`Search ${summaryKey}`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // Reset to first page on search
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Stack spacing={1}>
        {paginatedData.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No records found.
          </Typography>
        ) : (
          paginatedData.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                "&:before": { display: "none" },
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[1],
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  px: 2,
                  py: 1.5,
                  borderRadius: "8px 8px 0 0",
                  minHeight: 56,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: isMobile ? "0.938rem" : "1rem",
                      color: theme.palette.text.primary,
                      flex: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {getSummary(item)}
                  </Typography>

                  {(onEdit || onDelete) && (
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, item)}
                      size="small"
                      sx={{
                        color: theme.palette.text.secondary,
                        ml: 1,
                        "&:hover": {
                          backgroundColor: theme.palette.action.selected,
                        },
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: theme.palette.background.default,
                  px: 2,
                  py: 2,
                  borderTop: `1px solid ${theme.palette.divider}`,
                }}
              >
                {renderDetails(item)}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Stack>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="medium"
          />
        </Box>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { minWidth: 120, boxShadow: theme.shadows[8] } }}
      >
        {onEdit && (
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={handleDelete}
            sx={{
              color: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.light,
              },
            }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default ExpandableAccordionList;
