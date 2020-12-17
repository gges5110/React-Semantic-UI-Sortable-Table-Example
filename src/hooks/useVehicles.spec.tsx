import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useVehicles } from "./useVehicles";
import fetchMock from "fetch-mock";
import "node-fetch";
import { mockBaseVehicles } from "../mockData/vehicles.mock";
import {
  queryClient,
  reactQueryTestWrapper,
} from "../utils/reactQueryTestWrapper";

describe("useVehicles", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("default", () => {
    const { result } = renderHook(() => useVehicles(), {
      wrapper: reactQueryTestWrapper,
    });

    expect(result.current.data).toEqual({ totalCount: 0, vehicles: [] });
  });

  it("fetch mock", async () => {
    fetchMock.mock("/api/v1/vehicles", mockBaseVehicles, {
      query: {
        _limit: 10,
        _page: 1,
        q: "",
        _sort: "id",
        _order: "asc",
      },
    });

    fetchMock.mock("/api/v1/vehicles", mockBaseVehicles, {
      overwriteRoutes: false,
    });

    const { result, waitFor } = renderHook(() => useVehicles(), {
      wrapper: reactQueryTestWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 1,
        vehicles: mockBaseVehicles,
      });
    });
  });

  it("with filter", async () => {
    fetchMock.mock("/api/v1/vehicles", mockBaseVehicles, {
      query: {
        _limit: 10,
        _page: 1,
        q: "mazda",
        _sort: "id",
        _order: "asc",
      },
    });

    fetchMock.mock("/api/v1/vehicles", mockBaseVehicles, {
      query: {
        q: "mazda",
      },
      overwriteRoutes: false,
    });

    const { result, waitFor } = renderHook(() => useVehicles(), {
      wrapper: reactQueryTestWrapper,
    });

    const { setFilter } = result.current;
    setFilter("mazda");

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 1,
        vehicles: mockBaseVehicles,
      });
    });
  });

  it("handles network failing case", async () => {
    fetchMock.mock(
      "/api/v1/vehicles",
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        query: {
          _limit: 10,
          _page: 1,
          q: "",
          _sort: "id",
          _order: "asc",
        },
      }
    );

    fetchMock.mock(
      "/api/v1/vehicles",
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        overwriteRoutes: false,
      }
    );

    const { result, waitFor } = renderHook(() => useVehicles(), {
      wrapper: reactQueryTestWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        totalCount: 0,
        vehicles: [],
      });
    });
  });
});
