import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as IconComponentToken } from '../../icon/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as GeoJSONComponentToken } from '../../geojson/style';

export interface ComponentTokenMap {
  Button?: ButtonComponentToken;
  Divider?: DividerComponentToken;
  Icon?: IconComponentToken;
  Space?: SpaceComponentToken;
  Image?: ImageComponentToken;
  GeoJSON?: GeoJSONComponentToken;
}
