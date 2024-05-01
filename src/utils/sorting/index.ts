/* eslint-disable @typescript-eslint/no-explicit-any */
// gets a property given a path
function getNestedValue<T>(obj: T, path: string): any {
  return path.split('.').reduce((acc: any, part) => acc && acc[part], obj);
}

// sort an array by a specified path. e.g. 'volunteer.name'
// supports strings and types that work with < and > comparison operators
export function sortByPath<T>(
  items: T[],
  path: string,
  ascending: boolean = true
): T[] {
  return items.sort((a, b) => {
    const valueA = getNestedValue(a, path);
    const valueB = getNestedValue(b, path);

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return ascending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return ascending ? (valueA < valueB ? -1 : 1) : valueA > valueB ? -1 : 1;
    }
  });
}
