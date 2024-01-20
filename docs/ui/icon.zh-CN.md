---
nav: 组件
group: 通用
order: 0
toc: content
---

# Icon 图标

这是一种全新的使用方式，应该说这才是未来的主流。这种用法其实是做了一个svg的集合，具有如下特点：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
- 在低端设备上 SVG 有更好的清晰度。
- 支持多色图标了，不再受单色限制。
- 所有的图标都会以 `<svg>` 标签渲染并继承 `<svg>` 的所有属性api，可以使用 color 和 className 设置图标的大小和单色图标的颜色。例如：

```bash
import { Icon } from '@emooa/ui';

export default () => (
  <>
    <Icon icon="icon-image-fill" color="red" />
  </>
);

```



## 何时使用

- 海量 `Emooa UI iconfont` 图标。  
- 支持导入自定义的 [iconfont](https://www.iconfont.cn/) 图标。  
- 支持像 `css` 字体那样，通过 `font-size`, `color`来调整样式。  




## 代码演示

<code src="../../packages/ui/examples/icon/basic.tsx">基本用法</code>
