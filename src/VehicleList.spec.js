import React from 'react';
import { shallow } from 'enzyme';
import VehicleList from './VehicleList';
import "isomorphic-fetch";

describe('VehicleList', () => {
  it('should render correctly', () => {
    shallow(<VehicleList
    />);
  });
});
