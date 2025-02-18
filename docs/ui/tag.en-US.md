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

<code src="../../packages/ui/examples/tag/basic.tsx" description="Basic usage of tags.">Basic usage</code>  
<code src="../../packages/ui/examples/tag/color.tsx" description="Multiple preset color label styles, set different colors through `color`, and also support custom `color` fields to set color values.">Multi-color labels</code>  
<code src="../../packages/ui/examples/tag/checkable.tsx" description="The parameter `checkable` can be used to achieve the effect of clicking and selecting.">Selectable</code>  
<code src="../../packages/ui/examples/tag/size.tsx" description="Tag is divided into: mini, small, medium and large. You can choose the appropriate button size in different scenarios. The recommended and default size is `small`. ">Size</code>  
<code src="../../packages/ui/examples/tag/sync.tsx" description="If `onClose` returns a `Promise`, the tag can be closed asynchronously and the loading effect will be displayed when it is not closed.">Can be closed</code>  
<code src="../../packages/ui/examples/tag/icon.tsx" description="You can add icons to tags by setting `icon`.">Icon</code>  
<code src="../../packages/ui/examples/tag/bordered.tsx" description="You can display bordered tags through the parameter `bordered`.">Border</code>

## API

### Tag

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Tag | `string` | - |
| style | The style properties of Tag | `CSSProperties` | - |
| checkable | Whether the Tag is checkable | boolean | - |
| checked | Used for setting the currently selected value(Controlled Component) | boolean | - |
| closable | Whether the Tag is closable | boolean | - |
| defaultChecked | Initial checked state | boolean | - |
| visible | Whether the Tag is visible | boolean | - |
| color | The background color of Tag | string | - |
| size | The size of Tag | `small \| default \| medium \| large` | `small` |
| closeIcon | Custom Close Icon | ReactNode | - |
| icon | Set icon | ReactNode | - |
| bordered | Whether the tag is bordered | Boolean | - |
| onClose | Callback when the tag closed | ` (e) => Promise<any> \| void` | - |
| onCheck | Callback when checked the tag | `(checked: boolean) => void` | - |
