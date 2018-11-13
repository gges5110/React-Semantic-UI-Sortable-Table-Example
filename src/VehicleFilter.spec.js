import React from 'react';
import { shallow, mount } from 'enzyme';
import VehicleFilter from './VehicleFilter';
import { spy } from 'sinon';

describe('VehicleFilter', () => {
  it('snapshot regression', () => {
    let filter = '';
    let totalCount = 100;
    let onSubmitFilter = function() {

    };

    const component = shallow(<VehicleFilter
      filter = { filter }
      totalCount = { totalCount }
      onSubmitFilter = { onSubmitFilter }
      debug />);

    expect(component).toMatchSnapshot();
  });


  it('onSubmitFilter()', () => {
    let totalCount = 100;
    let onSubmitFilterStub = spy();

    const vehicleFilter = mount(
      <VehicleFilter
        totalCount = { totalCount }
        onSubmitFilter = { onSubmitFilterStub } />
    );

    expect(vehicleFilter.exists('input')).toEqual(true);
    let input = vehicleFilter.find('input');

    input.simulate('change', { target: { value: '123' }});
    expect(input.instance().value).toEqual('123');
    expect(vehicleFilter.state().filterValid).toEqual(true);
    expect(onSubmitFilterStub.callCount).toEqual(1);

    input.simulate('change', { target: { value: '!@#$' }});
    expect(input.instance().value).toEqual('!@#$');
    expect(vehicleFilter.state().filterValid).toEqual(false);
    expect(onSubmitFilterStub.callCount).toEqual(1);
  });
});