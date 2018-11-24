import React from 'react';
import {shallow} from 'enzyme';
import {VehicleFilter} from './VehicleFilter';

describe('VehicleFilter', () => {
  it('should render correctly in "debug" mode', () => {
    let filter = '';
    let totalCount = 100;
    let onSubmitFilter = function() {};

    const component = shallow(<VehicleFilter
      filter = { filter }
      totalCount = { totalCount }
      onSubmitFilter = { onSubmitFilter }
      debug />);

    expect(component).toMatchSnapshot();

    component.instance().handleOnChange({}, {});
  });
});
