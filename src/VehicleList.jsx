import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react'

// import VehicleTable from './VehicleTable.jsx';
import VehicleFilter from './VehicleFilter.jsx';

const VehicleRow = (props) => (
  <Table.Row>
    <Table.Cell>{props.vehicle.make}</Table.Cell>
    <Table.Cell>{props.vehicle.model}</Table.Cell>
    <Table.Cell>{props.vehicle.year}</Table.Cell>
    <Table.Cell>{props.vehicle.package}</Table.Cell>
    <Table.Cell>{props.vehicle.fuelType}</Table.Cell>
    <Table.Cell>{props.vehicle.transmission}</Table.Cell>
    <Table.Cell>{props.vehicle.favorite ? 'Y' : 'N'}</Table.Cell>
  </Table.Row>
)

VehicleRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
}

function VehicleTable(props) {
  console.log(props.vehicles);
  const vehicleRows = props.vehicles.map(vehicle => <VehicleRow key={vehicle._id} vehicle={vehicle} />)
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Make</Table.HeaderCell>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Year</Table.HeaderCell>
          <Table.HeaderCell>Package</Table.HeaderCell>
          <Table.HeaderCell>Fuel Type</Table.HeaderCell>
          <Table.HeaderCell>Transmission</Table.HeaderCell>
          <Table.HeaderCell>Favorite</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {vehicleRows}
      </Table.Body>
    </Table>
  );
}

VehicleTable.propTypes = {
  vehicles: PropTypes.array.isRequired,
}

const columnNameToId = {
  'Make': 'make',
  'Model': 'model',
  'Year': 'year',
  'Package': 'package',
  'Fuel Type': 'fuelType',
  'Transmission': 'transmission'
}

export default class VehicleList extends React.Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      sortBy: 'Model',
      order: 'asc',
      offset: 0,
      limit: 100,
     };
    this.loadData = this.loadData.bind(this);
    this.sortVehicle = this.sortVehicle.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  sortVehicle(text) {
    console.log(text);
    let rows = this.state.vehicles.slice();
    console.log(rows.length);
    console.log('sort by: ' + columnNameToId[text]);
    if (columnNameToId[text] !== undefined) {
      rows.sort((a, b) => {
        if (a[columnNameToId[text]] < b[columnNameToId[text]]) {
          return -1;
        } else if (a[columnNameToId[text]] > b[columnNameToId[text]]) {
          return 1;
        } else {
          return a['_id'] - b['_id'];
        }
      })
    }

    this.setState({ sortBy: text, vehicles: rows });
  }

  loadData() {
    fetch('/api/v1/vehicles').then(response => {
      if (response.ok) {
        response.json().then(data => {
          console.log(data);
          console.log(typeof(this.state.sortBy))
          console.log(this.state.sortBy)
          console.log(data);
          this.setState({ vehicles: data });
        })
      }
    })
  }

  render() {
    return (
      <div>
        <VehicleFilter
          sortBy={ this.state.sortBy }
          sortDir={ this.state.sortDir }
          sortVehicle={ this.sortVehicle }
        />
        <hr />
        <VehicleTable vehicles={ this.state.vehicles } />
      </div>
    )
  }
}
