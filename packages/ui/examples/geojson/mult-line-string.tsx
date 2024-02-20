import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App: React.FC = () => (
  <GeoJSON
    strokeStyle="green"
    data={{
      type: 'MultiLineString',
      coordinates: [
        [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0],
        ],
        [
          [102.0, 1.0],
          [103.0, 2.0],
          [104.0, 1.0],
          [105.0, 2.0],
        ],
      ],
    }}
  />
);

export default App;
