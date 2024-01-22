---
nav: 组件
group: 通用
order: 0
toc: content
demo:
  cols: 2
---

# Icon 图标

这是一种全新的使用方式，应该说这才是未来的主流。这种用法其实是做了一个svg的集合，具有如下特点：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
- 在低端设备上 SVG 有更好的清晰度。
- 支持多色图标。
- 所有的图标都会以 `<svg>` 标签渲染并继承 `<svg>` 的所有属性api，可以使用 color 和 className 设置图标的大小和单色图标的颜色。例如：

```bash
import { Icon } from '@emooa/ui';

export default () => (
  <>
    <Icon type="icon-image-fill" color="red" />
  </>
);

```

## 何时使用

- 海量 `Emooa UI iconfont` 图标。  
- 支持导入自定义的 [iconfont](https://www.iconfont.cn/) 图标。  
- 支持像 `css` 字体那样，通过 `font-size`, `color`来调整样式。  




## 代码演示

<code src="../../packages/ui/examples/icon/basic.tsx" description="支持自定义图标颜色。">基本用法</code>
<code src="../../packages/ui/examples/icon/size.tsx" description="支持设置图标大小。">图标大小</code>
<code src="../../packages/ui/examples/icon/iconfont.tsx" description="对于使用 [iconfont.cn](https://www.iconfont.cn/) 的用户，通过设置 `createFromIconfontCN` 方法参数对象中的 `url` 字段， 即可轻松地使用已有项目中的图标。">使用 iconfont.cn</code>
<code src="../../packages/ui/examples/icon/iconfont2.tsx" description="`url` 可引用多个资源，用户可灵活的管理 [iconfont.cn](https://www.iconfont.cn/) 图标。如果资源的图标出现重名，会按照数组顺序进行覆盖。">使用 iconfont.cn 的多个资源</code>


## API

### Icon

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -       | 设置图标的样式名                              |
| style     | `CSSProperties`       | -       | 设置图标的样式，例如 `fontSize` 和 `color`	   |
| type      | `string`              | -       | 图片名称	                                 	    |
| color     | `string`              | -       | 颜色	                                 	    |
| spin      | `boolean`             | false   | 是否有旋转动画	                         	    |

其他属性见 [svg.](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)


### 从 iconfont.cn 加载 Icon

```bash
import { Icon } from '@emooa/ui';

const IconFont = Icon.createFromIconfontCN({
  url: 'xxx',
});

```
这个 url 是在 iconfont.cn 上你创建的项目或者加入的项目，symbol 模式导出的 url。

原理是创建了一个使用 `<use>` 标签来渲染图标的组件。

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| url       | `string` `string[]`            | -  | [iconfont.cn](https://www.iconfont.cn/) 项目在线生成的 js 地址 |
| options   | `{ [key: string]: any }`       | -  | 给 `svg` 标签设置额外的属性	                                   |
