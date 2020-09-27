import React from "react";
import { VehiclePageSizeSelect } from "./VehiclePageSizeSelect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("VehiclePageSizeSelect", () => {
  it("should render correctly", () => {
    render(<VehiclePageSizeSelect limit={10} onChangeLimit={jest.fn()} />);

    userEvent.click(screen.getByRole("listbox"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert").innerHTML).toEqual("10");
  });
});
