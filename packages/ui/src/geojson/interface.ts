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

export type Coordinates = number[]; // [longitude, latitude]

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

export type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;

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

interface CanvasProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
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

export type GeoJSONProps = CanvasProps & Properties;
