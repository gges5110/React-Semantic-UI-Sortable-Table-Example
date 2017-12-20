import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header } from 'semantic-ui-react'

import VehicleList from './VehicleList.jsx';

var contentNode = document.getElementById('contents');

class App extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 0em' }}>
        <Header>React Semantic UI Sortable Table Example</Header>
        <VehicleList />
      </Container>
    )
  };
}

ReactDOM.render(<App />, contentNode); // Render the component inside the content Node
