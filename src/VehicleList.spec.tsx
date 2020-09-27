import React from "react";
import "isomorphic-fetch";
import fetchMock from "fetch-mock";
import { VehicleList } from "./VehicleList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("VehicleList", () => {
  beforeEach(() => {
    fetchMock.mock("/api/v1/vehicles", [
      {
        id: 3,
        make: "Mazda",
        model: "B-Series",
        year: 1987,
        package: "SE",
        fuelType: "Diesel",
        transmission: "Manual",
        favorite: false
      }
    ]);
    fetchMock.mock(
      "/api/v1/vehicles",
      [
        {
          id: 3,
          make: "Mazda",
          model: "B-Series",
          year: 1987,
          package: "SE",
          fuelType: "Diesel",
          transmission: "Manual",
          favorite: false
        }
      ],
      {
        method: "GET",
        query: {
          _limit: "10",
          _order: "null",
          _sort: "id",
          _page: "1"
        },
        overwriteRoutes: false
      }
    );
  });

  afterEach(() => {
    fetchMock.restore();
    setTimeout(() => {}, 1000);
  });

  it("should render correctly", async () => {
    render(<VehicleList />);
    await waitFor(() => expect(screen.getByText("Mazda")).toBeInTheDocument());
  });

  it("Fail", () => {
    fetchMock.mock(
      "/api/v1/vehicles",
      {
        status: 404,
        body: {
          message: "Some error message"
        }
      },
      {
        overwriteRoutes: true
      }
    );
    render(<VehicleList />);
  });

  it("handles sort", async () => {
    render(<VehicleList />);
    await waitFor(() => expect(screen.getByText("Mazda")).toBeInTheDocument());

    fetchMock.mock(
      "/api/v1/vehicles",
      [
        {
          id: 3,
          make: "Mazda",
          model: "B-Series",
          year: 1987,
          package: "SE",
          fuelType: "Diesel",
          transmission: "Manual",
          favorite: false
        }
      ],
      {
        query: {
          _sort: "make",
          _order: "asc"
        },
        overwriteRoutes: false
      }
    );
    userEvent.click(screen.getByRole("columnheader", { name: "Make" }));

    fetchMock.mock(
      "/api/v1/vehicles",
      [
        {
          id: 3,
          make: "Mazda",
          model: "B-Series",
          year: 1987,
          package: "SE",
          fuelType: "Diesel",
          transmission: "Manual",
          favorite: false
        }
      ],
      {
        query: {
          _sort: "make",
          _order: "desc"
        },
        overwriteRoutes: false
      }
    );
    userEvent.click(screen.getByRole("columnheader", { name: "Make" }));
  });

  it("add favorite", async () => {
    render(<VehicleList />);
    await waitFor(() => expect(screen.getByText("Mazda")).toBeInTheDocument());

    fetchMock.mock(
      `/api/v1/vehicles/${3}`,
      {
        status: 404,
        body: {
          message: "Some error message"
        }
      },
      {
        method: "PUT",
        overwriteRoutes: false
      }
    );

    userEvent.click(screen.getByRole("button"));

    fetchMock.mock(
      `/api/v1/vehicles/${3}`,
      [
        {
          id: 3,
          make: "Mazda",
          model: "B-Series",
          year: 1987,
          package: "SE",
          fuelType: "Diesel",
          transmission: "Manual",
          favorite: false
        }
      ],
      {
        method: "PUT",
        overwriteRoutes: true
      }
    );

    userEvent.click(screen.getByRole("button"));
  });
});
