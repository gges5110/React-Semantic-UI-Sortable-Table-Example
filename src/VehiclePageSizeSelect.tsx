import React from "react";
import { Dropdown } from "semantic-ui-react";
import { DropdownProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

const limitOptions = [
  { key: "0", value: "10", text: "10" },
  { key: "1", value: "25", text: "25" },
  { key: "2", value: "50", text: "50" },
  { key: "3", value: "100", text: "100" }
];

interface VehiclePageSizeSelectProps {
  limit: number;
  onChangeLimit(
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownProps
  ): void;
}

export const VehiclePageSizeSelect: React.FC<VehiclePageSizeSelectProps> = ({
  limit,
  onChangeLimit
}) => (
  <React.Fragment>
    Records per page:{" "}
    <Dropdown
      inline={true}
      options={limitOptions}
      defaultValue={limit}
      onChange={onChangeLimit}
    />
  </React.Fragment>
);
