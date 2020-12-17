import React from "react";
import { VehiclePageSizeSelect } from "./VehiclePageSizeSelect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("VehiclePageSizeSelect", () => {
  it("should render correctly", async () => {
    const onChangeLimitMock = jest.fn();
    render(
      <VehiclePageSizeSelect limit={10} onChangeLimit={onChangeLimitMock} />
    );

    userEvent.click(screen.getByRole("listbox"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("alert").innerHTML).toEqual("10");

    const options = await screen.findAllByRole("option");
    const option = options.find(ele => ele.textContent === "25");
    expect(option).toBeDefined();
    if (option) {
      userEvent.click(option); // verify your onChange event
    }

    expect(onChangeLimitMock).toHaveBeenCalledTimes(1);
    expect(onChangeLimitMock.mock.calls[0]).toEqual(["25"]);
  });
});
