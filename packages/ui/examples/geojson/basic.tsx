import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App = () => (
  <GeoJSON
    fillStyle="Honeydew"
    data={{
      type: 'Polygon',
      coordinates: [
        [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [102.0, 0.0],
        ],
      ],
      properties: {
        strokeStyle: 'green',
        lineWidth: 2,
        globalAlpha: 0.5,
      },
    }}
  />
);

export default App;
