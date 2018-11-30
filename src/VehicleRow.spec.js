import React from 'react';
import { mount } from 'enzyme';
import {VehicleRow} from "./VehicleRow";
import {Button, Table} from 'semantic-ui-react';

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

    const wrapper = mount(
      <Table>
        <Table.Body>
          <VehicleRow
            vehicle={vehicles[0]}
            addFavorite={(vehicle) => {
              vehicle.favorite = !vehicle.favorite;
            }}
          />
        </Table.Body>
      </Table>
    );

    wrapper.find(Button).forEach(
      (node) => {
        node.simulate('click');
      }
    );
  });
});
