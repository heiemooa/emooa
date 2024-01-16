import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App = () => (
  <>
    <GeoJSON
      data={{
        type: 'Point',
        coordinates: [102.0, 0.0],
        properties: {
          fillStyle: 'red',
        },
      }}
    />
  </>
);

export default App;
