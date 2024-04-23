import ConfirmContent from './ConfirmContent';
import { useConfirm } from 'material-ui-confirm';
import { ChangeRecord } from '@/utils/change';
import useResponsive from '../useResponsive';

export default function useEditConfirmation() {
  const confirm = useConfirm();
  const { isMobile } = useResponsive();

  const confirmEdit = async (
    resourceName: string,
    changed: ChangeRecord
  ): Promise<boolean> => {
    try {
      await confirm({
        title: `Are you sure you want to edit these fields on this ${resourceName}?`,
        content: <ConfirmContent changed={changed} />,
        dialogProps: {
          fullScreen: isMobile,
        },
      });
      return true;
    } catch (error) {
      // case where they cancel the confirmation
      return false;
    }
  };

  return confirmEdit;
}
