import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type EditableFieldState = Record<string, boolean>;
interface EditableFieldsContextType {
  editingFields: EditableFieldState;
  setEditingFields: Dispatch<SetStateAction<EditableFieldState>>;
}

const EditableFieldsContext = createContext<EditableFieldsContextType | null>(
  null
);

interface EditableFieldsProviderProps {
  children: ReactNode;
}

/**
 * This component is a simple wrapper around the EditableFieldsContext that provides a global snackbar
 * @param props The props for the EditableFieldsProvider
 * @returns JSX
 */
export function EditableFieldsProvider({
  children,
}: EditableFieldsProviderProps) {
  const [editingFields, setEditingFields] = useState<EditableFieldState>({});

  return (
    <EditableFieldsContext.Provider value={{ editingFields, setEditingFields }}>
      {children}
    </EditableFieldsContext.Provider>
  );
}

export default EditableFieldsContext;
