const employeeFormSections = [
  {
    section: "Personal, Job & Access Info",
    fields: [
      {
        name: "userId",
        label: "Employee Id",
        type: "text",
        required: true,
        icon: "id",
      },
      {
        name: "email",
        label: "Official Email",
        type: "email",
        required: true,
        icon: "Email",
      },
      // {
      //   name: "personalEmail",
      //   label: "Personal Email",
      //   type: "email",
      //   icon: "AlternateEmail",
      // },
      {
        name: "userName",
        label: "Full Name",
        type: "text",
        required: true,
        icon: "Person",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: "phone",
        required: true,
        icon: "PhoneAndroid",
      },
      // {
      //   name: "gender",
      //   label: "Gender",
      //   type: "select",
      //   icon: "Wc",
      //   options: [
      //     { label: "Male", value: "MALE" },
      //     { label: "Female", value: "FEMALE" },
      //     { label: "Other", value: "OTHER" },
      //   ],
      // },
      // {
      //   name: "dob",
      //   label: "Date of Birth",
      //   type: "date",
      //   icon: "CalendarMonth",
      // },
      // {
      //   name: "joiningDate",
      //   label: "Joining Date",
      //   type: "date",
      //   icon: "EventAvailable",
      // },
      // {
      //   name: "designation",
      //   label: "Designation",
      //   type: "text",
      //   icon: "Badge",
      // },
      {
        name: "roles",
        label: "Roles",
        type: "multiselect",
        required: true,
        icon: "AssignmentInd",
        options: [
          { label: "Recruiter", value: "RECRUITER" },
          { label: "Team Lead", value: "TEAMLEAD" },
          { label: "Sales Executive", value: "SALESEXECUTIVE" },
          { label: "Super Admin", value: "SUPERADMIN" },
        ],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        icon: "ToggleOn",
        options: [
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
        ],
      },
    ],
  },
  {
    section: "Authentication",
    fields: [
      {
        name: "password",
        label: "Password",
        type: "password",
        icon: "Lock",
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        icon: "Lock",
        required: true,
      },
    ],
  },
];

export default employeeFormSections;
