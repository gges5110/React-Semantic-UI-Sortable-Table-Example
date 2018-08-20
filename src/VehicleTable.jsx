import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Checkbox, Icon, Dropdown } from 'semantic-ui-react'

import VehicleDropdownOptions from './VehicleDropdownOptions.jsx';
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
          <Table.Cell>{this.props.vehicle.id}</Table.Cell>
          <Table.Cell>{this.props.vehicle.make}</Table.Cell>
          <Table.Cell>{this.props.vehicle.model}</Table.Cell>
          <Table.Cell>{this.props.vehicle.year}</Table.Cell>
          <Table.Cell>{this.props.vehicle.package}</Table.Cell>
          <Table.Cell>{this.props.vehicle.fuelType}</Table.Cell>
          <Table.Cell>{this.props.vehicle.transmission}</Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
              onClick={this.addToFavorite}
              color={this.props.vehicle.favorite? 'google plus' : 'twitter'}
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
  if (props.vehicles === undefined) {
    return <div></div>;
  }
  const vehicleRows = props.vehicles.map(vehicle => <VehicleRow key={vehicle.id} vehicle={vehicle} addFavorite={props.addFavorite} />)
  return (
    <div>
      Records per page:
      {' '}
      <Dropdown inline options={VehicleDropdownOptions.limitOptions} defaultValue={props.limit} onChange={props.onChangeLimit} />
      Total count: {props.totalCount}.
      <Table celled selectable sortable >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} sorted = {props.column === 'id' ? props.direction : null } onClick={() => props.handleSort('id')}>#</Table.HeaderCell>
            <Table.HeaderCell width={3} sorted = {props.column === 'make' ? props.direction : null } onClick={() => props.handleSort('make')}>Make</Table.HeaderCell>
            <Table.HeaderCell width={3} sorted = {props.column === 'model' ? props.direction : null } onClick={() => props.handleSort('model')}>Model</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted = {props.column === 'year' ? props.direction : null } onClick={() => props.handleSort('year')}>Year</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted = {props.column === 'package' ? props.direction : null } onClick={() => props.handleSort('package')}>Package</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted = {props.column === 'fuelType' ? props.direction : null } onClick={() => props.handleSort('fuelType')}>Fuel Type</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted = {props.column === 'trasmission' ? props.direction : null } onClick={() => props.handleSort('transmission')}>Transmission</Table.HeaderCell>
            <Table.HeaderCell width={1} sorted = {props.column === 'favorite' ? props.direction : null } onClick={() => props.handleSort('favorite')}>Favorite</Table.HeaderCell>
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
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
}
