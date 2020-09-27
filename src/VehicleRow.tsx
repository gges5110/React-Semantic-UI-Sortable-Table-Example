import React from "react";
import { Button, Table } from "semantic-ui-react";
// import PropTypes from "prop-types";
import { Vehicle } from "./VehicleList";

interface VehicleRowProps {
  vehicle: Vehicle;
  addFavorite(vehicle: Vehicle): void;
}

export const VehicleRow: React.FC<VehicleRowProps> = ({
  vehicle,
  addFavorite
}) => (
  <Table.Row>
    <Table.Cell>{vehicle.id}</Table.Cell>
    <Table.Cell>{vehicle.make}</Table.Cell>
    <Table.Cell>{vehicle.model}</Table.Cell>
    <Table.Cell>{vehicle.year}</Table.Cell>
    <Table.Cell>{vehicle.package}</Table.Cell>
    <Table.Cell>{vehicle.fuelType}</Table.Cell>
    <Table.Cell>{vehicle.transmission}</Table.Cell>
    <Table.Cell textAlign="center">
      <Button
        onClick={() => addFavorite(vehicle)}
        color={vehicle.favorite ? "google plus" : "twitter"}
        icon={vehicle.favorite ? "heart" : "heart outline"}
      />
    </Table.Cell>
  </Table.Row>
);
