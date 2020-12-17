import React from "react";
import { VehicleFilter } from "./VehicleFilter";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("lodash.debounce", () => jest.fn(fn => fn));

describe("VehicleFilter", () => {
  it("renders", () => {
    const filter = "";
    const totalCount = 100;
    const onSubmitFilter = jest.fn();

    const { container } = render(
      <VehicleFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
      />
    );

    expect(container).toMatchSnapshot();
    expect(onSubmitFilter).not.toHaveBeenCalled();
  });

  it("should show message when 0 total count", () => {
    const filter = "";
    const totalCount = 0;
    const onSubmitFilter = jest.fn();

    render(
      <VehicleFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
      />
    );

    waitFor(() => expect(screen.getByText("results")).toBeInTheDocument());
  });

  it("submits", () => {
    const filter = "";
    const totalCount = 10;
    const onSubmitFilter = jest.fn();

    render(
      <VehicleFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
      />
    );

    expect(onSubmitFilter).not.toHaveBeenCalled();

    userEvent.type(screen.getByRole("textbox"), "Volvo");

    expect(onSubmitFilter).toHaveBeenCalled();
    expect(onSubmitFilter.mock.calls).toHaveLength(5);
  });

  it("submits invalid", () => {
    const filter = "";
    const totalCount = 10;
    const onSubmitFilter = jest.fn();

    render(
      <VehicleFilter
        filter={filter}
        totalCount={totalCount}
        onSubmitFilter={onSubmitFilter}
      />
    );

    userEvent.type(screen.getByRole("textbox"), "#");

    expect(onSubmitFilter).not.toHaveBeenCalled();
    waitFor(() => expect(screen.getByText("Invalid")).toBeInTheDocument());
  });
});
