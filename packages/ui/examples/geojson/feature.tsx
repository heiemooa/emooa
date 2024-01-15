import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App = () => (
  <GeoJSON
    lineWidth={5}
    data={{
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100, 0],
            [101, 0],
            [101, 1],
            [100, 1],
            [100, 0],
          ],
          [
            [102.0, 2.0],
            [103.0, 2.0],
            [103.0, 3.0],
            [102.0, 3.0],
            [102.0, 2.0],
          ],
        ],
        properties: {
          fillStyle: 'Honeydew',
        },
      },
      properties: {
        strokeStyle: 'green',
      },
    }}
  />
);

export default App;
