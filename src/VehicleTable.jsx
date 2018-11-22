import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown, Table, Pagination} from 'semantic-ui-react'

import VehicleDropdownOptions from './VehicleDropdownOptions.jsx';
import {VehicleRow} from "./VehicleRow.jsx";
import {VehicleTableHeader} from "./VehicleTableHeader.jsx";

export default function VehicleTable(props) {
  if (props.vehicles === undefined) {
    return <div/>;
  }
  const vehicleRows = props.vehicles.map(
    (vehicle, index) => <VehicleRow key={index} vehicle={vehicle} addFavorite={props.addFavorite} />
  );
  return (
    <div>
      Records per page:
      {' '}
      <Dropdown
        inline
        options={VehicleDropdownOptions.limitOptions}
        defaultValue={props.limit}
        onChange={props.onChangeLimit}
      />
      Total count: {props.totalCount}.
      <Table celled selectable sortable >
        <VehicleTableHeader
          column={props.column}
          direction={props.direction}
          handleSort={props.handleSort}
        />

        <Table.Body>
          {vehicleRows}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='8'>
              <Pagination
                totalPages={props.totalPages}
                activePage={props.currentPage}
                onPageChange={props.onChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

VehicleTable.propTypes = {
  vehicles: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
};
