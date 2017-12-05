import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Checkbox, Icon } from 'semantic-ui-react'

import VehicleTablePagination from './VehicleTablePagination.jsx';

class VehicleRow extends React.Component {
  constructor() {
    super();
    this.addToFavorite = this.addToFavorite.bind(this);
  }

  addToFavorite() {
    this.props.addFavorite(this.props.vehicle);
  }

  render() {
    const icon = this.props.vehicle.favorite ? <Icon name='heart'/> : <Icon name='empty heart' />;
    return (
        <Table.Row>
          <Table.Cell>{this.props.vehicle._id}</Table.Cell>
          <Table.Cell>{this.props.vehicle.make}</Table.Cell>
          <Table.Cell>{this.props.vehicle.model}</Table.Cell>
          <Table.Cell>{this.props.vehicle.year}</Table.Cell>
          <Table.Cell>{this.props.vehicle.package}</Table.Cell>
          <Table.Cell>{this.props.vehicle.fuelType}</Table.Cell>
          <Table.Cell>{this.props.vehicle.transmission}</Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
              onClick={this.addToFavorite}
              color={this.props.vehicle.favorite? 'google plus' : 'teal'}
              icon={this.props.vehicle.favorite ? 'heart' : 'heart outline'} />
          </Table.Cell>
        </Table.Row>

    );
  }
}

VehicleRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
}

export default function VehicleTable(props) {
  const vehicleRows = props.vehicles.map(vehicle => <VehicleRow key={vehicle._id} vehicle={vehicle} addFavorite={props.addFavorite} />)
  return (
    <div>
      Total count: {props.totalCount}
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>#</Table.HeaderCell>
            <Table.HeaderCell width={3}>Make</Table.HeaderCell>
            <Table.HeaderCell width={3}>Model</Table.HeaderCell>
            <Table.HeaderCell width={1}>Year</Table.HeaderCell>
            <Table.HeaderCell width={1}>Package</Table.HeaderCell>
            <Table.HeaderCell width={1}>Fuel Type</Table.HeaderCell>
            <Table.HeaderCell width={1}>Transmission</Table.HeaderCell>
            <Table.HeaderCell width={1} >Favorite</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {vehicleRows}
        </Table.Body>

        <Table.Footer>
          <VehicleTablePagination
            totalPages={props.totalPages}
            currentPage={props.currentPage}
            onChangePage={props.onChangePage}
          />
        </Table.Footer>
      </Table>
    </div>
  );
}

VehicleTable.propTypes = {
  vehicles: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
}
