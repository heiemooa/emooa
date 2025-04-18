---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Spin 加载中

## 何时使用

- 处于等待异步数据或正在渲染过程的页面
- 合适的加载动效会有效缓解用户的焦虑

## 代码演示

<code src="../../packages/ui/examples/spin/basic.tsx" description="一个简单的 loading 状态。">基本用法</code>  
<code src="../../packages/ui/examples/spin/size.tsx" description="设置 `size` 可以得到不同尺寸的加载图标。">不同尺寸</code>  
<code src="../../packages/ui/examples/spin/tip.tsx" description="通过 `tip` 字段自定义加载时的文案。">提示</code>  
<code src="../../packages/ui/examples/spin/delay.tsx" description="通过 `delay` 延迟显示 `loading`，对状态切换进行防抖处理，有效避免状态快速切换时的屏幕闪烁。">延迟</code>  
<code src="../../packages/ui/examples/spin/dot.tsx" description="通过 `delay` 延迟显示 `loading`，对状态切换进行防抖处理，有效避免状态快速切换时的屏幕闪烁。">Dot 动画</code>  
<code src="../../packages/ui/examples/spin/color.tsx" description="支持自定义 `color` 属性进行颜色的设置。">自定义颜色</code>  
<code src="../../packages/ui/examples/spin/full.tsx" description="`full` 属性非常适合创建流畅的页面加载器。它添加了半透明覆盖层，并在其中心放置了一个旋转加载符号。">全屏</code>

## API

### Spin

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| loading | 是否为加载状态 | `boolean` | true |
| delay | 延迟显示加载的时间 (ms) | `number` | - |
| size | 加载动画的尺寸 | `mini \| small \| medium \| large` | medium |
| icon | 自定义图标，会自动旋转。 | `ReactNode` | - |
| element | 自定义元素，非图标，不附带旋转效果。可用于设置为 gif 图片等。 | `ReactNode` | - |
| tip | 加载的文案 | `string \| ReactNode` | - |
| full | 是否全屏 | `boolen` | - |
| color | 自定义颜色 | `string` | - |
