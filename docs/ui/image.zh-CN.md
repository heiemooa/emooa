---
nav: 组件
group:
    title: 数据展示
    order: 0
toc: content
---

# Image 图片


## 何时使用
需要进行图片懒加载的时候。


## 代码演示

<code src="../../packages/ui/examples/image/basic.tsx">基本用法</code>
<code src="../../packages/ui/examples/image/delay.tsx" description="通过设置 `delay` 默认开启延迟占位符，加载大图时超过一定时间将加载占位符。">延迟加载</code>
<code src="../../packages/ui/examples/image/placeholder.tsx" description="默认情况下，加载效果是不显示的，可通过设置 `placeholder=true` 显示默认加载效果。支持自定义占位符。">占位符</code>
<code src="../../packages/ui/examples/image/footer.tsx" description="通过设置 `title` 和 `description` 可以将图片的标题和描述显示在图片底部。">显示 Caption & Action</code>
<code src="../../packages/ui/examples/image/actions.tsx" description="通过设置 `actionsLayout` 可以调整预览控制条中功能按钮的顺序，同时可以过滤功能按钮，只有在 `actionsLayout` 中的按钮才会出现。其中 `extra` 代表 `actions` 中的按钮，而且 `actions` 中的 `key` 也支持单独拿出来排序。">自定义预览控制条</code>
<code src="../../packages/ui/examples/image/preview.tsx" description="`Image.Preview` 可单独使用，需要配置 `src`，并控制 `visible`。">单独使用预览组件</code>
<code src="../../packages/ui/examples/image/preview-group.tsx" description="用 `<Image.PreviewGroup>` 包裹 `<Image>` 组件即可进行多图预览。">多图预览</code>
<code src="../../packages/ui/examples/image/preview-group-btn.tsx" description="`Image.PreviewGroup` 可单独使用，需通过 `visible` 和 `onVisibleChange` 控制显隐。在图片的展示上分为两种场景，一是通过 `defaultCurrent` 指定第一张展示的图片；二是通过 `current` 和 `onChange` 以受控的方式控制当前显示的是第几张图片。">单独使用多图预览组件</code>
<code src="../../packages/ui/examples/image/popup-container.tsx" description="可以通过 `getPopupContainer` 指定预览挂载的父级节点。">挂载节点</code>
<code src="../../packages/ui/examples/image/process.tsx" description="设置 `lazy` 可以开启懒加载，当图片出现在视口才会进行加载。`lazy` 属性基于 `IntersectionObserver API` 实现。支持异步观察目标元素与祖先元素或顶级文档视口的交集变化，判断加载时机。">懒加载</code>
<code src="../../packages/ui/examples/image/error.tsx" description="加载失败显示图像失败占位符，支持设置 `error` 来自定义错误占位符。">容错处理</code>



## API

