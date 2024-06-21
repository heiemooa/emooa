---
nav: Components
group:
    title: Feedback
    order: 3
order: 0
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

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | `string`              | -        | The className of Watermark       |
| style     | `CSSProperties`       | -        | The style properties of Watermark	        |
| image | `string` | - | Watermark image source has higher priority than text content |
|rotate|`number`|-20|Single watermark rotation angle|
|content|`string` `string[]`| - |The text content of the watermark|
|fontStyle|`{color?: string;fontFamily?: string;fontSize?: number \| string;fontWeight?: number \| string;}` |{color:'rgba(0, 0, 0, 0.12)', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'normal' }|Watermark text style|
|gap|`[number, number]` |[100, 100]|spacing between watermarks|
|height|`number` \| `string` |-|The height of a single watermark|
|offset|`[number, number]` |[`gaps[0] / 2`,`gaps[1] / 2`]|The offset of the watermark relative to the `container` container|
|width|`number` \| `string` |-|The width of a single watermark. The default is `100` for `image` and the text width for `content`|
|zIndex|`string` \| `number` |-|zIndex|
