import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import fetchMock from "fetch-mock";
import "node-fetch";
import { useAddFavorite } from "./useAddFavorite";
import { mockBaseVehicles } from "../mockData/vehicles.mock";
import {
  queryClient,
  reactQueryTestWrapper,
} from "../utils/reactQueryTestWrapper";

describe("useAddFavorite", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("default", async () => {
    const favoredVehicle = { ...mockBaseVehicles, favorite: true };
    const mockVehicle = mockBaseVehicles[0];
    fetchMock.mock("/api/v1/vehicles/3", [favoredVehicle], {
      method: "PUT",
    });
    const { result, waitFor } = renderHook(() => useAddFavorite(), {
      wrapper: reactQueryTestWrapper,
    });

    expect(result.current.mutate).toBeDefined();
    result.current.mutate(mockVehicle);
    await waitFor(() => expect(fetchMock.called()).toBe(true));
    const body = await result.current.data?.json();
    expect(body).toEqual([favoredVehicle]);
  });
});
