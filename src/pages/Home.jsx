import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
} from "@mui/material";

const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    location: "New York",
    status: "Active",
    createdDate: "2023-01-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Employee",
    location: "Chicago",
    status: "Inactive",
    createdDate: "2023-03-22",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Manager",
    location: "San Francisco",
    status: "Active",
    createdDate: "2022-12-15",
  },
  {
    id: 4,
    name: "Lisa Wong",
    email: "lisa@example.com",
    role: "BDM",
    location: "Boston",
    status: "Pending",
    createdDate: "2023-05-18",
  },
  {
    id: 5,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    role: "Employee",
    location: "Delhi",
    status: "Active",
    createdDate: "2023-07-01",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "error";
    case "Pending":
      return "warning";
    default:
      return "default";
  }
};

const Home = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Welcome to Home
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Dummy User List:
      </Typography>

      <Paper elevation={3}>
        <List>
          {dummyUsers.map((user) => (
            <ListItem key={user.id} divider alignItems="flex-start">
              <ListItemText
                primary={
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Chip label={user.role} size="small" />
                    <Chip
                      label={user.status}
                      size="small"
                      color={getStatusColor(user.status)}
                    />
                  </Stack>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {user.email} | {user.location} | Joined: {user.createdDate}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Home;
