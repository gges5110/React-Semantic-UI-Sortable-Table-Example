import React from "react";
import { Table, Pagination } from "semantic-ui-react";

import { VehiclePageSizeSelect } from "./VehiclePageSizeSelect";
import { VehicleTableHeader } from "./VehicleTableHeader";
import { VehicleRow } from "./VehicleRow";
import { PaginationProps } from "semantic-ui-react/dist/commonjs/addons/Pagination/Pagination";
import { Vehicle } from "../interfaces/vehicles";

interface VehicleTableProps {
  vehicles: Vehicle[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  column?: string;
  limit: number;
  direction?: "ascending" | "descending";
  onChangePage(page: number): void;
  addFavorite(vehicle: Vehicle): void;
  handleSort(clickedColumn: string): void;
  onChangeLimit(limit: number): void;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  totalCount,
  totalPages,
  column,
  currentPage,
  onChangeLimit,
  addFavorite,
  direction,
  handleSort,
  limit,
  onChangePage,
}) => {
  const vehicleRows = vehicles.map((vehicle, index) => (
    <VehicleRow key={index} vehicle={vehicle} addFavorite={addFavorite} />
  ));
  const handleChangePage = (
    event: React.MouseEvent<HTMLAnchorElement>,
    { activePage }: PaginationProps
  ) => {
    onChangePage(activePage as number);
  };

  return (
    <React.Fragment>
      <VehiclePageSizeSelect limit={limit} onChangeLimit={onChangeLimit} />
      Total count: {totalCount}.
      <Table celled selectable sortable>
        <VehicleTableHeader
          column={column}
          direction={direction}
          handleSort={handleSort}
        />

        <Table.Body>{vehicleRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={handleChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
