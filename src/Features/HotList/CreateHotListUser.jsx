import React from "react";
import DynamicForm from "../../components/FormContainer/DynamicForm";
import hotListUserConfig from "./hotListUserConfig";
import {
  showSuccessToast,
  showErrorToast,
  showLoadingToast,
  dismissToast,
} from "../../utils/toastUtils";

// API Configuration
const API_BASE_URL = "http://192.168.0.115:8090";
const ENDPOINTS = {
  CREATE: `${API_BASE_URL}/hotlist/addConsultant`,
  UPDATE: `${API_BASE_URL}/hotlist/updateConsultant`, // 👈 base only
};

const CreateHotListUser = ({
  initialValues = {},
  onCancel,
  onSuccess,
  mode = "create", // explicit mode prop
}) => {
  // Multiple ways to detect edit mode
  const isEditMode =
    mode === "edit" ||
    !!initialValues?.id ||
    !!initialValues?.consultantId ||
    Object.keys(initialValues).length > 0;

  // Transform initialValues for edit mode if needed
  const processedInitialValues = isEditMode
    ? {
        ...initialValues,
        // Add any field transformations here
        // e.g., format dates, handle arrays, etc.
      }
    : {};

  const handleSubmit = async (values, formikHelpers) => {
    const operation = isEditMode ? "Updating" : "Creating";
    const toastId = showLoadingToast(`${operation} HotList User...`);

    try {
      const payload = isEditMode
        ? {
            ...values,
            id: initialValues.id,
            consultantId: initialValues.consultantId,
          }
        : values;

      const url = isEditMode
        ? `${ENDPOINTS.UPDATE}/${initialValues.consultantId}`
        : ENDPOINTS.CREATE;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      dismissToast(toastId);

      if (!response.ok || !result.success) {
        throw new Error(result.message || `${operation} failed`);
      }

      showSuccessToast(
        result.message ||
          (isEditMode
            ? "User updated successfully!"
            : "User created successfully!")
      );

      if (!isEditMode) {
        formikHelpers.resetForm();
      }

      if (onSuccess) {
        onSuccess(result.data, isEditMode ? "update" : "create");
      }
    } catch (error) {
      dismissToast(toastId);
      showErrorToast(error.message || "Something went wrong!");
      console.error(`${operation} Error:`, error);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  // Dynamic form title
  const getFormTitle = () => {
    if (isEditMode) {
      const candidateName = initialValues.candidate || initialValues.name;
      return candidateName
        ? `Edit ${candidateName}'s Profile`
        : "Edit Hotlist Profile";
    }
    return "Create a Hotlist Profile";
  };

  return (
    <DynamicForm
      config={hotListUserConfig}
      onSubmit={handleSubmit}
      title={getFormTitle()}
      initialValues={processedInitialValues}
      onCancel={onCancel}
      submitButtonText={"Submit consultant"}
     
    />
  );
};

export default CreateHotListUser;
