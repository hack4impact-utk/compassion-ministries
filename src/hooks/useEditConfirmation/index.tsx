import ConfirmContent from './ConfirmContent';
import { useConfirm } from 'material-ui-confirm';
import { ChangeRecord } from '@/utils/change';

export default function useRoleConfirmation() {
  const confirm = useConfirm();

  const confirmEdit = async (
    resourceName: string,
    changed: ChangeRecord
  ): Promise<boolean> => {
    try {
      await confirm({
        title: `Are you sure you want to edit these fields on this ${resourceName}?`,
        content: <ConfirmContent changed={changed} />,
      });
      return true;
    } catch (error) {
      // case where they cancel the confirmation
      return false;
    }
  };

  return confirmEdit;
}
