import React from 'react';
import PropTypes from 'prop-types';

// import VehicleTable from './VehicleTable.jsx';
import VehicleFilter from './VehicleFilter.jsx';

const VehicleRow = (props) => (
  <tr>
    <td>{props.vehicle.make}</td>
    <td>{props.vehicle.model}</td>
    <td>{props.vehicle.year}</td>
    <td>{props.vehicle.package}</td>
    <td>{props.vehicle.fuelType}</td>
    <td>{props.vehicle.transmission}</td>
    <td>{props.vehicle.favorite ? 'Y' : 'N'}</td>
  </tr>
)

VehicleRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
}

function VehicleTable(props) {
  console.log(props.vehicles);
  const vehicleRows = props.vehicles.map(vehicle => <VehicleRow key={vehicle._id} vehicle={vehicle} />)
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Package</th>
          <th>Fuel Type</th>
          <th>Transmission</th>
          <th>Favorite</th>
        </tr>
      </thead>
      <tbody>{vehicleRows}</tbody>
    </table>
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
    this.state = { vehicles: [], sortBy: 'Model', sortDir: 'ASC' };
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
    fetch('/api/vehicles').then(response => {
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
