---
nav: Components
group:
  title: Data Entry
  order: 2
toc: content
demo:
  cols: 2
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
<code src="../../packages/ui/examples/geojson/mult-polygon.tsx" description="Polygon with hole.">Multpolygon</code>  
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

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of GeoJSON | `string` | - |
| style | The style of GeoJSON | `CSSProperties` | - |
| Data | [GeoJSON](https://geojson.org/) | `Point \| MultiPoint \| LineString \| MultiLineString \| Polygon \| MultiPolygon \| GeometryCollection \| Feature \| FeatureCollection` (Required) | - |
| fillStyle | The fill style color. | `string \| CanvasGradient \| CanvasPattern` | - |
| strokeStyle | The stroke style color. | `string \| CanvasGradient \| CanvasPattern` | #333 |
| globalAlpha | The opacity value range is between 0 and 1 | number | 1 |
| lineWidth | (px) The attribute represents the width of the line, and its value is a positive number. | number | 1 |

Other attributes [canvas.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
