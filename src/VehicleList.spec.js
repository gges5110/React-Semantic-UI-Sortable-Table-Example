import React from 'react';
import { shallow } from 'enzyme';
import VehicleList from './VehicleList';
import "isomorphic-fetch";

describe('VehicleList', () => {
  it('should render correctly', () => {
    shallow(<VehicleList
    />);
  });

  it('handleSort', () => {
    const wrapper = shallow(<VehicleList/>);
    wrapper.instance().handleSort('make');
    wrapper.instance().onChangeLimit({}, { value: 20 });
    wrapper.instance().onSubmitFilter('someFilterTerm');
    wrapper.instance().onChangePage({}, { activePage: 3 });
  });
});
