import { useConfirm } from 'material-ui-confirm';

interface DeleteConfirmationOptions {
  resourceName: string;
  confirmationKeyword: string;
}

/**
 * A React hook that returns a function that can be called to show a delete confirmation dialog.
 * @param options The options used to configure the delete confirmation dialog
 * @returns A function that can be called to show the delete confirmation dialog
 */
export default function useDeleteConfirmation({
  resourceName,
  confirmationKeyword,
}: DeleteConfirmationOptions): () => Promise<boolean> {
  const title = `Are you sure you want to delete this ${resourceName}? This cannot be undone.`;
  const description = `Type "${confirmationKeyword}" to confirm.`;

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
