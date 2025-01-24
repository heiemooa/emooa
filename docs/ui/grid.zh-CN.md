---
nav: 组件
group:
  title: 布局
  order: 1
toc: content
---

# Grid 栏栅

## 何时使用

基于行（`row`）和列（`col`）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。

## 代码演示

<code src="../../packages/ui/examples/grid/basic.tsx" description="从堆叠到水平排列。使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（`Col`）必须放在 Row 内。">基本用法</code>  
<code src="../../packages/ui/examples/grid/offset.tsx" description="指定 `offset` 可以对栅格进行平移操作。">栅格偏移</code>  
<code src="../../packages/ui/examples/grid/push_pull.tsx" description="指定 `push` 或者 `pull` 可以对栅格进行排序。`push` 栅格向右移动格数，`pull` 栅格向左移动格数。">栅格排序</code>  
<code src="../../packages/ui/examples/grid/gutter.tsx" description="通过在 `Row` 上指定 `gutter` 可以增加栅格的区域间隔。">区块间隔</code>  
<code src="../../packages/ui/examples/grid/justify.tsx" description="通过 `justify` 来进行水平布局。">水平布局</code>  
<code src="../../packages/ui/examples/grid/align.tsx" description="通过 `align` 来进行垂直布局。">垂直布局</code>  
<code src="../../packages/ui/examples/grid/order.tsx" description="通过 `order` 来进行元素排序。">排序</code>  
<code src="../../packages/ui/examples/grid/responsive.tsx" description="预置`六`种响应尺寸, 分别为 `xs`, `sm`, `md`, `lg`, `xl`, `xxl`。">响应式布局</code>  
<code src="../../packages/ui/examples/grid/responsive-more.tsx" description="`span`, `offset`, `order`, `pull`, `push` 属性可以内嵌到 `xs`, `sm`, `md`, `lg`, `xl`, `xxl` 对象中使用。比如 `xs={8}` 相当于 `xs={{ span: 8 }}`。">高级响应式</code>  
<code src="../../packages/ui/examples/grid/flex.tsx" description="通过设置 `Col` 组件的 `flex` 属性，可以任意配置 `flex` 布局。">Flex 用法</code>

## API

### Row

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| align | 竖直对齐方式 (`align-items`) | `start \| center \| end \| stretch` | `start` |
| justify | 水平对齐方式（`justify-content`） | `start \| center \| end \| space-around \|space-between` | `start` |
| gutter | 栅格间隔，单位是 `px` 栅格间隔。可传入响应式对象写法 `{ xs: 4, sm: 6, md: 12}`，传入数组 [ 水平间距， 垂直间距 ] 来设置两个方向。 | `mini \| small \| medium \| large \| number` | `small` |
| wrap | 是否自动换行 | `boolean` | `true` |

### Col

| **参数**  | **定义**                               | **类型**                           | **默认值** |
| --------- | -------------------------------------- | ---------------------------------- | ---------- |
| className | 组件名称                               | `string`                           | -          |
| style     | 组件样式                               | `CSSProperties`                    | -          |
| offset    | 栅格左侧的间隔格数，间隔内不可以有栅格 | `number`                           | `-`        |
| order     | 对元素进行排序                         | `number`                           | `-`        |
| pull      | 对元素进行排序                         | `number`                           | `-`        |
| push      | 对元素进行排序                         | `number`                           | `-`        |
| span      | 栅格占位格数                           | `number`                           | `24`       |
| flex      | 设置 `flex` 布局属性                   | `string \| number \| auto \| none` | `-`        |
| lg        | `>= 992px` 响应式栅格                  | `number \| { [key: string]: any }` | `-`        |
| md        | `>= 768px` 响应式栅格                  | `number \| { [key: string]: any }` | `-`        |
| sm        | `>= 576px` 响应式栅格                  | `number \| { [key: string]: any }` | `-`        |
| xl        | `>= 1200px` 响应式栅格                 | `number \| { [key: string]: any }` | `-`        |
| xs        | `< 576px` 响应式栅格                   | `number \| { [key: string]: any }` | `-`        |
| xxl       | `>= 1600px` 响应式栅格                 | `number \| { [key: string]: any }` | `-`        |
