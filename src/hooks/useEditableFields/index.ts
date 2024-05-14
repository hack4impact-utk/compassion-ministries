import { useContext } from 'react';
import EditableFieldsContext from './EditableFieldsContext';

export default function useEditableFields() {
  const ctx = useContext(EditableFieldsContext);

  // Ensure we are inside an EditableFieldsProvider (so we can access the context)
  if (!ctx) {
    throw new Error(
      'useEditableFields must be used within an EditableFieldsProvider'
    );
  }

  const { editingFields, setEditingFields } = ctx;

  const setEditing = (field: string, value: boolean) => {
    setEditingFields((prev) => ({ ...prev, [field]: value }));
  };

  const startEditing = (field: string) => {
    setEditing(field, true);
  };

  const stopEditing = (field: string) => {
    setEditing(field, false);
  };

  const isEditingAny = Object.values(editingFields).some(Boolean);

  const isEditing = (field: string) => {
    return !!editingFields[field];
  };

  return {
    editingFields,
    setEditing,
    startEditing,
    stopEditing,
    isEditingAny,
    isEditing,
  };
}

export { EditableFieldsProvider } from './EditableFieldsContext';
