import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App = () => (
  <GeoJSON
    fillStyle="green"
    data={{
      type: 'MultiPoint',
      coordinates: [
        [102.0, 0.0],
        [103.0, 1.0],
        [104.0, 0.0],
      ],
    }}
  />
);

export default App;
