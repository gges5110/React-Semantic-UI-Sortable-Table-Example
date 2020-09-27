import React from "react";
import { VehicleTableHeader } from "./VehicleTableHeader";
import { Table } from "semantic-ui-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("VehicleTableHeader", () => {
  it("should render correctly", () => {
    render(
      <Table>
        <VehicleTableHeader handleSort={jest.fn()} />
      </Table>
    );
  });

  it("Column Header On Click", () => {
    const handleSortMock = jest.fn();

    render(
      <Table>
        <VehicleTableHeader handleSort={handleSortMock} column={"id"} />
      </Table>
    );

    expect(screen.getAllByRole("columnheader")).toHaveLength(8);
    screen.getAllByRole("columnheader").forEach(element => {
      userEvent.click(element);
    });

    expect(handleSortMock).toHaveBeenCalledTimes(8);
  });

  it("Sorted Column", () => {
    const columns = [
      "id",
      "make",
      "model",
      "year",
      "package",
      "fuelType",
      "transmission",
      "favorite"
    ];

    columns.forEach(column => {
      render(
        <Table>
          <VehicleTableHeader
            column={column}
            direction={"ascending"}
            handleSort={jest.fn()}
          />
        </Table>
      );
    });
  });
});
