import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import VehicleFilter from './VehicleFilter.jsx';

storiesOf('VehicleFilter', module)
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
        <VehicleFilter onSubmitFilter={action('Submit Filter')}/>
      )
    )
  );