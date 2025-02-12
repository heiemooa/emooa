import 'dayjs/locale/zh-cn';
import { Locale } from './interface';

const locale: Locale = {
  locale: 'zh-cn',
  Image: {
    loading: '加载中',
    fullScreen: '全屏',
    rotateRight: '向右旋轉',
    rotateLeft: '向左旋轉',
    zoomIn: '放大',
    zoomOut: '縮小',
    originalSize: '原始尺寸',
  },
  Modal: {
    noticeText: '好的',
    okText: '确定',
    cancelText: '取消',
  },
  Drawer: {
    okText: '确定',
    cancelText: '取消',
  },
  Document: {
    title: '文档中心',
    open: '新窗口查看文档',
  },
  Empty: {
    message: '暂无数据',
  },
};
export default locale;
