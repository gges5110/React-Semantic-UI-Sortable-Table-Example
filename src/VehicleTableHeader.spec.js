import React from 'react';
import { shallow } from 'enzyme';
import {VehicleTableHeader} from './VehicleTableHeader';
import "isomorphic-fetch";

describe('VehicleTableHeader', () => {
  it('should render correctly', () => {
    shallow(<VehicleTableHeader
      handleSort={jest.fn()}
    />);
  });
});
