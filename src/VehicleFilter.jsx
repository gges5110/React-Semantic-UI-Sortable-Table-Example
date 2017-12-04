import React from 'react';
import { Form } from 'semantic-ui-react';

export default class VehicleFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, {name, value}) {
    this.setState({[name]: value});
    this.props.onSubmitFilter(value);
  }

  render() {
    const { filter } = this.state;
    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input
              placeholder='Enter the filter.'
              name='filter'
              value={filter}
              error={this.props.totalCount === 0}
              label='Filter'
              onChange={this.handleOnChange}
              icon='search'
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}
