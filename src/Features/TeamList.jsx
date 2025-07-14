import React from "react";
import { Box } from "@mui/material";
import ExpandableAccordionList from "../components/ui/Accordion/ExpandableAccordionList";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Design",
];
const positions = [
  "Developer",
  "Manager",
  "Specialist",
  "Analyst",
  "Lead",
  "Executive",
];
const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Austin, TX",
  "Seattle, WA",
];
const statuses = ["Active", "On Leave", "Resigned", "Inactive"];

const generateDummyData = (count = 100) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    const randomDept =
      departments[Math.floor(Math.random() * departments.length)];
    const randomPos = positions[Math.floor(Math.random() * positions.length)];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const name = `User ${i}`;
    const email = `user${i}@example.com`;
    const phone = `+1 (555) ${100 + i}-${1000 + i}`;
    const startDate = `202${Math.floor(Math.random() * 4)}-${String(
      Math.ceil(Math.random() * 12)
    ).padStart(2, "0")}-${String(Math.ceil(Math.random() * 28)).padStart(
      2,
      "0"
    )}`;

    data.push({
      id: i,
      name,
      email,
      phone,
      department: randomDept,
      position: randomPos,
      location: randomLoc,
      startDate,
      status: randomStatus,
    });
  }
  return data;
};

const sampleData = generateDummyData(100);

const EmployeeDirectory = () => {
  const handleEdit = (item) => {
    alert(`Edit: ${item.name}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      alert(`Deleted: ${item.name}`);
    }
  };

  return (
    <Box sx={{ minHeight: "100%", bgcolor: "background.default", py: 4 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
        <ExpandableAccordionList
          title="Employee Directory"
          data={sampleData}
          summaryKey="email"
          excludeKeys={["id"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pageSize={5}
        />
      </Box>
    </Box>
  );
};

export default EmployeeDirectory;
