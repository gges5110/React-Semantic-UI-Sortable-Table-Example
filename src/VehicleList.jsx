import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Divider } from 'semantic-ui-react';

import VehicleTable from './VehicleTable.jsx';
import VehicleFilter from './VehicleFilter.jsx';
import VehicleSort from './VehicleSort.jsx';

const queryParams = ['limit','order','sortBy','filter','offset'];

export default class VehicleList extends React.Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      sortBy: '_id',
      offset: 0,
      limit: 10,
      filter: '',
      totalCount: 0,
      direction: null,
     };
    this.loadData = this.loadData.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(clickedColumn) {
    const { sortBy, direction } = this.state

    if (sortBy !== clickedColumn) {
      this.setState({
        sortBy: clickedColumn,
        direction: 'ascending',
      })

      this.loadData({
        sortBy: clickedColumn,
        offset: 0,
        order: 'ascending',
      });

      return
    }

    this.setState({
      sortBy: clickedColumn,
      offset: 0,
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })

    this.loadData({
      sortBy: clickedColumn,
      offset: 0,
      order: direction === 'ascending' ? 'descending' : 'ascending'
    });
  }

  componentDidMount() {
    this.loadData({});
  }

  onChangeLimit(event, data) {
    if (data.value !== this.state.limit) {
      this.setState({ limit: data.value, offset: 0  })
      this.loadData({ limit: data.value, offset: 0  });
    }
  }

  onSubmitFilter(filter) {
    if (filter !== this.state.filter) {
      this.setState({ filter: filter, offset: 0 })
      this.loadData({ filter: filter, offset: 0 });
    }
  }

  onChangePage(page) {
    if (page !== this.state.offset) {
      this.setState({ offset: page })
      this.loadData({ offset: page });
    }
  }

  addFavorite(vehicle) {
    fetch('/api/v1/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({'vehicle': vehicle}),
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          var vehicles = this.state.vehicles.slice();
          for (var i = 0; i < vehicles.length; ++i) {
            if (vehicles[i]._id === data._id) {
              vehicles[i] = data;
              break;
            }
          }

          this.setState({ vehicles: vehicles });
        })
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    })
  }

  loadData(params) {
    const current = this.state;
    queryParams.forEach(function(element) {
      if (!(element in params)) {
        params[element] = current[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    fetch('/api/v1/vehicles?' + query).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ vehicles: data.records, totalCount: data.metadata.totalCount });
        })
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    })
  }

  render() {
    return (
      <div>
        <Segment>
          <Header size='medium'>Sort Options</Header>
          <VehicleSort
            onChangeLimit = { this.onChangeLimit }
            limit = { this.state.limit.toString() }
          />
          <Divider />
          <VehicleFilter
            filter = { this.state.filter }
            totalCount = {this.state.totalCount }
            onSubmitFilter = { this.onSubmitFilter }
          />
        </Segment>

        <Segment>
          <Header size='medium'>Vehicle Table</Header>
          <VehicleTable
            vehicles = { this.state.vehicles }
            totalCount = {this.state.totalCount }
            totalPages = { Math.ceil(this.state.totalCount / this.state.limit) }
            currentPage = { this.state.offset }
            onChangePage = { this.onChangePage }
            addFavorite = { this.addFavorite }
            column = { this.state.sortBy }
            direction = { this.state.direction }
            handleSort = { this.handleSort }
          />
        </Segment>
      </div>
    )
  }
}
