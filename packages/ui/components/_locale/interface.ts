export interface Locale {
  locale: string;
  Image: {
    loading: string;
    fullScreen: string;
    rotateRight: string;
    rotateLeft: string;
    zoomIn: string;
    zoomOut: string;
    originalSize: string;
  };
  Modal: {
    noticeText: string;
    okText: string;
    cancelText: string;
  };
  Drawer: {
    okText: string;
    cancelText: string;
  };
  Document: {
    title: string;
    open: string;
  };
  Notification: {
    title: string;
  };
}
