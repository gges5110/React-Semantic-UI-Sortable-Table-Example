import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import { VehicleTable } from "./VehicleTable";
import { VehicleFilter } from "./VehicleFilter";
import { useVehicles } from "../hooks/useVehicles";
import { useAddFavorite } from "../hooks/useAddFavorite";

export const VehicleList: React.FC = () => {
  const {
    isLoading,
    data,
    filter,
    setFilter,
    pagination,
    setPagination,
    sort,
    setSort,
  } = useVehicles();
  const addFavorite = useAddFavorite();

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

  const onSubmitFilter = (value: string) => {
    if (value !== filter) {
      setFilter(value);
      setPagination({ ...pagination, page: 1 });
    }
  };

  const onChangeLimit = (limit: number) => {
    if (limit !== pagination.limit) {
      setPagination({ limit, page: 1 });
    }
  };

  const onChangePage = (page: number) => {
    if (page !== pagination.page) {
      setPagination({ ...pagination, page });
    }
  };

  return (
    <Segment>
      <VehicleFilter
        filter={filter}
        totalCount={data?.totalCount || 0}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />
      <Divider />
      <VehicleTable
        vehicles={data?.vehicles || []}
        totalCount={data?.totalCount || 0}
        totalPages={Math.ceil((data?.totalCount || 0) / pagination.limit)}
        currentPage={pagination.page}
        onChangePage={onChangePage}
        addFavorite={addFavorite.mutate}
        column={sort.sortColumn}
        direction={sort.sortOrder}
        handleSort={handleSort}
        onChangeLimit={onChangeLimit}
        limit={pagination.limit}
      />
    </Segment>
  );
};
