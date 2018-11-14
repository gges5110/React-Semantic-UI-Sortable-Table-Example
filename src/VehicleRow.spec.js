import React from 'react';
import { shallow } from 'enzyme';
import {VehicleRow} from "./VehicleRow";

describe('VehicleRow', () => {
  it('should render correctly', () => {
    const vehicles = [
      {
        "id": 1,
        "make": "Subaru",
        "model": "Justy",
        "year": 1990,
        "package": "XSE",
        "fuelType": "Gas",
        "transmission": "Manual",
        "favorite": false
      },
      {
        "id": 2,
        "make": "Mitsubishi",
        "model": "Precis",
        "year": 1986,
        "package": "XLE",
        "fuelType": "Diesel",
        "transmission": "Auto",
        "favorite": false
      },
      {
        "id": 3,
        "make": "Mazda",
        "model": "B-Series",
        "year": 1987,
        "package": "SE",
        "fuelType": "Diesel",
        "transmission": "Manual",
        "favorite": false
      }
    ];

    shallow(
      <VehicleRow
        vehicle={vehicles[0]}
        addFavorite={() => {}}
      />
    );
  });
});
