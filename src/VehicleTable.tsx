import React from "react";
import { Table, Pagination } from "semantic-ui-react";

import { VehiclePageSizeSelect } from "./VehiclePageSizeSelect";
import { VehicleTableHeader } from "./VehicleTableHeader";
import { VehicleRow } from "./VehicleRow";
import { Vehicle } from "./VehicleList";

interface VehicleTableProps {
  vehicles: Vehicle[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  onChangePage(event: any, data: any): void;
  addFavorite(vehicle: Vehicle): void;
  column?: string;
  direction?: "ascending" | "descending";
  handleSort(clickedColumn: string): void;
  onChangeLimit(event: any, data: any): void;
  limit: number;
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
  onChangePage
}) => {
  const vehicleRows = vehicles.map((vehicle, index) => (
    <VehicleRow key={index} vehicle={vehicle} addFavorite={addFavorite} />
  ));
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
                onPageChange={onChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};
