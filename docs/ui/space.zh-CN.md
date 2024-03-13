---
nav: 组件
group: 
    title: 布局
    order: 1
order: 0
toc: content
---

# Space 间距


## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## 代码演示

<code src="../../packages/ui/examples/space/basic.tsx" description="相邻组件水平间距。">基本用法</code>
<code src="../../packages/ui/examples/space/direction-vertical.tsx" description="相邻组件垂直间距。">垂直间距</code>
<code src="../../packages/ui/examples/space/size.tsx" description="使用 size 设置元素之间的间距，预设了 `small`、`middle`、`medium`、`large` 四种尺寸，也可以自定义间距，若不设置 `size`，则默认为 `small`。">间距大小</code>
<code src="../../packages/ui/examples/space/align.tsx" description="设置对齐模式。">对齐</code>
<code src="../../packages/ui/examples/space/split.tsx" description="相邻组件分隔符。">分隔符</code>


## API

### Space

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| align     | `start` `end` `center` `baseline` | -            | 对齐方式	        |
| direction | `vertical` `horizontal`           | `horizontal` | 间距方向	        |
| size      | [Size](#size) ｜[Size[]](#size)   | `small`      | 间距大小	        |
| split     | `ReactNode`                       | -            | 设置拆分	        |
| wrap      | `boolean`                         | true         | 是否自动换行        |

### Size

`mini` | `small` | `medium` | `large` | `number`

## 主题变量 Theme

## Token
| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| paddingXXS    | `number` | 4        | 控制元素的最小内间距，对应 size 为 `mini`。   |
| paddingXS     | `number` | 8        | 控制元素的小内间距，对应 size 为 `small`。    |
| padding       | `number` | 16       | 控制元素的内间距，对应 size 为 `medium` 。    |
| paddingLG     | `number` | 24       | 控制元素的大内间距，对应 size 为 `large`。  |
