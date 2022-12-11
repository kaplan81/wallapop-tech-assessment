export const getEnumKeys = <T extends string = string>(dict: any): T[] => {
  const allValues: string[] = Object.keys(dict);
  return (allValues[0] === '0' ? allValues.slice(allValues.length / 2) : allValues) as T[];
};
