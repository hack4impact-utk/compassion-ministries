import { useConfirm } from 'material-ui-confirm';

interface DeleteConfirmationOptions {
  title?: string;
  description?: string;
  confirmationKeyword: string;
}

export default function useDeleteConfirmation({
  title,
  description,
  confirmationKeyword,
}: DeleteConfirmationOptions): () => Promise<boolean> {
  title =
    title || 'Are you sure you want to delete this? This cannot be undone.';
  description = description || `Type "${confirmationKeyword}" to confirm.`;

  const confirm = useConfirm();

  return async () => {
    try {
      await confirm({
        title,
        description,
        confirmationKeyword,
        confirmationKeywordTextFieldProps: {
          placeholder: confirmationKeyword,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  };
}
