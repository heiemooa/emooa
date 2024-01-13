

## Usage

#### Simple examples

Point

```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    data={{
      type: 'Point',
      coordinates: [105.0, 1.0],
    }}
  />
);
```

LineString
```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    data={{
      type: 'LineString',
      coordinates: [
        [102.0, 0.0],
        [103.0, 1.0],
        [104.0, 0.0],
      ],
    }}
  />
);
```

Polygon

```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    data={{
      type: 'Polygon',
      coordinates: [
        [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
        ],
      ],
    }}
  />
);
```

## GeoJSON

GeoJSON objects are divided into three types: geometric objects, feature objects, and feature collection objects. [Read More](https://blog.emooa.com/2023/10/10/geojson/)

- Geometric objects
  - Point
  - MultiPoint
  - LineString
  - MultiLineString
  - Polygon
  - MultiPolygon
  - GeometryCollection
- Feature object 
  - Feature
- FeatureCollection object
  - FeatureCollection

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| Data |`Point`｜`MultiPoint`｜`LineString`｜`MultiLineString`｜`Polygon`｜`MultiPolygon`｜`GeometryCollection`｜`Feature`｜`FeatureCollection` (Required) | - | [GeoJSON](https://geojson.org/) |
| fillStyle | `string`｜`CanvasGradient`｜`CanvasPattern` | - | The fill style color. |
| strokeStyle | `string`｜`CanvasGradient`｜`CanvasPattern` | #333 | The stroke style color. |
| globalAlpha | number | 1 | The opacity value range is between 0 and 1 |
| lineWidth | number | 1 | (px) The attribute represents the width of the line, and its value is a positive number. |

其他更多属性见 [canvas.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)

### Properties Examples

Geometry properties

```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    data={{
      type: 'Polygon',
      coordinates: [
        [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
        ],
      ],
      properties: {
        fillStyle: 'green',
        strokeStyle: 'red',
        globalAlpha: 1,
        lineWidth: 2,
      }
    }}
  />
);
```

Parent's properties

- If the geometry parent defines properties, it will apply to geometric objects.

```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    data={{
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [102.0, 0.5],
            properties: {
              fillStyle: 'green',
            },
          },
          properties: {
            strokeStyle: 'pink',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [
              [
                [104.0, 1.0],
                [105.0, 2.0],
                [106.0, 1.0],
                [107.0, 2.0],
              ],
              [
                [103.0, 1.0],
                [104.0, 2.0],
                [105.0, 1.0],
                [106.0, 2.0],
              ],
            ],
          },
          properties: {
            strokeStyle: 'blue',
          },
        },
      ],
    }}
  />
);
```

Component's properties

- If the component parameters define canvas properties, it will apply to geometric objects.

```tsx
import { GeoJSON } from "@emooa/ui";

export default () => (
  <GeoJSON
    fillStyle="green"
    globalAlpha={1}
    data={{
      type: 'Polygon',
      coordinates: [
        [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
        ],
      ],
      properties: {
        strokeStyle: 'red',
        globalAlpha: 0.5,
      }
    }}
  />
);
```