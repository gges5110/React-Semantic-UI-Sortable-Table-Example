import React from 'react';
import { Form, Popup, Button } from 'semantic-ui-react';

const regex = new RegExp("^[a-zA-Z0-9]+$");

export default class VehicleFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: '',
      filterValid: true,
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, {name, value}) {
    if (value !== '' && !regex.test(value)) {
      this.setState({[name]: value, filterValid: false});
    } else {
      this.setState({[name]: value, filterValid: true});
      this.props.onSubmitFilter(value);
    }
  }

  render() {
    const { filter } = this.state;
    let popupMessage = '';
    if (!this.state.filterValid) {
      popupMessage = 'Invalid character.';
    } else if (this.props.totalCount === 0) {
      popupMessage = 'No results found.'
    }

    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Popup
              trigger={<Form.Input
                placeholder='Enter the filter.'
                name='filter'
                value={filter}
                error={!this.state.filterValid}
                label='Filter'
                onChange={this.handleOnChange}
                icon='search'
              />}
              content={popupMessage}
              on='click'
              open={!this.state.filterValid || this.props.totalCount === 0}
              position='right center'
            />

          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}
