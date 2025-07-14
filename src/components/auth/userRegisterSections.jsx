const userRegisterConfig = [
  // Personal Info
  { name: "firstName", label: "First Name", type: "text", required: true, icon: "Person" },
  { name: "lastName", label: "Last Name", type: "text", required: true, icon: "Person" },
  { name: "email", label: "Email", type: "text", required: true, icon: "Email" },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    icon: "Wc",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  { name: "dob", label: "Date of Birth", type: "date", icon: "CalendarToday" },

  // Account Info
  { name: "username", label: "Username", type: "text", required: true, icon: "AccountCircle" },
  { name: "password", label: "Password", type: "password", required: true, icon: "Lock" },
  { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, icon: "LockOpen" },
  { name: "joiningDate", label: "Joining Date", type: "date", icon: "Event" },

  // Role & Status
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    icon: "AdminPanelSettings",
    options: [
      { label: "Admin", value: "ADMIN" },
      { label: "Employee", value: "EMPLOYEE" },
      { label: "Team Lead", value: "TEAMLEAD" },
      { label: "BDM", value: "BDM" },
      { label: "Super Admin", value: "SUPERADMIN" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    icon: "ToggleOn",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
];

export default userRegisterConfig;
