import React from 'react';

export default class VehicleFilter extends React.Component {
  constructor() {
    super();
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    this.props.sortVehicle(event.target.value);
  }

  render() {
    return (
      <div>
        Sort By
        <select value={this.props.sortBy} onChange={this.handleOnChange}>
          <option>Make</option>
          <option>Model</option>
          <option>Year</option>
          <option>Package</option>
          <option>Fuel Type</option>
          <option>Transmission</option>
        </select>
        <br/>
        Sort By
        <select value={this.props.sortDir} onChange={this.handleOnChange}>
          <option>ASC</option>
          <option>DSC</option>
        </select>
        <br/>
        <button>Add to favorite</button>
        <br/>
        <input type="text" placeholder="Search..."></input>
      </div>
    )
  }
}
