import { QueryFunction } from "react-query/types/core/types";
import {
  Pagination,
  QueryParam,
  SortField,
  Vehicle,
} from "../interfaces/vehicles";
import { useQuery } from "react-query";
import { useState } from "react";

const constructQuery = (
  pagination: Pagination,
  sort: SortField,
  filter: string
): string => {
  const params = [];
  params.push(`_limit=${pagination.limit}`);
  params.push(`_page=${pagination.page}`);
  params.push(`q=${encodeURIComponent(filter)}`);
  params.push(`_sort=${sort.sortColumn}`);
  if (sort.sortOrder) {
    params.push(`_order=${sort.sortOrder === "ascending" ? "asc" : "desc"}`);
  }

  return params.join("&");
};

interface VehicleListState {
  totalCount: number;
  vehicles: Vehicle[];
}

export const getVehiclesWithTotalCount: QueryFunction<VehicleListState> = async ({
  queryKey,
}) => {
  const { pagination, filter, sort } = queryKey[1] as QueryParam;

  const query = constructQuery(pagination, sort, filter);

  // Make a request without limit first to get the total number of data.
  let totalCountQuery = "";
  if (filter !== "") {
    totalCountQuery = `q=${encodeURIComponent(filter)}`;
  }

  return Promise.all([
    fetch(`/api/v1/vehicles?${totalCountQuery}`),
    fetch(`/api/v1/vehicles?${query}`),
  ])
    .then(async (values) => {
      const totalVehicles = await values[0].json();
      const vehicles: Vehicle[] = await values[1].json();
      return {
        totalCount: totalVehicles.length,
        vehicles,
      };
    })
    .catch((error) => {
      console.log(`Failed to load data: ${error.message}`);
      return {
        totalCount: 0,
        vehicles: [],
      };
    });
};

export const useVehicles = () => {
  const [filter, setFilter] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
  });
  const [sort, setSort] = useState<SortField>({
    sortColumn: "id",
    sortOrder: "ascending",
  });

  const query = useQuery<VehicleListState>(
    ["vehicles", { pagination, filter, sort }],
    getVehiclesWithTotalCount,
    {
      keepPreviousData: true,
      initialData: {
        totalCount: 0,
        vehicles: [],
      },
    }
  );
  return {
    ...query,
    filter,
    setFilter,
    pagination,
    setPagination,
    sort,
    setSort,
  };
};
