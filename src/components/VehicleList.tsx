import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import { VehicleTable } from "./VehicleTable";
import { VehicleFilter } from "./VehicleFilter";
import { useVehicles } from "../hooks/useVehicles";
import { useAddFavorite } from "../hooks/useAddFavorite";

export const VehicleList: React.FC = () => {
  const {
    isLoading,
    filter,
    pagination,
    sort,
    totalPages,
    totalCount,
    vehicles,
    onSubmitFilter,
    onChangeLimit,
    onChangePage,
    onSort,
  } = useVehicles();
  const addFavorite = useAddFavorite();

  return (
    <Segment>
      <VehicleFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
        loading={isLoading}
      />
      <Divider />
      <VehicleTable
        vehicles={vehicles}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={pagination.page}
        onChangePage={onChangePage}
        addFavorite={addFavorite.mutate}
        column={sort.sortColumn}
        direction={sort.sortOrder}
        handleSort={onSort}
        onChangeLimit={onChangeLimit}
        limit={pagination.limit}
      />
    </Segment>
  );
};
