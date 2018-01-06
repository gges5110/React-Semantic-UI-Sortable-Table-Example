const vehicleFieldTypes = [
  "_id",
  "make",
  "model",
  "year",
  "package",
  "fuelType",
  "transmission",
  "favorite"
];

const filterableVehicleFieldTypes = [
  "make",
  "model",
  "year",
  "package",
  "fuelType",
  "transmission"
];

const orderFieldTypes = [
  'ascending',
  'descending'
];

const defaultLimit = 10;
const defaultOffset = 0;

module.exports = {
  vehicleFieldTypes,
  filterableVehicleFieldTypes,
  orderFieldTypes,
  defaultLimit,
  defaultOffset,
}