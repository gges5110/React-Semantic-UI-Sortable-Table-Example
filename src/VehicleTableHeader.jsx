import {Table} from "semantic-ui-react";
import React from "react";

export function VehicleTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={1} sorted = {props.column === 'id' ? props.direction : null } onClick={() => props.handleSort('id')}>#</Table.HeaderCell>
        <Table.HeaderCell width={3} sorted = {props.column === 'make' ? props.direction : null } onClick={() => props.handleSort('make')}>Make</Table.HeaderCell>
        <Table.HeaderCell width={3} sorted = {props.column === 'model' ? props.direction : null } onClick={() => props.handleSort('model')}>Model</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'year' ? props.direction : null } onClick={() => props.handleSort('year')}>Year</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'package' ? props.direction : null } onClick={() => props.handleSort('package')}>Package</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'fuelType' ? props.direction : null } onClick={() => props.handleSort('fuelType')}>Fuel Type</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'transmission' ? props.direction : null } onClick={() => props.handleSort('transmission')}>Transmission</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'favorite' ? props.direction : null } onClick={() => props.handleSort('favorite')}>Favorite</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

