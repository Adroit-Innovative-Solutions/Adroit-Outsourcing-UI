import React from "react";
import { Box } from "@mui/system";
import DynamicForm from "../../components/FormContainer/DynamicForm";
import employeeFormSections from "./employeeFormSections";
import { userAPI } from "../../utils/api";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";

const RegisterEmployee = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await userAPI.register(values);
      if (response.success) {
        const { userId, email } = response.data;

        showSuccessToast(
          `Employee Registered Successfully\nID: ${userId}\nEmail: ${email}`
        );

        navigate("/layout/employees", { state: { reload: true } });
      } else {
        showErrorToast(response.message || "Failed to register employee");
      }
    } catch (error) {
      showErrorToast("Failed to register employee");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Box p={2}>
      <DynamicForm
        config={employeeFormSections}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        title="Register New Employee"
      />
    </Box>
  );
};

export default RegisterEmployee;
