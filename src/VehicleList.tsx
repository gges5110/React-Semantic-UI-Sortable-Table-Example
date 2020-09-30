import React, { useEffect, useState } from "react";
import { Divider, Segment } from "semantic-ui-react";

import { VehicleTable } from "./VehicleTable";
import { VehicleFilter } from "./VehicleFilter";

interface Pagination {
  limit: number;
  page: number;
}

interface VehicleListState {
  totalCount: number;
  vehicles: Vehicle[];
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

interface SortField {
  sortColumn: string;
  sortOrder?: "descending" | "ascending";
}

export const VehicleList: React.FC = () => {
  const [state, setState] = useState<VehicleListState>({
    vehicles: [],
    totalCount: 0
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10
  });
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<SortField>({
    sortColumn: "id",
    sortOrder: "ascending"
  });

  const loadData = () => {
    setLoading(true);

    const query = constructQuery();

    // Make a request without limit first to get the total number of data.
    let totalCountQuery = "";
    if (filter !== "") {
      totalCountQuery = `q=${encodeURIComponent(filter)}`;
    }

    Promise.all([
      fetch(`/api/v1/vehicles?${totalCountQuery}`),
      fetch(`/api/v1/vehicles?${query}`)
    ])
      .then(values => {
        Promise.all([values[0].json(), values[1].json()]).then(data => {
          setState({ totalCount: data[0].length, vehicles: data[1] });
          setLoading(false);
        });
      })
      .catch(error => {
        console.log(`Failed to load data: ${error.message}`);
      });
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter,
    sort.sortOrder,
    sort.sortColumn,
    pagination.page,
    pagination.limit
  ]);

  const handleSort = (clickedColumn: string) => {
    const { sortColumn, sortOrder } = sort;

    let newOrder: "ascending" | "descending" =
      sortOrder === "ascending" ? "descending" : "ascending";
    if (sortColumn !== clickedColumn) {
      newOrder = "ascending";
    }

    setPagination({ ...pagination, page: 1 });
    setSort({ sortColumn: clickedColumn, sortOrder: newOrder });
  };

  const onChangeLimit = (limit: number) => {
    if (limit !== pagination.limit) {
      setPagination({ limit, page: 1 });
    }
  };

  const onSubmitFilter = (value: string) => {
    if (value !== filter) {
      setFilter(value);
      setPagination({ ...pagination, page: 1 });
    }
  };

  const onChangePage = (page: number) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page: page as number });
    }
  };

  const addFavorite = (vehicle: Vehicle) => {
    vehicle.favorite = !vehicle.favorite;
    fetch(`/api/v1/vehicles/${vehicle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const index = state.vehicles.findIndex(
            vehicle => vehicle.id === data.id
          );
          setState({
            ...state,
            vehicles: Object.assign([...state.vehicles], {
              [index]: data
            })
          });
        });
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
  };

  const constructQuery = (): string => {
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

  return (
    <Segment>
      <VehicleFilter
        filter={filter}
        totalCount={state.totalCount}
        onSubmitFilter={onSubmitFilter}
        loading={loading}
      />
      <Divider />
      <VehicleTable
        vehicles={state.vehicles}
        totalCount={state.totalCount}
        totalPages={Math.ceil(state.totalCount / pagination.limit)}
        currentPage={pagination.page}
        onChangePage={onChangePage}
        addFavorite={addFavorite}
        column={sort.sortColumn}
        direction={sort.sortOrder}
        handleSort={handleSort}
        onChangeLimit={onChangeLimit}
        limit={pagination.limit}
      />
    </Segment>
  );
};
