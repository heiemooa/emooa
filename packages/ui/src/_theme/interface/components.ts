import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as GeoJSONComponentToken } from '../../geojson/style';

export interface ComponentTokenMap {
  Space?: SpaceComponentToken;
  Image?: ImageComponentToken;
  GeoJSON?: GeoJSONComponentToken;
}
