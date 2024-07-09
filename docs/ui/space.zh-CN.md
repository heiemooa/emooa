---
nav: 组件
group:
  title: 布局
  order: 1
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

| **参数**  | **定义**     | **类型**                                     | **默认值**   |
| --------- | ------------ | -------------------------------------------- | ------------ |
| className | 组件名称     | `string`                                     | -            |
| style     | 组件样式     | `CSSProperties`                              | -            |
| align     | 对齐方式     | `start \| end \| center \| baseline`         | -            |
| direction | 间距方向     | `vertical \| horizontal`                     | `horizontal` |
| size      | 间距大小     | `mini \| small \| medium \| large \| number` | `small`      |
| split     | 设置拆分     | `ReactNode`                                  | -            |
| wrap      | 是否自动换行 | `boolean`                                    | -            |

## 主题变量 Theme

### Space Token

| **参数**   | **定义**                                    | **类型** | **默认值** |
| ---------- | ------------------------------------------- | -------- | ---------- |
| paddingXXS | 控制元素的最小内间距，对应 size 为 `mini`。 | `number` | 4          |
| paddingXS  | 控制元素的小内间距，对应 size 为 `small`。  | `number` | 8          |
| padding    | 控制元素的内间距，对应 size 为 `medium` 。  | `number` | 16         |
| paddingLG  | 控制元素的大内间距，对应 size 为 `large`。  | `number` | 24         |
