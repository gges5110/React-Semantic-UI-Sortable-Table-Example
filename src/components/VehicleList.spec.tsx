import React from "react";
import fetchMock from "fetch-mock";
import { VehicleList } from "./VehicleList";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "node-fetch";
import { mockBaseVehicles } from "../mockData/vehicles.mock";

jest.mock("lodash.debounce", () => jest.fn((fn) => fn));
jest.mock("../hooks/useVehicles", () => {
  return {
    useVehicles: jest.fn(() => ({
      isLoading: false,
      pagination: {
        limit: 10,
        page: 1,
      },
      setPagination: jest.fn(),
      filter: "",
      setFilter: jest.fn(),
      sort: {
        sortColumn: "id",
      },
      setSort: jest.fn(),
      data: {
        totalCount: mockBaseVehicles.length,
        vehicles: mockBaseVehicles,
      },
    })),
  };
});

jest.mock("../hooks/useAddFavorite", () => {
  return {
    useAddFavorite: jest.fn(() => ({
      mutate: jest.fn(),
    })),
  };
});

describe("VehicleList", () => {
  beforeEach(() => {
    fetchMock.mock("*", [
      {
        id: 3,
        make: "Mazda",
        model: "B-Series",
        year: 1987,
        package: "SE",
        fuelType: "Diesel",
        transmission: "Manual",
        favorite: false,
      },
    ]);
  });

  afterEach(() => {
    fetchMock.restore();
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
          message: "Some error message",
        },
      },
      {
        overwriteRoutes: true,
      }
    );
    render(<VehicleList />);
  });

  it("handles changes", async () => {
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
          favorite: false,
        },
      ],
      {
        query: {
          _sort: "make",
          _order: "asc",
        },
        overwriteRoutes: false,
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
          favorite: false,
        },
      ],
      {
        query: {
          _sort: "make",
          _order: "desc",
        },
        overwriteRoutes: false,
      }
    );
    userEvent.click(screen.getByRole("columnheader", { name: "Make" }));

    // change filter
    await userEvent.type(screen.getByRole("textbox"), "Volvo");

    // change limit
    userEvent.click(screen.getByRole("listbox"));

    const options = await screen.findAllByRole("option");
    const option = options.find((ele) => ele.textContent === "25");
    expect(option).toBeDefined();
    if (option) {
      userEvent.click(option); // verify your onChange event
    }

    // change page
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("navigation").childElementCount).toEqual(5);
    userEvent.click(screen.getByRole("navigation").children[3]);
  });

  it("add favorite", async () => {
    render(<VehicleList />);
    await waitFor(() => expect(screen.getByText("Mazda")).toBeInTheDocument());

    fetchMock.mock(
      `/api/v1/vehicles/${3}`,
      {
        status: 404,
        body: {
          message: "Some error message",
        },
      },
      {
        method: "PUT",
        overwriteRoutes: false,
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
          favorite: false,
        },
      ],
      {
        method: "PUT",
        overwriteRoutes: true,
      }
    );

    userEvent.click(screen.getByRole("button"));
  });
});
