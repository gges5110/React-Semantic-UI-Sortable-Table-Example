const limitOptions = [
  {key: '0', value: '10', text: '10'},
  {key: '1', value: '25', text: '25'},
  {key: '2', value: '50', text: '50'},
  {key: '3', value: '100', text: '100'},
]

const sortOptions = [
  {key: '_id', value: '_id', text: 'ID'},
  {key: 'make', value: 'make', text: 'Make'},
  {key: 'model', value: 'model', text: 'Model'},
  {key: 'year', value: 'year', text: 'Year'},
  {key: 'package', value: 'package', text: 'Package'},
  {key: 'fuelType', value: 'fuelType', text: 'Fuel Type'},
  {key: 'transmission', value: 'transmission', text: 'Transmission'},
  {key: 'favorite', value: 'favorite', text: 'Favorite'},
];

const orderOptions = [
  {key: 'asc', value: 'asc', text: 'Ascending'},
  {key: 'desc', value: 'desc', text: 'Descending'},
]

export default {
  limitOptions,
  sortOptions,
  orderOptions
}