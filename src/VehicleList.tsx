import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import debounce from "lodash.debounce";
import { VehicleTable } from "./VehicleTable";
import { VehicleFilter } from "./VehicleFilter";

const queryParams = ["_limit", "_order", "_sort", "q", "_page"];

interface VehicleListState {
  _sort: string;
  _order: "desc" | "asc" | null;
  _limit: number;
  _page: number;
  q: string;
  totalCount: number;
  loading: boolean;
  vehicles: Vehicle[];
}

export interface Vehicle {
  favorite: boolean;
  id: number;
  make: string;
  model: string;
  year: number;
  package: string;
  fuelType: string;
  transmission: string;
}

interface Params {
  [index: string]: any;
  _sort: string;
  _order: "desc" | "asc";
  _limit: number;
  _page: number;
  q: string;
}

export class VehicleList extends React.Component<{}, VehicleListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      vehicles: [],
      _sort: "id",
      _page: 1,
      _order: null,
      _limit: 10,
      q: "",
      totalCount: 0,
      loading: false
    } as VehicleListState;
    this.onSubmitFilter = debounce(this.onSubmitFilter, 800);
  }

  componentDidMount() {
    this.loadData({});
  }

  static directionConverter(order: "asc" | "desc" | null) {
    if (order === "asc") {
      return "ascending";
    } else if (order === "desc") {
      return "descending";
    } else {
      return undefined;
    }
  }

  handleSort = (clickedColumn: string) => {
    const { _sort, _order } = this.state;

    let newOrder: "desc" | "asc" = _order === "asc" ? "desc" : "asc";
    if (_sort !== clickedColumn) {
      newOrder = "asc";
    }

    this.loadData({
      _sort: clickedColumn,
      _page: 1,
      _order: newOrder
    });
  };

  onChangeLimit = (event: any, data: any) => {
    if (data.value !== this.state._limit) {
      this.loadData({ _limit: data.value, _page: 1 });
    }
  };

  onSubmitFilter = (filter: string) => {
    if (filter !== this.state.q) {
      this.loadData({ q: filter, _page: 1 });
    }
  };

  onChangePage = (event: any, data: any) => {
    const { activePage } = data;
    if (activePage !== this.state._page) {
      this.loadData({ _page: activePage });
    }
  };

  addFavorite = (vehicle: Vehicle) => {
    vehicle.favorite = !vehicle.favorite;
    fetch(`/api/v1/vehicles/${vehicle.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle)
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          const index = this.state.vehicles.findIndex(
            vehicle => vehicle.id === data.id
          );
          this.setState({
            vehicles: Object.assign([...this.state.vehicles], {
              [index]: data
            })
          });
        });
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
    });
  };

  loadData = (params: Partial<Params>) => {
    const newState = Object.assign({}, this.state, params, { loading: false });
    this.setState({ loading: true });

    queryParams.forEach(function(element) {
      if (!(element in params)) {
        params[element] = newState[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + "=" + esc(params[k]))
      .join("&");

    // Make a request without limit first to get the total number of data.
    let totalCountQuery = "";
    if (params.q !== "") {
      totalCountQuery = `q=${params.q}`;
    }

    fetch(`/api/v1/vehicles?${totalCountQuery}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ totalCount: data.length });
        });
      } else {
        response.json().then(error => {
          console.log(`Failed to load data: ${error.message}`);
        });
      }
      this.setState(newState, () => {
        fetch("/api/v1/vehicles?" + query).then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.setState({ vehicles: data });
            });
          } else {
            response.json().then(error => {
              console.log(`Failed to load data: ${error.message}`);
            });
          }
          const newState = Object.assign({}, this.state, params, {
            loading: false
          });
          this.setState(newState);
        });
      });
    });
  };

  render() {
    return (
      <Segment>
        <VehicleFilter
          filter={this.state.q}
          totalCount={this.state.totalCount}
          onSubmitFilter={this.onSubmitFilter}
          loading={this.state.loading}
        />
        <Divider />
        <VehicleTable
          vehicles={this.state.vehicles}
          totalCount={this.state.totalCount}
          totalPages={Math.ceil(this.state.totalCount / this.state._limit)}
          currentPage={this.state._page}
          onChangePage={this.onChangePage}
          addFavorite={this.addFavorite}
          column={this.state._sort}
          direction={VehicleList.directionConverter(this.state._order)}
          handleSort={this.handleSort}
          onChangeLimit={this.onChangeLimit}
          limit={this.state._limit}
        />
      </Segment>
    );
  }
}
