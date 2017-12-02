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
  'asc',
  'desc'
];

module.exports = {
  vehicleFieldTypes,
  filterableVehicleFieldTypes,
  orderFieldTypes
}