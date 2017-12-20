import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header, Button, Icon, Menu } from 'semantic-ui-react'

import VehicleList from './VehicleList.jsx';

var contentNode = document.getElementById('contents');

class App extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 0em' }}>
        <Menu borderless secondary>
          <Menu.Item>
            <Header>
              React Semantic UI Sortable Table Example
            </Header>
          </Menu.Item>
          <Menu.Item position='right'>
            <Button color='facebook' as='a' href='https://github.com/gges5110/React-Semantic-UI-Sortable-Table-Example'>
              <Icon name='github' />
              Project Source
            </Button>
          </Menu.Item>
        </Menu>

        <VehicleList />
      </Container>
    )
  };
}

ReactDOM.render(<App />, contentNode); // Render the component inside the content Node
