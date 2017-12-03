import React from 'react';
import { Form } from 'semantic-ui-react';

export default class VehicleFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event, {name, value}) {
    console.log('handle on change');
    this.setState({[name]: value});
    this.props.onSubmitFilter(value);
  }

  handleOnSubmit() {
    console.log('submit: ' + this.state.filter);
    this.props.onSubmitFilter(this.state.filter);
  }

  render() {
    const { filter } = this.state;
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group>
          <Form.Field>
            <label>Filter</label>
            <Form.Input placeholder='Enter the filter.' name='filter' value={filter} onChange={this.handleOnChange}/>
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}
