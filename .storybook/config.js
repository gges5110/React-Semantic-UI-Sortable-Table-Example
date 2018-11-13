import React from 'react';
import {configure, addDecorator} from '@storybook/react';

function loadStories() {
  require('../src/VehicleFilter.story.js');
  require('../src/VehicleList.story.js');
  // require as many stories as you need.
}

addDecorator((story) => (
  <div style={{padding: "20px"}}>
    {story()}
  </div>
));

configure(loadStories, module);