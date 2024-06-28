---
nav: Components
group: 
    title: Layout
    order: 1
toc: content
---

# Divider

## Usage

- Split text paragraphs into different chapters. The default is a horizontal dividing line, and text can be added in the middle.
- Split inline text/links, such as table actions.

## Examples

<code src="../../packages/ui/examples/divider/basic.tsx" description="Split text paragraphs in different chapters. The default is horizontal dividing lines, and dotted lines are supported.">Basic</code>
<code src="../../packages/ui/examples/divider/orientation.tsx" description="Specify the position of the dividing line text through orientation.">Dividing Line with Text</code>
<code src="../../packages/ui/examples/divider/vertical.tsx" description='Use type="vertical" to set a vertical dividing line within the row.'>Vertical Dividing Line</code>




## API

### Divider

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | `string`              | -        | The className of Space       |
| style     | `CSSProperties`       | -        | The style properties of Space	        |
| orientation     | `left` `right` `center`	       | `center`       | The position of the dividing line text		    |
| type     | `horizontal` `vertical`  | `horizontal`        | The type of dividing line, whether horizontal or vertical, corresponding to `horizontal` and `vertical` respectively	    |
| dashed     | `boolean`       | -        | Dotted line or not?	    |

## Theme

### Divider Token

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| textPaddingInline | `CSSProperties['paddingInline']`              | -        | text horizontal spacing       |
| orientationMargin | `number`              | -        | text-edge distance       |

