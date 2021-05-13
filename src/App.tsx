import React from "react";
import { Button, Container, Header, Icon, Menu } from "semantic-ui-react";
import { VehicleList } from "./components/VehicleList";
import "semantic-ui-css/semantic.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => (
  <BrowserRouter>
    <Container style={{ padding: "2em 0em" }}>
      <Menu borderless secondary>
        <Menu.Item>
          <Header>React Semantic UI Sortable Table Example</Header>
        </Menu.Item>
        <Menu.Item position="right">
          <iframe
            title={"github-button"}
            src="https://ghbtns.com/github-btn.html?user=gges5110&repo=React-Semantic-UI-Sortable-Table-Example&type=star&count=true&size=large"
            scrolling="0"
            frameBorder="0"
            width="130px"
            height="30px"
          />

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

      <QueryClientProvider client={queryClient}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <VehicleList />
        </QueryParamProvider>
      </QueryClientProvider>
    </Container>
  </BrowserRouter>
);
