---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
---

# Watermark

## Usage

Use it when the page needs to add a watermark to identify copyright.

## Examples

<code src="../../packages/ui/examples/watermark/basic.tsx">Basic</code>  
<code src="../../packages/ui/examples/watermark/contents.tsx" description="Use `content` to set a string array to specify multi-line text watermark content.">Multi-line watermark</code>  
<code src="../../packages/ui/examples/watermark/image.tsx" description="Specify the image address via `image`. To ensure that the image is high definition and not stretched, set the width and height, and upload at least twice the width and height of the logo image address.">Image watermark</code>

## API

### Watermark

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Watermark | `string` | - |
| style | The style properties of Watermark | `CSSProperties` | - |
| image | Watermark image source has higher priority than text content | `string` | - |
| rotate | Single watermark rotation angle | `number` | -20 |
| content | The text content of the watermark | `string` `string[]` | - |
| fontStyle | Watermark text style | `{color?: string;fontFamily?: string;fontSize?: number \| string;fontWeight?: number \| string;}` | {color:'rgba(0, 0, 0, 0.12)', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'normal' } |
| gap | spacing between watermarks | `[number, number]` | [100, 100] |
| height | The height of a single watermark | `number \| string` | - |
| offset | The offset of the watermark relative to the `container` container | `[number, number]` | [`gaps[0] / 2`,`gaps[1] / 2`] |
| width | The width of a single watermark. The default is `100` for `image` and the text width for `content` | `number \| string` | - |
| zIndex | zIndex | `string \| number` | - |
