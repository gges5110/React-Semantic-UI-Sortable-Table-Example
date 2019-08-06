import React, { Component } from 'react';
import { Button, Container, Header, Icon, Menu } from 'semantic-ui-react';

import VehicleList from './VehicleList.jsx';

export class App extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 0em' }}>
        <Menu borderless secondary>
          <Menu.Item>
            <Header>React Semantic UI Sortable Table Example</Header>
          </Menu.Item>
          <Menu.Item position="right">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=gges5110&repo=React-Semantic-UI-Sortable-Table-Example&type=star&count=true&size=large"
              scrolling="0"
              frameBorder="0"
              width="120px"
              height="30px"
            ></iframe>

            <Button
              color="facebook"
              style={{ marginLeft: 16 }}
              as="a"
              href="https://github.com/gges5110/React-Semantic-UI-Sortable-Table-Example"
            >
              <Icon name="github" />
              Project Source
            </Button>
          </Menu.Item>
        </Menu>

        <VehicleList />
      </Container>
    );
  }
}
