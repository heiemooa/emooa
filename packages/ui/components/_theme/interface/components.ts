import type { ComponentToken as AppComponentToken } from '../../app/style';
import type { ComponentToken as ButtonComponentToken } from '../../button/style';
import type { ComponentToken as BacktopComponentToken } from '../../backtop/style';
import type { ComponentToken as DividerComponentToken } from '../../divider/style';
import type { ComponentToken as DrawerComponentToken } from '../../drawer/style';
import type { ComponentToken as MessageComponentToken } from '../../message/style';
import type { ComponentToken as ModalComponentToken } from '../../modal/style';
import type { ComponentToken as IconComponentToken } from '../../icon/style';
import type { ComponentToken as DocumentComponentToken } from '../../document/style';
import type { ComponentToken as SpaceComponentToken } from '../../space/style';
import type { ComponentToken as SpinComponentToken } from '../../spin/style';
import type { ComponentToken as ImageComponentToken } from '../../image/style';
import type { ComponentToken as GeoJSONComponentToken } from '../../geojson/style';
import type { ComponentToken as WatermarkComponentToken } from '../../watermark/style';

export interface ComponentTokenMap {
  App?: AppComponentToken;
  Backtop?: BacktopComponentToken;
  Button?: ButtonComponentToken;
  Drawer?: DrawerComponentToken;
  Divider?: DividerComponentToken;
  Message?: MessageComponentToken;
  Modal?: ModalComponentToken;
  Icon?: IconComponentToken;
  Document?: DocumentComponentToken;
  Spin?: SpinComponentToken;
  Space?: SpaceComponentToken;
  Image?: ImageComponentToken;
  GeoJSON?: GeoJSONComponentToken;
  Watermark?: WatermarkComponentToken;
}
