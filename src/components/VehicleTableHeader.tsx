import { Table } from "semantic-ui-react";
import React from "react";

interface VehicleTableHeaderProps {
  column?: string;
  direction?: "ascending" | "descending";
  handleSort(column: string): void;
}
export const VehicleTableHeader: React.FC<VehicleTableHeaderProps> = ({
  column,
  direction,
  handleSort
}) => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell
        width={1}
        sorted={column === "id" ? direction : undefined}
        onClick={() => handleSort("id")}
      >
        #
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        sorted={column === "make" ? direction : undefined}
        onClick={() => handleSort("make")}
      >
        Make
      </Table.HeaderCell>
      <Table.HeaderCell
        width={3}
        sorted={column === "model" ? direction : undefined}
        onClick={() => handleSort("model")}
      >
        Model
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "year" ? direction : undefined}
        onClick={() => handleSort("year")}
      >
        Year
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "package" ? direction : undefined}
        onClick={() => handleSort("package")}
      >
        Package
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "fuelType" ? direction : undefined}
        onClick={() => handleSort("fuelType")}
      >
        Fuel Type
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "transmission" ? direction : undefined}
        onClick={() => handleSort("transmission")}
      >
        Transmission
      </Table.HeaderCell>
      <Table.HeaderCell
        width={1}
        sorted={column === "favorite" ? direction : undefined}
        onClick={() => handleSort("favorite")}
      >
        Favorite
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);
