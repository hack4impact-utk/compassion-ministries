/* eslint-disable @typescript-eslint/no-explicit-any */
// gets a property given a path
export function getNestedValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj);
}

export function removeDuplicatesByPath<T>(items: T[], path: string): T[] {
  const unique = new Map<any, T>();
  items.forEach((item) => {
    const value = getNestedValue(item, path);
    if (!unique.has(value)) {
      unique.set(value, item);
    }
  });
  return Array.from(unique.values());
}
