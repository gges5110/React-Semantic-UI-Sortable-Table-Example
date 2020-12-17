import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

export const queryClient = new QueryClient();
export const reactQueryTestWrapper: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
