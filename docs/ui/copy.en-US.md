---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Copy

## Usage

Used to quickly copy text content to the clipboard.

## Examples

<code src="../../packages/ui/examples/copy/basic.tsx" description="Control the `icon` through the `hover` attribute.">Basic usage</code>  
<code src="../../packages/ui/examples/copy/loading.tsx" description="Customize the clipboard text via the `text` property.">Custom text</code>  
<code src="../../packages/ui/examples/copy/icon.tsx" description="Customize the copy icon through the `icon` attribute.">Custom icon</code>

## API

### Message

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | The className of Image | `string` | - |
| style | The style of Image | `CSSProperties` | - |
| text | Custom copy text | `string \| (() => string \| Promise<string>)` | - |
| hover | Whether to display the icon when the mouse is hovering | `boolean` | - |
| icon | Custom icon: [default icon, icon after successful copy] | `[React.ReactNode, React.ReactNode?]` | - |
| onCopy | Copy complete callback | `(text: string, e: React.ClipboardEventHandler<HTMLDivElement>) => void` | - |
