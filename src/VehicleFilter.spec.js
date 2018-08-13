import React from 'react';
import { shallow } from 'enzyme';
import VehicleFilter from './VehicleFilter';
describe('VehicleFilter', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<VehicleFilter debug />);

    expect(component).toMatchSnapshot();
  });
});