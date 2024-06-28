---
nav: Component
group: 
    title: 数据展示
    order: 2
toc: content
demo:
  cols: 2
---

# GeoJSON 地理数据


## 何时使用
需要可视化加载 GeoJSON 地理数据时。  
通过 Canvas 绘制几何，填充颜色，设置透明度等。


## 代码演示

<code src="../../packages/ui/examples/geojson/basic.tsx" description="如果组件定义了画布属性，它将被继承并应用于几何对象。">基本用法</code>
<code src="../../packages/ui/examples/geojson/point.tsx" description="单点默认显示在画布中间区域。">Point 点</code>
<code src="../../packages/ui/examples/geojson/mult-point.tsx" description="多点将计算地理坐标等比例绘制在画布区域。">MultiPoint 多点</code>
<code src="../../packages/ui/examples/geojson/line-string.tsx">LineString 线</code>
<code src="../../packages/ui/examples/geojson/mult-line-string.tsx">MultiLineString 多线</code>
<code src="../../packages/ui/examples/geojson/polygon.tsx">Polygon 多边形</code>
<code src="../../packages/ui/examples/geojson/mult-polygon.tsx" description="带孔多边形">Multpolygon 多多边形</code>
<code src="../../packages/ui/examples/geojson/geometry-collection.tsx">GeometryCollection 几何集合</code>
<code src="../../packages/ui/examples/geojson/feature.tsx" description="特征对象几何类型包括 `Point`点、`MultiPoint`多点、`LineString`线、`MultiLineString`多线、`Polygon`多边形和`MultiPolygon`多多边形。<br>如果组件定义了画布属性，它将被继承并应用于特征对象，并且特征对象的属性也将被继承并应用于几何对象。">Feature 特征对象</code>
<code src="../../packages/ui/examples/geojson/feature-collection.tsx" description="在继承组件画布属性的同时，支持为每个 Feature 特征对象单独设置属性。">FeatureCollection 特征集合对象</code>
<code src="../../packages/ui/examples/geojson/load-feature-collection.tsx">异步数据渲染</code>


## API

### GeoJSON

`GeoJSON` 对象分为三种：几何对象、特征对象、特征集合对象。 [查看更多](https://blog.emooa.com/2023/10/10/geojson/)

- 几何对象
  - Point
  - MultiPoint
  - LineString
  - MultiLineString
  - Polygon
  - MultiPolygon
  - GeometryCollection
- 特征对象
  - Feature
- 特征集合对象
  - FeatureCollection

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| Data |`Point` `MultiPoint` `LineString` `MultiLineString` `Polygon` `MultiPolygon` `GeometryCollection` `Feature` `FeatureCollection` (必填) | - | [GeoJSON](https://geojson.org/) |
| fillStyle | `string` `CanvasGradient` `CanvasPattern` | - | 填充颜色 |
| strokeStyle | `string` `CanvasGradient` `CanvasPattern` | #333 | 线条颜色 |
| globalAlpha | number | 1 | 透明度: 0-1 |
| lineWidth | number | 1 | (px) 线条宽度 |

其他更多属性见 [canvas.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
