export type ChangeRecord = Record<string, [string, string]>;

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
