import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react'

import VehicleList from './VehicleList.jsx';

var contentNode = document.getElementById('contents');

class App extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 0em' }}>
        <VehicleList />
      </Container>
    )
  };
}

ReactDOM.render(<App />, contentNode);      // Render the component inside the content Node
