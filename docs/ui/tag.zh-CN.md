---
nav: 组件
group:
  title: 数据展示
  order: 0
toc: content
demo:
  cols: 2
---

# Tag 标签

## 何时使用

用户通过标签进行信息反馈和交互操作。

- 分类
- 属性

## 代码演示

<code src="../../packages/ui/examples/tag/basic.tsx" description="标签的基础用法。">基本用法</code>  
<code src="../../packages/ui/examples/tag/color.tsx" description="多种预设色彩的标签样式，通过 `color` 设置不同颜色，也支持自定义 `color` 字段设置色值。">多色标签</code>  
<code src="../../packages/ui/examples/tag/checkable.tsx" description="通过参数 `checkable`，可以实现点击选中的效果。">可选中</code>  
<code src="../../packages/ui/examples/tag/size.tsx" description="标签分为：迷你、小、中、大，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为「小」。">不同尺寸</code>  
<code src="../../packages/ui/examples/tag/sync.tsx" description="如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。">可关闭</code>  
<code src="../../packages/ui/examples/tag/icon.tsx" description="可通过设置 `icon` 在标签中加入图标。">图标</code>  
<code src="../../packages/ui/examples/tag/bordered.tsx" description="通过参数 `bordered` 可以显示带边框的标签。">边框</code>

## API

### Tag

| **参数**       | **定义**             | **类型**                           | **默认值** |
| -------------- | -------------------- | ---------------------------------- | ---------- |
| checkable      | 是否支持选中         | `boolean`                          | `-`        |
| checked        | 是否选中（受控模式） | `boolean`                          | `-`        |
| closable       | 是否可关闭标签       | `boolean`                          | `-`        |
| defaultChecked | 是否默认选中         | `boolean`                          | `-`        |
| visible        | 设置标签显示隐藏     | `boolean`                          | `-`        |
| color          | 设置标签背景颜色     | `string`                           | `-`        |
| size           | 标签尺寸             | `mini \| small \| medium \| large` | `small`    |
| closeIcon      | 自定义关闭图标       | `ReactNode`                        | `-`        |
| icon           | 设置图标             | `ReactNode`                        | `-`        |
| bordered       | 是否显示边框         | `Boolean`                          | `-`        |
| className      | 节点类名             | `string \| string[]`               | `-`        |
| onClose        | 关闭标签回调函数     | ` (e) => Promise<any> \| void`     | `-`        |
| style          | 节点样式             | `CSSProperties`                    | `-`        |
| onCheck        | 选中的回调           | `(checked: boolean) => void`       | `-`        |
