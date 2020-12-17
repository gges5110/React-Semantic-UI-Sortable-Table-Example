import React from "react";
import { VehicleRow } from "./VehicleRow";
import { Table } from "semantic-ui-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
    favorite: true
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

describe("VehicleRow", () => {
  it("should render correctly", () => {
    render(
      <Table>
        <Table.Body>
          <VehicleRow vehicle={vehicles[0]} addFavorite={jest.fn()} />
        </Table.Body>
      </Table>
    );
  });

  it("adds favorite", () => {
    const addFavoriteMock = jest.fn();
    render(
      <Table>
        <Table.Body>
          <VehicleRow vehicle={vehicles[0]} addFavorite={addFavoriteMock} />
        </Table.Body>
      </Table>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(addFavoriteMock).toHaveBeenCalled();
  });

  it("removes favorite", () => {
    const addFavoriteMock = jest.fn();
    render(
      <Table>
        <Table.Body>
          <VehicleRow vehicle={vehicles[1]} addFavorite={addFavoriteMock} />
        </Table.Body>
      </Table>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button"));
    expect(addFavoriteMock).toHaveBeenCalled();
  });
});
