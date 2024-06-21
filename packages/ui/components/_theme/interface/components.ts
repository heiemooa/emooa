import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as IconComponentToken } from '../../icon/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as GeoJSONComponentToken } from '../../geojson/style';
import type { ComponentToken as WatermarkComponentToken } from '../../watermark/style';

export interface ComponentTokenMap {
  Button?: ButtonComponentToken;
  Divider?: DividerComponentToken;
  Icon?: IconComponentToken;
  Space?: SpaceComponentToken;
  Image?: ImageComponentToken;
  GeoJSON?: GeoJSONComponentToken;
  Watermark?: WatermarkComponentToken;
}
