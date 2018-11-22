import React from 'react';
import { shallow } from 'enzyme';
import {VehiclePageSizeSelect} from './VehiclePageSizeSelect';

describe('VehiclePageSizeSelect', () => {
  it('should render correctly', () => {
    shallow(<VehiclePageSizeSelect
      limit={10}
      onChangeLimit={jest.fn()}
    />);
  });
});
