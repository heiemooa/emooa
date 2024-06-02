---
nav: 组件
group: 
    title: 通用
    order: 0
order: 0
toc: content
---

# Button 按钮


## 何时使用

按钮是一种命令组件，可发起一个即时操作，响应用户点击行为。


- 五种类型：`primary` 主按钮、`secondary` 次按钮（默认）、`dashed` 虚线按钮、`outline` 线形按钮、`text` 文本按钮。
- 四种状态：`default` 默认、`danger` 危险、`success` 成功、`warning` 警告。
- 四种尺寸：`mini` 迷你、`small` 小、`mudume` 中（默认值）、`large`大。
- 三种形状：`square` 长方形 (默认), `circle` 圆形, `round` 全圆角。
- 其他：
    - 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
    - 链接：一般用于链接，即导航至某位置。
    - 组合按钮：可用在同级多项操作，以按钮组合方式出现。
    - 宽度自适应：按钮宽度随着容器宽度进行适配。

## 代码演示

<code src="../../packages/ui/examples/button/basic.tsx" description="按钮有五种类型：主按钮、次按钮、虚线按钮、线形按钮和文本按钮。主按钮在同一个操作区域最多出现一次。">基本用法</code>
<code src="../../packages/ui/examples/button/disabled.tsx" description="添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。">禁用状态</code>
<code src="../../packages/ui/examples/button/size.tsx" description="按钮分为：迷你、小、中、大，四种尺寸。高度分别为：24px/28px/32px/36px。推荐及默认为尺寸「中」。可在不同场景及不同业务需求选择适合尺寸。">按钮尺寸</code>
<code src="../../packages/ui/examples/button/shape.tsx" description="`Button` 有多种形状，`square` - 长方形 (默认), `circle` - 圆形, `round` - 全圆角。">按钮形状</code>
<code src="../../packages/ui/examples/button/loading.tsx" description="通过设置 `loading` 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件。">加载中</code>
<code src="../../packages/ui/examples/button/link.tsx" description="通过设置 `href` 可以让一个按钮变成 `a` 标签。">Link 按钮</code>
<code src="../../packages/ui/examples/button/group.tsx" description="可用在同级多项操作，以按钮组合方式出现。">组合按钮</code>
<code src="../../packages/ui/examples/button/full.tsx" description="通过设置 `full` ,可以使按钮宽度随着容器宽度进行适配。">宽度自适应</code>



## API

### Button

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| type      | `secondary` `primary` `dashed` `outline` `text`  | `secondary`   | 按钮主要分为五种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮	        |
| size      | `mini` `small` `medium` `large`                  | `medium`      | 按钮的尺寸		        |
| status    | `warning` `danger` `success` `default`           | `default`     | 按钮状态			        |
| shape     | `circle` `round` `square`                        | `square`      | 按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形			        |
| disabled  | `boolean`                        | -             | 是否禁用		|
| loading   | `boolean`                        | -             | 是否是加载状态  |
| full      | `boolean`                        | -             | 设置按钮的图标  |
| icon      | `ReactNode`                      | -             | 按钮宽度随容器自适应  |
| htmlType  | `button` `submit` `reset`        | -             | 按钮原生的 `html type` 类型	  |
| href      | `string`                         | -             | 添加跳转链接，设置此属性，`button` 表现跟 `a` 标签一致	  |
| target    | `_blank` `_self` `_parent` `_top`| -             | `a` 链接的 `target` 属性，`href` 存在时生效	  |
| anchorProps| `HTMLProps<HTMLAnchorElement>`  | -             | `a` 链接的原生属性，`href` 存在时生效，见 [文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)		  |

## 主题变量 Theme

### Button Token
// TODO
<!-- | **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- | -->

