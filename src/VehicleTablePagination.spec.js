import React from 'react';
import { shallow, mount } from 'enzyme';
import VehicleTablePagination from './VehicleTablePagination';
import { spy } from 'sinon';

describe('VehicleTablePagination', () => {
  it('snapshot regression', () => {
    let onChangePageStub = spy();

    const component = shallow(
      <VehicleTablePagination
        onChangePage = { onChangePageStub }
        totalPages = { 10 }
        currentPage = { 1 }
        showPages = { 3 }
      />);

    expect(component).toMatchSnapshot();
  });


  // it('onSubmitFilter()', () => {
  //   let onChangePageStub = spy();
  //
  //   let wrapper = mount(
  //     <VehicleTablePagination
  //       onChangePage = { onChangePageStub }
  //       totalPages = { 10 }
  //       currentPage = { 1 }
  //       showPages = { 3 }
  //     />
  //   );
  //
  //   expect(vehicleFilter.exists('input')).toEqual(true);
  //   let input = vehicleFilter.find('input');
  //
  //   input.simulate('change', { target: { value: '123' }});
  //   expect(input.instance().value).toEqual('123');
  //   expect(vehicleFilter.state().filterValid).toEqual(true);
  //   expect(onSubmitFilterStub.callCount).toEqual(1);
  //
  //   input.simulate('change', { target: { value: '!@#$' }});
  //   expect(input.instance().value).toEqual('!@#$');
  //   expect(vehicleFilter.state().filterValid).toEqual(false);
  //   expect(onSubmitFilterStub.callCount).toEqual(1);
  // });
});