import React from 'react';
import ReactDOM from 'react-dom';

import VehicleList from './VehicleList.jsx';

var contentNode = document.getElementById('contents');
var component = <h1>Hello World!</h1>;        // A simple component, written in JSX
ReactDOM.render(component, contentNode);      // Render the component inside the content Node
