import { renderHook } from "@testing-library/react-hooks";
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

    expect(result.current.totalCount).toEqual(0);
    expect(result.current.vehicles).toEqual([]);
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
      expect(result.current.totalCount).toEqual(1);
      expect(result.current.vehicles).toEqual(mockBaseVehicles);
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

    const { onSubmitFilter } = result.current;
    onSubmitFilter("mazda");

    await waitFor(() => {
      expect(result.current.totalCount).toEqual(1);
      expect(result.current.vehicles).toEqual(mockBaseVehicles);
    });

    const { onSort, onChangeLimit, onChangePage } = result.current;
    onSort("id");
    onSort("make");
    onChangeLimit(100);
    onChangePage(3);
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
      expect(result.current.totalCount).toEqual(0);
      expect(result.current.vehicles).toEqual([]);
    });
  });
});
