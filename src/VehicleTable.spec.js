import React from 'react';
import { shallow } from 'enzyme';
import VehicleTable from './VehicleTable';
import "isomorphic-fetch";

describe('VehicleTable', () => {
  it('should render correctly', () => {

    shallow(
      <VehicleTable
        vehicles={[]}
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={() => {}}
        addFavorite={() => {}}
        onChangeLimit={() => {}}
        limit={'10'}
      />
    );
  });
});
