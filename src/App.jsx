import React from 'react';
import ReactDOM from 'react-dom';

import VehicleList from './VehicleList.jsx';

var contentNode = document.getElementById('contents');
ReactDOM.render(<VehicleList />, contentNode);      // Render the component inside the content Node
