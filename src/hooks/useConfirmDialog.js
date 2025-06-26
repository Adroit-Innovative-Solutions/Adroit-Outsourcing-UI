import { useState, useCallback } from 'react';

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning',
    loading: false,
  });

  const showConfirmDialog = useCallback(({
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    onConfirm,
    type = 'warning',
  }) => {
    setDialog({
      open: true,
      title,
      message,
      onConfirm,
      type,
      loading: false,
    });
  }, []);

  const hideConfirmDialog = useCallback(() => {
    setDialog(prev => ({ ...prev, open: false }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (dialog.onConfirm) {
      try {
        setDialog(prev => ({ ...prev, loading: true }));
        await dialog.onConfirm();
        hideConfirmDialog();
      } catch (error) {
        console.error('Confirmation action failed:', error);
      } finally {
        setDialog(prev => ({ ...prev, loading: false }));
      }
    }
  }, [dialog.onConfirm, hideConfirmDialog]);

  return {
    dialog,
    showConfirmDialog,
    hideConfirmDialog,
    handleConfirm,
  };
};
