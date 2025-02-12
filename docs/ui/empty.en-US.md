---
nav: Components
group:
  title: Data Entry
  order: 0
toc: content
demo:
  cols: 2
---

# Empty

## Usage

Rendering hint when there is currently no data.

## Examples

<code src="../../packages/ui/examples/empty/basic.tsx" description="The simplest usage.">Basic</code>  
<code src="../../packages/ui/examples/empty/icon.tsx" description="You can pass in a custom icon through the `icon` parameter, and modify the display text through `description`.">Custom icons and copy</code>  
<code src="../../packages/ui/examples/empty/image.tsx" description="Modify the icon by configuring the image address `Url`.">Icon Url</code>  
<code src="../../packages/ui/examples/empty/description.tsx" description="No description information.">No description</code>

## API

### Empty

| **Parameters** | **Definition**                | **Type**                 | **Default value** |
| -------------- | ----------------------------- | ------------------------ | ----------------- |
| className      | The className of Empty        | `string`                 | -                 |
| style          | The style properties of Empty | `CSSProperties`          | -                 |
| description    | Show description              | `ReactNode`              | -                 |
| icon           | Custom display pattern        | `ReactElement \| string` | -                 |
