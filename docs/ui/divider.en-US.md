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
<code src="../../packages/ui/examples/divider/color.tsx" description='Use the `color` property to modify the default line color.'>Line color</code>

## API

### Divider

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Divider | `string` | - |
| style | The style properties of Divider | `CSSProperties` | - |
| orientation | The position of the dividing line text | `left \| right \| center` | `center` |
| type | The type of dividing line, whether horizontal or vertical, corresponding to `horizontal` and `vertical` respectively | `horizontal \| vertical` | `horizontal` |
| dashed | Dotted line or not? | `boolean` | - |
| color | Line color | `string` | - |

## Theme

### Divider Token

| **Parameters**       | **Type**                | **Default value**                | **Definition** |
| -------------------- | ----------------------- | -------------------------------- | -------------- |
| textPaddingInline    | text horizontal spacing | `CSSProperties['paddingInline']` | -              |
| orientationMargin    | text-edge distance      | `number`                         | -              |
| colorBorderSecondary | Line color              | `string`                         | -              |

### Usage

```js
<ConfigProvider
  theme={{
    components: {
      Divider: {
        /* This is your Divider token */
      },
    },
  }}
>
  ...
</ConfigProvider>
```
