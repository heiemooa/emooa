import React from 'react';
import { GeoJSON } from '@emooa/ui';

const App = () => (
  <GeoJSON
    style={{ width: '100%', height: 200 }}
    fillStyle="Honeydew"
    data={{
      type: 'GeometryCollection',
      geometries: [
        {
          type: 'Point',
          coordinates: [99.0, 2],
          properties: {
            fillStyle: 'green',
          },
        },
        {
          type: 'MultiPoint',
          coordinates: [
            [98.0, 0.0],
            [99.0, 1.0],
            [100.0, 0.0],
          ],
          properties: {
            fillStyle: 'orange',
          },
        },
        {
          type: 'LineString',
          coordinates: [
            [101.0, 0.0],
            [102.0, 0.5],
            [103.0, 0.0],
            [104.0, 0.5],
          ],
          properties: {
            strokeStyle: 'green',
          },
        },
        {
          type: 'MultiLineString',
          coordinates: [
            [
              [101.0, 1.0],
              [102.0, 1.5],
              [103.0, 1.0],
              [104.0, 1.5],
            ],
            [
              [101.0, 1.5],
              [102.0, 2.0],
              [103.0, 1.5],
              [104.0, 2.0],
            ],
          ],
          properties: {
            strokeStyle: 'blue',
          },
        },
        {
          type: 'Polygon',
          coordinates: [
            [
              [105.0, 1.0],
              [105.0, 0.0],
              [106.0, 0.0],
              [106.0, 1.0],
            ],
            [
              [107.0, 1.0],
              [107.0, 0.0],
              [108.0, 0.0],
              [108.0, 1.0],
            ],
          ],
          properties: {
            strokeStyle: 'red',
          },
        },
        {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [105.0, 3.0],
                [105.0, 2.0],
                [106.0, 2.0],
                [106.0, 3.0],
              ],
              [
                [107.0, 3.0],
                [107.0, 2.0],
                [108.0, 2.0],
                [108.0, 3.0],
              ],
            ],
          ],
          properties: {
            strokeStyle: 'DarkCyan',
          },
        },
      ],
    }}
  />
);

export default App;
