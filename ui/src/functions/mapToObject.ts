export function mapToObject<T>(map: Map<string, T>): Record<string, T> {
  const newObject: Record<string, T> = {};
  for (const [key, value] of map) {
    newObject[key] = value;
  }
  return newObject;
}
