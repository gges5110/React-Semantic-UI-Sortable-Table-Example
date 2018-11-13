import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import VehicleList from './VehicleList.jsx';

storiesOf('VehicleList', module)
  .add('Standard form',
    withInfo(
      {
        inline: true,
        text: `
        description or documentation about my component, supports markdown
      
        ~~~js
        <VehicleFilter onSubmitFilter={action('Submit Filter')}/>
        ~~~
      
      `
      }
    )(
      () => (
        <VehicleList onSubmitFilter={action('Submit Filter')}/>
      )
    )
  );