---
nav: Components
group:
  title: Layout
  order: 1
toc: content
---

# Space

## Usage

Avoid components that are too close together to create a unified space.

- Suitable horizontal spacing for inline elements.
- Various horizontal alignments can be set.

## Examples

<code src="../../packages/ui/examples/space/basic.tsx" description="Crowded components horizontal spacing.">Basic</code>  
<code src="../../packages/ui/examples/space/direction-vertical.tsx" description="Crowded components vertical spacing.">Vertical Space</code>  
<code src="../../packages/ui/examples/space/size.tsx" description="Use `size` to set the spacing, Three sizes are preset: `small`, `middle`, `medium`, `large`. You can also customize the spacing. If size is not set, the spacing is `small`.">Space Size</code>  
<code src="../../packages/ui/examples/space/align.tsx" description="Config item align.">Align</code>  
<code src="../../packages/ui/examples/space/split.tsx" description="Auto wrap line.">Wrap</code>

## API

### Space

| **Parameters** | **Definition**                | **Type**                                     | **Default value** |
| -------------- | ----------------------------- | -------------------------------------------- | ----------------- | ------- |
| className      | The className of Space        | `string`                                     | -                 |
| style          | The style properties of Space | `CSSProperties`                              | -                 |
| align          | Align items                   | `start \| end \| center \| baseline`         | -                 |
| direction      | The space direction           | `vertical \| horizontal`                     | `horizontal`      |
| size           | The space size                | `mini \| small \| medium \| large \| number` | `small`           | `small` |
| split          | Set split                     | `ReactNode`                                  | -                 |
| wrap           | Auto wrap line                | `boolean`                                    | -                 |

### Size

`mini` | `small` | `medium` | `large` | `number`

## Theme

### Space Token

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| paddingXXS | Controls the minimum inner spacing of elements, corresponding size is `mini`. | `number` | 4 |
| paddingXS | Controls the small inner spacing of elements, corresponding size is `small`. | `number` | 8 |
| padding | Controls the inner spacing of elements, corresponding size is `medium`. | `number` | 16 |
| paddingLG | Controls the large inner spacing of elements, corresponding size is `large`. | `number` | 24 |
