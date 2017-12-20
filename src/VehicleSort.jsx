import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import VehicleDropdownOptions from './VehicleDropdownOptions.jsx';

const VehicleSort = (props) => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Field>
        <label>Records Per Page</label>
        <Dropdown
          options={VehicleDropdownOptions.limitOptions}
          selection
          fluid
          value={props.limit}
          onChange={props.onChangeLimit}
        />
      </Form.Field>
    </Form.Group>
  </Form>
)

VehicleSort.propTypes = {
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
}

export default VehicleSort
