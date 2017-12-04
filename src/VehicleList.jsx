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
      order: 'asc',
      offset: 0,
      limit: 10,
      filter: '',
      totalCount: 0,
     };
    this.loadData = this.loadData.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
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

  onChangeOrder(event, data) {
    if (data.value !== this.state.order) {
      this.setState({ order: data.value, offset: 0  })
      this.loadData({ order: data.value, offset: 0  });
    }
  }

  onChangeSort(event, data) {
    if (data.value !== this.state.sortBy) {
      this.setState({ sortBy: data.value, offset: 0  })
      this.loadData({ sortBy: data.value, offset: 0  });
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
    console.log('Load data with query: ' + query);
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
              onChangeOrder = { this.onChangeOrder }
              onChangeSort = { this.onChangeSort }
              sortBy = { this.state.sortBy }
              order = { this.state.order }
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
          />
        </Segment>
      </div>
    )
  }
}
