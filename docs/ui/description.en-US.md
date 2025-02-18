---
nav: Components
group:
  title: Data Entry
  order: 0
toc: content
---

# Description

## Usage

Generally used for information display on detail pages.

## Examples

<code src="../../packages/ui/examples/description/basic.tsx" description="Simply display multiple read-only fields in groups. Generally used for information on the details page.">Basic usage</code>  
<code src="../../packages/ui/examples/description/column.tsx" description="Set the number of columns to display through the `column` attribute, and support modifying the list style.">Column number and style</code>  
<code src="../../packages/ui/examples/description/layout.tsx" description="There are four arrangement modes: horizontal arrangement, vertical arrangement, horizontal arrangement within rows, and vertical arrangement within rows.">Layout</code>  
<code src="../../packages/ui/examples/description/bordered.tsx" description="With the parameter `bordered`, a border can be added.">Border</code>  
<code src="../../packages/ui/examples/description/size.tsx" description="Display the description list in different sizes through the parameter `size`.">Size</code>  
<code src="../../packages/ui/examples/description/span.tsx" description="Supports responsive arrangement.">Responsive</code>

## API

### Description

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | component name | `string` | - |
| classNames | Component name | `title?: string; label?: string; value?: string;` | - |
| style | Component style | `CSSProperties` | - |
| styles | Component styles | `title?: CSSProperties; label?: CSSProperties; value?: CSSProperties;` | - |
| border | Whether to display the border | `boolean` | - |
| layout | arrangement | `horizontal \| vertical \| inline-horizontal \| inline-vertical` | `horizontal` |
| size | Describes the size of the list. If not specified, it defaults to `default` | `mini \| small \| medium \| default \| large` | - |
| colon | Whether to display the colon after the label text | `ReactNode` | - |
| title | title | `ReactNode` | - |
| column | Place several columns of data in one row, one data is one column. Supports configuring `column` as a number or object. When configuring the object format, it supports configuring `{ xs: 1, md: 2, lg: 3 }` in this form to support responsive arrangement | `number \| {xs?: number;sm?: number;md?: number;lg?: number;xl?: number;xxl?: number;xxxl?: number;}` | `3` |
| data | Data describing the list | [DataType](#datatype) | - |

### DataType

```js
export type DataType = {
  key?: React.Key,
  label?: ReactNode,
  value?: ReactNode,
  span?: number,
}[];
```
