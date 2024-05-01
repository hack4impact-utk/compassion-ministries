export type ChangeRecord = Record<string, [string, string]>;

/**
 * Get the changes between two objects
 * @param old The old object
 * @param updated The updated object
 * @returns An object where each key is a changed field and the value is a tuple of [old val, new value]
 */
export function getChanges<TData extends Record<string, any>>(
  old: TData,
  updated: TData
): ChangeRecord {
  const changes: ChangeRecord = {};
  Object.keys(updated).forEach((key) => {
    if (old[key] !== updated[key]) {
      changes[key] = [old[key], updated[key]];
    }
  });

  return changes;
}
