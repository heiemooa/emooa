---
nav: 组件
group:
  title: 数据展示
  order: 0
toc: content
---

# Description 描述列表

## 何时使用

一般用于详情页的信息展示。

## 代码演示

<code src="../../packages/ui/examples/description/basic.tsx" description="简单的展示。">基本用法</code>  
<code src="../../packages/ui/examples/description/column.tsx" description="通过 `column` 属性设置列数展示，并支持修改列表样式。">列数与样式</code>  
<code src="../../packages/ui/examples/description/layout.tsx" description="有水平排列、垂直排列、行内水平排列、行内垂直排列四种排列模式。">排列方式</code>  
<code src="../../packages/ui/examples/description/bordered.tsx" description="通过参数 `bordered`，可以添加边框。">边框</code>  
<code src="../../packages/ui/examples/description/size.tsx" description="通过参数 `size`，展示不同尺寸下的描述列表。">不同尺寸</code>  
<code src="../../packages/ui/examples/description/span.tsx" description="支持响应式排列。">响应式排列</code>

## API

### Description

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| classNames | 组件名称 | `title?: string; label?: string; value?: string;` | - |
| style | 组件样式 | `CSSProperties` | - |
| styles | 组件样式 | `title?: CSSProperties; label?: CSSProperties; value?: CSSProperties;` | - |
| border | 是否显示边框 | `boolean` | - |
| layout | 排列方式 | `horizontal \| vertical \| inline-horizontal \| inline-vertical` | `horizontal` |
| size | 描述列表的尺寸，如不指定默认为 `default` | `mini \| small \| medium \| default \| large` | - |
| colon | 是否展示标签文字后冒号 | `ReactNode` | - |
| title | 标题 | `ReactNode` | - |
| column | 一行放置几列数据，一个数据为一列。支持配置 `column` 为数字或者对象，配置对象格式时，支持配置为 `{ xs: 1, md: 2, lg: 3 }` 这种形式来支持响应式排列 | `number \| {xs?: number;sm?: number;md?: number;lg?: number;xl?: number;xxl?: number;xxxl?: number;}` | `3` |
| items | 描述列表的数据 | [DescriptionItemProps](#descriptionitemprops) | - |

### DescriptionItemProps

```js
export type DescriptionItemProps = {
  key?: React.Key,
  label?: ReactNode,
  value?: ReactNode,
  span?: number,
}[];
```
