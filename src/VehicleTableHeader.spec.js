import React from 'react';
import {mount, shallow} from 'enzyme';
import {VehicleTableHeader} from './VehicleTableHeader';
import {Table} from "semantic-ui-react";

describe('VehicleTableHeader', () => {
  it('should render correctly', () => {
    shallow(<VehicleTableHeader
      handleSort={jest.fn()}
    />);
  });

  it('Column Header On Click', () => {
    const wrapper = mount(
      <Table>
        <VehicleTableHeader
          handleSort={jest.fn()}
          column={'id'}
        />
      </Table>
    );
    wrapper.find(Table.HeaderCell).forEach(
      (node) => {
        node.simulate('click');
      }
    )
  });

  it('Sorted Column', () => {
    const columns = [
      "id",
      "make",
      "model",
      "year",
      "package",
      "fuelType",
      "transmission",
      "favorite"
    ];

    columns.forEach((column) => {
      shallow(
        <Table>
          <VehicleTableHeader
            column={column}
            direction={'ascending'}
          />
        </Table>
      );
    });
  });
});
