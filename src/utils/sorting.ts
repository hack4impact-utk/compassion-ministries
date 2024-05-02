// sort an array by a specified path. e.g. 'volunteer.name'

import { getNestedValue, removeDuplicatesByPath } from './array';

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

export function sortByLastName<T>(
  items: T[],
  firstNamePath: string,
  lastNamePath: string,
  ascending: boolean = true
): T[] {
  return items.sort((a, b) => {
    const firstNameA = getNestedValue(a, firstNamePath);
    const firstNameB = getNestedValue(b, firstNamePath);
    const lastNameA = getNestedValue(a, lastNamePath);
    const lastNameB = getNestedValue(b, lastNamePath);

    return ascending
      ? `${lastNameA} ${firstNameA}`.localeCompare(`${lastNameB} ${firstNameB}`)
      : `${lastNameB} ${firstNameB}`.localeCompare(
          `${lastNameA} ${firstNameA}`
        );
  });
}

export function removeDuplicatesAndSortByPath<T>(
  items: T[],
  path: string,
  ascending: boolean = true
): T[] {
  const arrWithoutDuplicates = removeDuplicatesByPath<T>(items, path);
  return sortByPath<T>(arrWithoutDuplicates, path, ascending);
}
