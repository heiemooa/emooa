---
nav: 组件
group:
  title: 布局
  order: 1
toc: content
---

# Divider 分割线

## 何时使用

- 对不同章节的文本段落进行分割。默认为水平分割线，可在中间加入文字。
- 对行内文字/链接进行分割，例如表格的操作 Actions。

## 代码演示

<code src="../../packages/ui/examples/divider/basic.tsx" description="对不同章节的文本段落进行分割，默认为水平分割线，支持虚线。">基本用法</code>  
<code src="../../packages/ui/examples/divider/orientation.tsx" description="通过 orientation 指定分割线文字的位置。">带有文字的分割线</code>  
<code src="../../packages/ui/examples/divider/vertical.tsx" description='使用 type="vertical" 设置为行内的垂直分割线。'>垂直分割线</code>  
<code src="../../packages/ui/examples/divider/color.tsx" description='使用 `color` 属性修改默认线颜色。'>线颜色</code>

## API

### Divider

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| orientation | 分割线文字的位置 | `left \| right \| center` | `center` |
| type | 分割线的类型，是水平还是竖直，分别对应 `horizontal` 和 `vertical` | `horizontal \| vertical` | `horizontal` |
| dashed | 是否虚线 | `boolean` | - |
| color | 线条颜色 | `string` | - |

## 主题变量 Theme

### Divider Token

| **参数**             | **定义**       | **类型**                         | **默认值** |
| -------------------- | -------------- | -------------------------------- | ---------- |
| textPaddingInline    | 文本横向内间距 | `CSSProperties['paddingInline']` | -          |
| orientationMargin    | 文本与边缘距离 | `number`                         | -          |
| colorBorderSecondary | 线条颜色       | `string`                         | -          |

### 如何使用

```js
<ConfigProvider
  theme={{
    components: {
      Divider: {
        /* 这里是你的组件 token */
      },
    },
  }}
>
  ...
</ConfigProvider>
```
