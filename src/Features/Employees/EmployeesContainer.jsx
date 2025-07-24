import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HomeIcon from "@mui/icons-material/Home";

import TabsNavigation from "../../components/ui/Navigation/TabsNavigation";

const EmployeesContainer = () => {
  const tabs = [
    { label: "Home", icon: <HomeIcon />, path: "/layout/home" },
    {
      label: "Employees Table",
      icon: <GroupIcon />,
      path: "/layout/employees",
    },
    {
      label: "Onboard Employee",
      icon: <AddCircleOutlineIcon />,
      path: "/layout/employees/create",
    },
  ];

  return (
    <Box>
      {/* Reusable Tabs */}
      <TabsNavigation tabs={tabs} />

      {/* Nested routes rendered here */}
      <Outlet />
    </Box>
  );
};

export default EmployeesContainer;
