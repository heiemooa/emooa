---
nav: Component
group: General
order: 1
toc: content
---

# GeoJSON

## Usage

When you need to visually load GeoJSON geographic data.  
Draw via Canvas and fill with color.


## Examples

<code src="../../packages/ui/examples/geojson/basic.tsx" description="If the component defines a canvas property, it will be inherited and applied to the geometry object.">Basic</code>
<code src="../../packages/ui/examples/geojson/point.tsx" description="The single point is displayed in the middle area of ​​the canvas by default.">Point</code>
<code src="../../packages/ui/examples/geojson/mult-point.tsx" description="Multipoint will calculate the geographical coordinates and draw them on the canvas area in equal proportions.">MultiPoint</code>
<code src="../../packages/ui/examples/geojson/line-string.tsx">LineString</code>
<code src="../../packages/ui/examples/geojson/mult-line-string.tsx">MultiLineString</code>
<code src="../../packages/ui/examples/geojson/polygon.tsx">Polygon</code>
<code src="../../packages/ui/examples/geojson/mult-polygon.tsx">Multpolygon</code>
<code src="../../packages/ui/examples/geojson/geometry-collection.tsx">GeometryCollection</code>
<code src="../../packages/ui/examples/geojson/feature.tsx" description="If the component defines a canvas property, it will be inherited and applied to the feature object, and the properties of the feature object will also be inherited and applied to the geometry object. Characteristic object types include `Point`、`MultiPoint`、`LineString`、`MultiLineString`、`Polygon` adn `MultiPolygon`。">Feature</code>
<code src="../../packages/ui/examples/geojson/feature-collection.tsx" description="While inheriting the component canvas properties, it supports setting properties individually for each Feature object.">Feature</code>
<code src="../../packages/ui/examples/geojson/load-feature-collection.tsx">Async Data</code>



## API

### GeoJSON

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
| Data |`Point` `MultiPoint` `LineString` `MultiLineString` `Polygon` `MultiPolygon` `GeometryCollection` `Feature` `FeatureCollection` (Required) | - | [GeoJSON](https://geojson.org/) |
| fillStyle | `string` `CanvasGradient` `CanvasPattern` | - | The fill style color. |
| strokeStyle | `string` `CanvasGradient` `CanvasPattern` | #333 | The stroke style color. |
| globalAlpha | number | 1 | The opacity value range is between 0 and 1 |
| lineWidth | number | 1 | (px) The attribute represents the width of the line, and its value is a positive number. |

Other attributes [canvas.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
