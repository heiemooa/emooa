---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Alert

## Usage

- When a page needs to display warning information to the user.
- Use warning prompts to display information that requires attention, and users can click to close it.

## Examples

<code src="../../packages/ui/examples/alert/basic.tsx" description="The simplest usage, suitable for short warning prompts.">Basic usage</code>  
<code src="../../packages/ui/examples/alert/type.tsx" description="There are four styles `success`, `info`, `warning`, `error`.">Different types </code>  
<code src="../../packages/ui/examples/alert/closable.tsx" description="Display a close button, click to close the warning prompt. The close button can be customized by setting `closeIcon`.">Close icon</code>  
<code src="../../packages/ui/examples/alert/showIcon.tsx" description="Customize the icon through the `icon` attribute. You can pass `showIcon=false` to not display the icon.">Icon</code>  
<code src="../../packages/ui/examples/alert/title.tsx" description="You can add a title by setting `title` and turn `content` into auxiliary introduction text.">Title </code>  
<code src="../../packages/ui/examples/alert/banner.tsx" description="Set `banner = true` to use it as a top banner." iframe="250">Top banner</code>  
<code src="../../packages/ui/examples/alert/action.tsx" description="Customize the action items through `action`.">Action</code>

## API

### Message

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | The className of Image | `string` | - |
| style | The style of Image | `CSSProperties` | - |
| type | Type of warning | `'info' \| 'success' \| 'warning' \| 'error'` | info |
| icon | Set the icon of the button, effective when `showIcon` is `true`. | `ReactNode` | - |
| closable | Whether to display the close button icon. | `boolean` | - |
| showIcon | Whether to display the icon. | `boolean` | true |
| title | title | `ReactNode` | - |
| content | content | `ReactNode` | - |
| closeIcon | Customize the close button, effective when `closable` is `true`. | `ReactNode` | - |
| onClose | Close callback | `(e) => void` | - |
| ofterClose | The callback executed after closing the animation | `() => void` | - |
| action | Custom action item | `ReactNode` | - |
| banner | Whether to use as top banner | `boolean` | - |
