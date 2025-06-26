import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import CustomDrawer from "../components/ui/Display/CustomDrawer";

const roles = ["Admin", "Employee", "SuperAdmin"];
const statuses = ["Active", "Inactive"];

const employeeFieldsConfig = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Role", name: "role", type: "select", options: roles },
  { label: "Status", name: "status", type: "select", options: statuses },
];

const Settings = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setDrawerOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setDrawerOpen(true)}>
        Open Drawer
      </Button>

      <CustomDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="right"
        title="User Details Form"
        width={350}
      >
        <Box component="form" onSubmit={handleSubmit} p={2}>
          <Stack spacing={2}>
            {employeeFieldsConfig.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                select={field.type === "select"}
                fullWidth
              >
                {field.type === "select" &&
                  field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            ))}

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Box>
      </CustomDrawer>
    </div>
  );
};

export default Settings;
