import React, { useRef, useEffect } from 'react';
import Context from '../context';
import classNames from 'classnames';

interface Properties {
  fillStyle?: string | CanvasGradient | CanvasPattern; // fill color
  strokeStyle?: string | CanvasGradient | CanvasPattern; // stroke color
  globalAlpha?: number; // The value range is between 0 and 1
  lineWidth?: number; // Default 1px
}

interface GeoBase {
  type:
    | 'Point'
    | 'MultiPoint'
    | 'LineString'
    | 'MultiLineString'
    | 'Polygon'
    | 'MultiPolygon'
    | 'GeometryCollection'
    | 'Feature'
    | 'FeatureCollection';
  properties?: {
    [key: string]: any;
  } & Properties;
}

type Coordinates = number[]; // [longitude, latitude]

export interface Point extends GeoBase {
  type: 'Point';
  coordinates: Coordinates;
}

export interface MultiPoint extends GeoBase {
  type: 'MultiPoint';
  coordinates: Coordinates[];
}

export interface LineString extends GeoBase {
  type: 'LineString';
  coordinates: Coordinates[];
}

export interface MultiLineString extends GeoBase {
  type: 'MultiLineString';
  coordinates: Coordinates[][];
}

export interface Polygon extends GeoBase {
  type: 'Polygon';
  coordinates: Coordinates[][];
}

export interface MultiPolygon extends GeoBase {
  type: 'MultiPolygon';
  coordinates: Coordinates[][][];
}

type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon;

export interface GeometryCollection extends GeoBase {
  type: 'GeometryCollection';
  geometries: Geometry[];
}

export interface Feature extends GeoBase {
  type: 'Feature';
  geometry: Geometry;
}

export interface FeatureCollection extends GeoBase {
  type: 'FeatureCollection';
  features: Feature[];
}

export interface CanvasProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > {
  data:
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon
    | GeometryCollection
    | Feature
    | FeatureCollection;
}

