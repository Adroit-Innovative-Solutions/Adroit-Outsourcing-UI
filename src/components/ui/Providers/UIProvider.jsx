import React, { createContext, useContext } from 'react';
import { useNotification } from '../../../hooks/useNotification';
import { useConfirmDialog } from '../../../hooks/useConfirmDialog';
import { ConfirmDialog } from '../Feedback/ConfirmDialog';

const UIContext = createContext();

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const notification = useNotification();
  const confirmDialog = useConfirmDialog();

  const value = {
    notification,
    confirmDialog,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
      <notification.NotificationComponent />
      <ConfirmDialog
        open={confirmDialog.dialog.open}
        onClose={confirmDialog.hideConfirmDialog}
        onConfirm={confirmDialog.handleConfirm}
        title={confirmDialog.dialog.title}
        message={confirmDialog.dialog.message}
        type={confirmDialog.dialog.type}
        loading={confirmDialog.dialog.loading}
      />
    </UIContext.Provider>
  );
};