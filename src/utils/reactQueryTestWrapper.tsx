import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route } from "react-router-dom";

export const queryClient = new QueryClient();
export const reactQueryTestWrapper: React.FC = ({ children }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider ReactRouterRoute={Route}>
        {children}
      </QueryParamProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
