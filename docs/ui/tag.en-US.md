---
nav: Components
group:
  title: Data Entry
  order: 0
toc: content
demo:
  cols: 2
---

# Tag

## Usage

Users provide information feedback and interactive operations through tags.

- Classification
- Properties

## Examples

<code src="../../packages/ui/examples/tag/basic.tsx" description="标签的基础用法。">基本用法</code>  
<code src="../../packages/ui/examples/tag/color.tsx" description="多种预设色彩的标签样式，通过 `color` 设置不同颜色，也支持自定义 `color` 字段设置色值。">多色标签</code>  
<code src="../../packages/ui/examples/tag/checkable.tsx" description="通过参数 `checkable`，可以实现点击选中的效果。">可选中</code>  
<code src="../../packages/ui/examples/tag/size.tsx" description="标签分为：迷你、小、中、大，可以在不同场景下选择合适按钮尺寸。推荐及默认尺寸为「小」。">不同尺寸</code>  
<code src="../../packages/ui/examples/tag/sync.tsx" description="如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。">可关闭</code>  
<code src="../../packages/ui/examples/tag/icon.tsx" description="可通过设置 `icon` 在标签中加入图标。">图标</code>  
<code src="../../packages/ui/examples/tag/bordered.tsx" description="通过参数 `bordered` 可以显示带边框的标签。">边框</code>

## API

### Tag

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| --- | --- | --- | --- |
| checkable | Whether the Tag is checkable | boolean | `-` |
| checked | Used for setting the currently selected value(Controlled Component) | boolean | `-` |
| closable | Whether the Tag is closable | boolean | `-` |
| defaultChecked | Initial checked state | boolean | `-` |
| visible | Whether the Tag is visible | boolean | `-` |
| color | The background color of Tag | string | `-` |
| size | The size of Tag | `small \| default \| medium \| large` | `small` |
| closeIcon | Custom Close Icon | ReactNode | `-` |
| icon | Set icon | ReactNode | `-` |
| bordered | Whether the tag is bordered | Boolean | `-` |
| className | Additional css class | string \| string[] | `-` |
| onClose | Callback when the tag closed | ` (e) => Promise<any> \| void` | `-` |
| style | Additional style | CSSProperties | `-` |
| onCheck | Callback when checked the tag | `(checked: boolean) => void` | `-` |
