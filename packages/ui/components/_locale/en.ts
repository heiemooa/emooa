import 'dayjs/locale/en';
import { Locale } from './interface';

const locale: Locale = {
  locale: 'en',
  Image: {
    loading: 'Loading',
    fullScreen: 'Full Screen',
    rotateRight: 'Rotate Right',
    rotateLeft: 'Rotate Left',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    originalSize: 'Original Size',
  },
  Modal: {
    noticeText: 'OK',
    okText: ' OK',
    cancelText: 'Cancel',
  },
  Drawer: {
    okText: ' OK',
    cancelText: 'Cancel',
  },
  Document: {
    title: 'Document Center',
    open: 'View document in new window',
  },
  Empty: {
    message: 'No data',
  },
};
export default locale;
