export interface Pagination {
  limit: number;
  page: number;
}

export interface Vehicle {
  favorite: boolean;
  id: number;
  make: string;
  model: string;
  year: number;
  package: string;
  fuelType: string;
  transmission: string;
}

export type SortOrder = "ascending" | "descending";

export interface SortField {
  sortColumn: string;
  sortOrder?: SortOrder;
}

export interface QueryParam {
  pagination: Pagination;
  sort: SortField;
  filter: string;
}
