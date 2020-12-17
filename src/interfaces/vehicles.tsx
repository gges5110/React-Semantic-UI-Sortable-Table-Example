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

export interface SortField {
  sortColumn: string;
  sortOrder?: "descending" | "ascending";
}

export interface QueryParam {
  pagination: Pagination;
  sort: SortField;
  filter: string;
}
