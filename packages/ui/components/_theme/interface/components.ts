import type { ComponentToken as AppComponentToken } from '../../app/style';
import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as ModalComponentToken } from '../../modal/style';
import type { ComponentToken as IconComponentToken } from '../../icon/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as SpinComponentToken } from '../../spin/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as GeoJSONComponentToken } from '../../geojson/style';
import type { ComponentToken as WatermarkComponentToken } from '../../watermark/style';

export interface ComponentTokenMap {
  App?: AppComponentToken;
  Button?: ButtonComponentToken;
  Divider?: DividerComponentToken;
  Modal?: ModalComponentToken;
  Icon?: IconComponentToken;
  Spin?: SpinComponentToken;
  Space?: SpaceComponentToken;
  Image?: ImageComponentToken;
  GeoJSON?: GeoJSONComponentToken;
  Watermark?: WatermarkComponentToken;
}
