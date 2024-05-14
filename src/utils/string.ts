export function capitalizeWords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

export function camelCaseToPascalCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase());
}

export function capitalizeString(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
