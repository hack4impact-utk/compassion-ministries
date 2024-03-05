import { createElement, useRef, useState } from 'react';
import ConfirmContent from './ConfirmContent';
import { useConfirm } from 'material-ui-confirm';

export default function useRoleConfirmation() {
  const confirm = useConfirm();
  const [verifier, setVerifier] = useState<string>('');
  const verifierRef = useRef(''); // necessary for roleConfirm (below) to keep track of state

  // set the ref on each render
  verifierRef.current = verifier;

  const confirmRole = async (role: string): Promise<string | null> => {
    try {
      await confirm({
        title: `This volunteer is not a verified for the ${role} role.`,
        content: createElement(ConfirmContent, {
          setVerifier,
        }),
      });
      // case where they confirm the user
      setVerifier('');
      return verifierRef.current;
    } catch (error) {
      // case where they cancel the confirmation
      return null;
    }
  };

  return confirmRole;
}
