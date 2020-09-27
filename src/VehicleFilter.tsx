import React from "react";
import PropTypes from "prop-types";
import { Form, Popup } from "semantic-ui-react";

const regex = new RegExp("^[a-zA-Z0-9 ]+$");

interface VehicleFilterProps {
  totalCount: number;
  loading?: boolean;
  onSubmitFilter(value: string): void;
}

interface VehicleFilterState {
  [index: string]: any;
  filter: string;
  filterValid: boolean;
}

export class VehicleFilter extends React.Component<
  VehicleFilterProps,
  VehicleFilterState
> {
  static propTypes = {
    onSubmitFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired
  };

  constructor(props: VehicleFilterProps) {
    super(props);
    this.state = {
      filter: "",
      filterValid: true
    };
  }

  handleOnChange = (event: any, { name, value }: any) => {
    if (value !== "" && !regex.test(value)) {
      this.setState({ [name]: value, filterValid: false });
    } else {
      this.setState({ [name]: value, filterValid: true });
      this.props.onSubmitFilter(value);
    }
  };

  render() {
    const { filter } = this.state;
    let popupMessage = "";
    if (!this.state.filterValid) {
      popupMessage = "Invalid character.";
    } else if (this.props.totalCount === 0) {
      popupMessage = "No results found.";
    }

    return (
      <Form>
        <Form.Group>
          <Form.Field>
            <Popup
              trigger={
                <Form.Input
                  placeholder="Enter the filter."
                  name="filter"
                  value={filter}
                  error={!this.state.filterValid}
                  label="Filter"
                  onChange={this.handleOnChange}
                  icon="search"
                  loading={this.props.loading}
                />
              }
              content={popupMessage}
              on="click"
              open={!this.state.filterValid || this.props.totalCount === 0}
              position="right center"
            />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}
