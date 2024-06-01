---
nav: Components
group: 
    title: Layout
    order: 1
order: 0
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

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | `string`              | -        | The className of Space       |
| style     | `CSSProperties`       | -        | The style properties of Space	        |
| align     | `start` `end` `center` `baseline` | -            | Align items	        |
| direction | `vertical` `horizontal`           | `horizontal` | The space direction    |
| size      | [Size](#size) ｜[Size[]](#size)   | `small`      | The space size		    |
| split     | `ReactNode`                       | -            | Set split		        |
| wrap      | `boolean`                         | true         | Auto wrap line         |

### Size

`mini` | `small` | `medium` | `large` | `number`

## Theme

### Space Token
| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| paddingXXS    | `number` | 4        | Controls the minimum inner spacing of elements, corresponding size is `mini`.   |
| paddingXS     | `number` | 8        | Controls the small inner spacing of elements, corresponding size is `small`.    |
| padding       | `number` | 16       | Controls the inner spacing of elements, corresponding size is `medium`.    |
| paddingLG     | `number` | 24       | Controls the large inner spacing of elements, corresponding size is `large`.  |