const GeoJSON: React.FC<CanvasProps & Properties> = (
  props: CanvasProps & Properties,
) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const {
    data,
    fillStyle,
    strokeStyle = '#333',
    globalAlpha = 1,
    lineWidth = 1,
    className,
    ...rest
  } = props;

  const { prefixCls, rootClassName } = React.useContext(Context);

  const classname = classNames(
    rootClassName,
    prefixCls,
    {
      [`${prefixCls}-geojson`]: true,
    },
    className,
  );

  const getLonlat = (geometries: Geometry[], index = 0 | 1): number[] => {
    return geometries
      .map(item => {
        switch (item.type) {
          case 'Point':
            return item.coordinates?.length ? [item.coordinates[index]] : [];
          case 'MultiPoint':
          case 'LineString':
            return item.coordinates?.map(coordinates => coordinates[index]);
          case 'MultiLineString':
          case 'Polygon':
            return item.coordinates
              ?.map(coordinates => coordinates.map(coord => coord[index]))
              .flat();
          case 'MultiPolygon':
            return item.coordinates
              ?.map(coordinates =>
                coordinates.map(coord => coord.map(c => c[index])),
              )
              .flat(2)
              .flat();
          default:
            return [];
        }
      })
      .flat();
  };

  const getGeometries = (): Geometry[] => {
    switch (data.type) {
      case 'Point':
      case 'MultiPoint':
      case 'LineString':
      case 'MultiLineString':
      case 'Polygon':
      case 'MultiPolygon':
        return [data];
      case 'GeometryCollection':
        return data.geometries;
      case 'Feature':
        return [
          {
            ...data.geometry,
            properties: Object.assign(
              {},
              data.properties,
              data.geometry.properties,
            ),
          },
        ];
      case 'FeatureCollection':
        return data.features.map(feature => ({
          ...feature.geometry,
          properties: Object.assign(
            {},
            data.properties,
            feature.properties,
            feature.geometry.properties,
          ),
        }));
    }
  };

  const getScaleMinMaxOffset = (
    geometries: Geometry[],
    { height, width }: { height: number; width: number },
  ) => {
    const longitudes = getLonlat(geometries, 0);
    const latitudes = getLonlat(geometries, 1);

    const xMax = longitudes.reduce(function (max, current) {
      return Math.max(max, current);
    }, -Infinity); // 初始值设置为负无穷，以确保数组中的任何值都能成为最大值

    const xMin = longitudes.reduce(function (min, current) {
      return Math.min(min, current);
    }, Infinity); // 初始值设置为正无穷，以确保数组中的任何值都能成为最小值

    const yMax = latitudes.reduce(function (max, current) {
      return Math.max(max, current);
    }, -Infinity); // 初始值设置为负无穷，以确保数组中的任何值都能成为最大值

    const yMin = latitudes.reduce(function (min, current) {
      return Math.min(min, current);
    }, Infinity); // 初始值设置为正无穷，以确保数组中的任何值都能成为最小值

    // // 拿到方向轴的最大最小值
    // const xMax = Math.max(...longitudes);
    // const xMin = Math.min(...longitudes);
    // const yMax = Math.max(...latitudes);
    // const yMin = Math.min(...latitudes);

    // 根据canvas宽高计算缩放级别
    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);
    const scale = (xScale < yScale ? xScale : yScale) * 0.9;
    // 计算偏移量
    const xoffset = (width - Math.abs(xMax - xMin) * scale) / 2;
    const yoffset = (height - Math.abs(yMax - yMin) * scale) / 2;

    return {
      scale,
      xMin,
      xMax,
      yMin,
      yMax,
      xoffset,
      yoffset,
      height,
      width,
    };
  };

  const getOffsetGeometries = (
    geometries: Geometry[],
    {
      scale,
      xMin,
      xMax,
      yMin,
      yMax,
      xoffset,
      yoffset,
    }: {
      scale: number;
      xMin: number;
      xMax: number;
      yMin: number;
      yMax: number;
      xoffset: number;
      yoffset: number;
    },
  ): Geometry[] => {
    return geometries.map((geometry: Geometry): Geometry => {
      switch (geometry.type) {
        case 'Point':
          if (scale === Infinity) return geometry;
          return {
            ...geometry,
            type: geometry.type,
            coordinates: [
              (geometry.coordinates[0] - xMin) * scale + xoffset,
              (yMax - geometry.coordinates[1]) * scale + yoffset,
            ],
          };
        case 'MultiPoint':
        case 'LineString':
          return {
            ...geometry,
            type: geometry.type,
            coordinates: geometry.coordinates?.map(
              (coordinate: Coordinates) => [
                (coordinate[0] - xMin) * scale + xoffset,
                (yMax - coordinate[1]) * scale + yoffset,
              ],
            ) as Coordinates[],
          };
        case 'MultiLineString':
        case 'Polygon':
          return {
            ...geometry,
            type: geometry.type,
            coordinates: geometry.coordinates?.map(
              (coordinate: Coordinates[]) =>
                coordinate?.map((coord: Coordinates) => [
                  (coord[0] - xMin) * scale + xoffset,
                  (yMax - coord[1]) * scale + yoffset,
                ]),
            ) as Coordinates[][],
          };
        case 'MultiPolygon':
          return {
            ...geometry,
            type: geometry.type,
            coordinates: geometry.coordinates?.map(
              (coordinate: Coordinates[][]) =>
                coordinate.map((coord: Coordinates[]) =>
                  coord.map((c: Coordinates) => [
                    (c[0] - xMin) * scale + xoffset,
                    (yMax - c[1]) * scale + yoffset,
                  ]),
                ),
            ),
          };
      }
    });
  };

  const draw = (
    ctx: CanvasRenderingContext2D,
    geometries: Geometry[],
    scaleMinMaxOffset: {
      scale: any;
      xMin: number;
      xMax: number;
      yMin: number;
      yMax: number;
      xoffset: number;
      yoffset: number;
      height: any;
      width: any;
    },
  ) => {
    const { scale, width, height } = scaleMinMaxOffset;

    ctx.clearRect(0, 0, width, height);
    geometries.forEach(geometry => {
      switch (geometry.type) {
        case 'Point':
          if (scale === Infinity) {
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
            ctx.fillStyle =
              geometry.properties?.fillStyle || fillStyle || '#333';
            ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(
              geometry.coordinates[0],
              geometry.coordinates[1],
              4,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle =
              geometry.properties?.fillStyle || fillStyle || '#333';
            ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
            ctx.fill();
          }
          break;
        case 'MultiPoint':
          if (scale === Infinity) {
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 4, 0, Math.PI * 2);
            ctx.fillStyle =
              geometry.properties?.fillStyle || fillStyle || '#333';
            ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
            ctx.fill();
          } else {
            geometry.coordinates.forEach(c => {
              ctx.beginPath();
              ctx.arc(c[0], c[1], 4, 0, Math.PI * 2);
              ctx.fillStyle =
                geometry.properties?.fillStyle || fillStyle || '#333';
              ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
              ctx.fill();
            });
          }
          break;
        case 'LineString':
          ctx.beginPath();
          ctx.strokeStyle = geometry.properties?.strokeStyle || strokeStyle;
          ctx.lineWidth = geometry.properties?.lineWidth ?? lineWidth;
          ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
          ctx.fillStyle = '#fff0';
          ctx.moveTo(geometry.coordinates[0][0], geometry.coordinates[0][1]);
          geometry.coordinates.forEach(c => {
            ctx.lineTo(c[0], c[1]);
          });
          ctx.stroke();
          ctx.fill();
          break;
        case 'MultiLineString':
          geometry.coordinates.forEach((c, index) => {
            ctx.beginPath();
            ctx.strokeStyle = geometry.properties?.strokeStyle || strokeStyle;
            ctx.lineWidth = geometry.properties?.lineWidth ?? lineWidth;
            ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
            ctx.fillStyle = '#fff0';
            ctx.moveTo(c[0][0], c[0][1]);
            c.forEach(_c => {
              ctx.lineTo(_c[0], _c[1]);
            });
            ctx.stroke();
            ctx.fill();
          });
          break;
        case 'Polygon':
          geometry.coordinates.forEach((c, index) => {
            ctx.beginPath();
            ctx.strokeStyle = geometry.properties?.strokeStyle || strokeStyle;
            ctx.lineWidth = geometry.properties?.lineWidth ?? lineWidth;
            ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
            ctx.fillStyle =
              geometry.properties?.fillStyle || fillStyle || '#fff0';
            ctx.moveTo(c[0][0], c[0][1]);
            c.forEach(_c => {
              ctx.lineTo(_c[0], _c[1]);
            });
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          });
          break;
        case 'MultiPolygon':
          geometry.coordinates.forEach(c => {
            c.forEach(_c => {
              ctx.beginPath();
              ctx.strokeStyle = geometry.properties?.strokeStyle || strokeStyle;
              ctx.lineWidth = geometry.properties?.lineWidth ?? lineWidth;
              ctx.globalAlpha = geometry.properties?.globalAlpha ?? globalAlpha;
              ctx.fillStyle =
                geometry.properties?.fillStyle || fillStyle || '#fff0';
              ctx.moveTo(_c[0][0], _c[0][1]);
              _c.forEach(__c => {
                ctx.lineTo(__c[0], __c[1]);
              });
              ctx.closePath();
              ctx.stroke();
              ctx.fill();
            });
          });
          break;
        default:
          break;
      }
    });
  };
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas?.getContext?.('2d');
    if (!ctx) return;

    if (!data || Object.keys(data).length === 0) return;

    // 获取 Canvas 的实际显示大小
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    // 将 Canvas 的分辨率设置为实际显示大小
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    const width = canvas.width;
    const height = canvas.height;

    const geometries = getGeometries();

    const scaleMinMaxOffset = getScaleMinMaxOffset(geometries, {
      width,
      height,
    });

    const offsetGeometries = getOffsetGeometries(geometries, scaleMinMaxOffset);

    draw(ctx, offsetGeometries, scaleMinMaxOffset);
  }, [data]);

  return <canvas className={classname} ref={ref} {...rest} />;
};

export default GeoJSON;
