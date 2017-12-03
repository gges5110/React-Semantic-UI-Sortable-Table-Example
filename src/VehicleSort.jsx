import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import VehicleDropdownOptions from './VehicleDropdownOptions.jsx';

const VehicleSort = (props) => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Field>
        <label>Sort By</label>
        <Dropdown
          options={VehicleDropdownOptions.sortOptions}
          selection
          fluid
          value={props.sortBy}
          onChange={props.onChangeSort}
        />
      </Form.Field>
      <Form.Field>
        <label>Order</label>
        <Dropdown
          options={VehicleDropdownOptions.orderOptions}
          selection
          fluid
          value={props.order}
          onChange={props.onChangeOrder}
        />
      </Form.Field>
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


export default  VehicleSort
