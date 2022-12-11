export enum Sort {
  title,
  description,
  price,
  email,
}
export type SortET = keyof typeof Sort;