### Image

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| src | `string` | - | 图片地址 |
| title | `string` | - | 标题 |
| description | `string` | - | 描述 |
| placeholder | `boolean` `string` `React.ReactNode` | -- | 加载占位符 |
| preview | `boolean` | true | 是否开启预览 |
| motion | `boolean` | false | 是否开启加载成功的动画 |
| actions | `React.ReactNode[]` | -- | 额外操作 |
| error | `React.ReactNode` | -- | 错误占位符 |
| delay | `number` | -- | (ms) 如果在延迟时间范围内 url 未加载，则将渲染占位符。 |
| lazy | `boolean` [Lazy](#lazy) | - | `IntersectionObserver` 属性 API，异步观察目标元素与祖先元素或顶级文档视口的交集变化，判断加载时机。 |
| onError | (event: Event) => void | - | 图片加载失败时触发回调。 |
| onLoad | (event: Event) => void | - | 图片加载完成时触发回调。 |

其他更多属性见 [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

### Lazy

可选的 `Lazy Options` 属性参考 [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| root | React.ReactElement | null | [元素](https://developer.mozilla.org/en-US/docs/Web/API/Element) 或 [文档](https://developer.mozilla.org/en-US/docs/Web/API/Document)，其边界在测试相交时用作边界框。如果没有将根值传递给构造函数或其值为 null，则使用顶级文档的视口。 |
| rootMargin | string | "0px 0px 0px 0px" | 计算交叉点时应用于根的[边界框](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box)的偏移矩形，有效地缩小或增长根以进行计算。此属性返回的值可能与调用构造函数时指定的值不同，因为它可能会更改以匹配内部要求。每个偏移量可以用像素 (px) 或百分比 (%) 表示。默认值为“0px 0px 0px 0px”。 |
| thresholds | number | 0 | 阈值列表，按数字递增顺序排序，其中每个阈值是观察目标的交叉面积与边界框面积的比率。当超过某个目标的任何阈值时，就会生成该目标的通知。如果没有值传递给构造函数，则使用 0。 |


### Image.Preview

| **参数** | **类型** | **默认值** | **定义** |
|---|---|---|---|
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
|closable|`boolean` |true|是否显示关闭按钮|
|defaultVisible|`boolean`|-|默认是否可见，非受控|
|escToExit|`boolean`|true|按 `ESC` 键关闭预览|
|maskClosable|`boolean`|true|点击 mask 是否触发关闭|
|visible|`boolean`|-|是否可见，受控属性|
|src|`string`|-|图片获取地址, 在 Image 中默认是 Image 的 src|
|extra|`Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>`|-|图片属性，透传至预览弹窗中的 `img` 标签上|
|actionsLayout|`string[]` |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|控制条的布局|
|scales|`number[]` |`[25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ]`|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|
|actions|[ImagePreviewActionProps](#ImagePreviewActionProps)[] |-|额外操作，[ImagePreviewActionProps](#ImagePreviewActionProps)|
|getPopupContainer|() => HTMLElement |() => document.body|弹出层挂载的节点|
|imageRender|(originalNode: ReactElement) => ReactNode |-|自定义 IMG 元素的渲染|
|onVisibleChange|(visible: boolean, preVisible: boolean) => void |-|切换可见状态触发的事件|

### Image.PreviewGroup

| **参数** | **类型** | **默认值** | **定义** |
|---|---|---|---|
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
|closable|`boolean` |true|是否显示关闭按钮|
|defaultVisible|`boolean`|-|默认是否可见，非受控|
|escToExit|`boolean`|true|按 `ESC` 键关闭预览|
|maskClosable|`boolean`|true|点击 mask 是否触发关闭|
|visible|`boolean`|-|是否可见，受控属性|
|src|`string`|-|图片获取地址, 在 Image 中默认是 Image 的 src|
|extra|`Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>`|-|图片属性，透传至预览弹窗中的 `img` 标签上|
|actionsLayout|`string[]` |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|控制条的布局|
|scales|`number[]` |`[25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ]`|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|
|actions|[ImagePreviewActionProps](#ImagePreviewActionProps)[] |-|额外操作，[ImagePreviewActionProps](#ImagePreviewActionProps)|
|getPopupContainer|() => HTMLElement |() => document.body|弹出层挂载的节点|
|imageRender|(originalNode: ReactElement) => ReactNode |-|自定义 IMG 元素的渲染|
|onVisibleChange|(visible: boolean, preVisible: boolean) => void |-|切换可见状态触发的事件|
|loop|`boolean`|-|是否无限循环|
|current|`number` |-|当前展示的图片的下标 (受控属性)|
|defaultCurrent|`number`|-|第一张展示的图片的下标|
|items|`string[]` |`|图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）|
|onChange|(index: number) => void |-|切换图片触发的事件|
|onVisibleChange|(visible: boolean, preVisible: boolean) => void |-|换可见状态触发的事件|

### ImagePreviewActionProps

`<Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。

| **参数** | **类型** | **默认值** | **定义** |
|---|---|---|---|
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
|disabled|`boolean` |-|是否禁用|
|key|`string`|-|唯一标识|
|name|`string`|-|名称|
|content|`ReactNode`|-|内容|

