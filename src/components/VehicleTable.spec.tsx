import React from "react";
import { VehicleTable } from "./VehicleTable";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("VehicleTable", () => {
  it("should render correctly", () => {
    const vehicles = [
      {
        id: 1,
        make: "Subaru",
        model: "Justy",
        year: 1990,
        package: "XSE",
        fuelType: "Gas",
        transmission: "Manual",
        favorite: false
      },
      {
        id: 2,
        make: "Mitsubishi",
        model: "Precis",
        year: 1986,
        package: "XLE",
        fuelType: "Diesel",
        transmission: "Auto",
        favorite: false
      },
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
    ];

    render(
      <VehicleTable
        vehicles={vehicles}
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={jest.fn()}
        addFavorite={jest.fn()}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        limit={10}
      />
    );
  });

  it("Empty props.vehicles", () => {
    render(
      <VehicleTable
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={jest.fn()}
        addFavorite={jest.fn()}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        vehicles={[]}
        limit={10}
      />
    );
  });

  it("should change page", () => {
    const onChangePageMock = jest.fn();

    render(
      <VehicleTable
        totalCount={100}
        totalPages={10}
        currentPage={0}
        onChangePage={onChangePageMock}
        addFavorite={jest.fn()}
        onChangeLimit={jest.fn()}
        handleSort={jest.fn()}
        vehicles={[]}
        limit={10}
      />
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("navigation").childElementCount).toEqual(11);
    userEvent.click(screen.getByRole("navigation").children[1]);

    expect(onChangePageMock).toHaveBeenCalledTimes(1);
  });
});
