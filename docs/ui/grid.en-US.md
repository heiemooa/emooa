---
nav: Components
group:
  title: Layout
  order: 1
toc: content
---

# Grid

## Usage

Define the outer frame of information blocks based on rows (`row`) and columns (`col`) to ensure that each area of ​​the page can be arranged robustly.

## Examples

<code src="../../packages/ui/examples/grid/basic.tsx" description="From stacking to horizontal arrangement. A basic grid system can be created using a single set of `Row` and `Col` grid components, where all columns (`Col`) must be placed within Row.">Basic</code>  
<code src="../../packages/ui/examples/grid/offset.tsx" description="Specify `offset` to justify the padding of Col.">Offset of Col</code>  
<code src="../../packages/ui/examples/grid/push_pull.tsx" description="Specify `push` or `pull` to sort the grid.">Push pull</code>  
<code src="../../packages/ui/examples/grid/gutter.tsx" description="By specifying `gutter` on `Row`, the area interval of the grid can be changed.">Interval of Grid</code>  
<code src="../../packages/ui/examples/grid/justify.tsx" description="Use `justify` to customize horizontal layout.">Horizontal layout</code>  
<code src="../../packages/ui/examples/grid/align.tsx" description="Use `align` to customize vertical layout.">Vertical layout</code>  
<code src="../../packages/ui/examples/grid/order.tsx" description="Sort items by `order`.">Order</code>  
<code src="../../packages/ui/examples/grid/responsive.tsx" description="Six preset sizes are available: `xs`, `sm`, `md`, `lg`, `xl`, `xxl`.">Responsive layout</code>  
<code src="../../packages/ui/examples/grid/responsive-more.tsx" description="`The `span`, `offset`, `order`, `pull`, `push` properties can be used in `xs`, `sm`, `md`, `lg`, `xl`, `xxl` objects.For example, xs={8} is equivalent to xs={{ span: 8 }}.">Advanced responsive layout</code>  
<code src="../../packages/ui/examples/grid/flex.tsx" description="By setting the `flex` property of the `Col` component, you can configure the flex layout arbitrarily.">Flex</code>

## API

### Row

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Row | `string` | - |
| style | The style properties of Row | `CSSProperties` | - |
| align | Vertical alignment, same as css `align-items` | `start \| center \| end \| stretch` | `start` |
| justify | Horizontal alignment, same as css `justify-content` | `start \| center \| end \| space-around \|space-between` | `start` |
| gutter | Spacing between grids, could be a number or a object like `{ xs: 8, sm: 16, md: 24}`. Or you can use array to make horizontal and vertical spacing work at the same time `[horizontal, vertical]`. | `mini \| small \| medium \| large \| number` | `small` |
| wrap | Whether to wrap lines automatically | `boolean` | `true` |

### Col

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| offset | The number of cells to offset Col from the left | `number` | - |
| pull | Raster order | `number` | - |
| push | Raster order | `number` | - |
| span | Raster number of cells to occupy | `number` | `24` |
| flex | Set `flex` layout properties | `string \| number \| auto \| none` | - |
| lg | `>= 992px` | `number \| { [key: string]: any }` | - |
| md | `>= 768px` | `number \| { [key: string]: any }` | - |
| sm | `>= 576px` | `number \| { [key: string]: any }` | - |
| xl | `>= 1200px` | `number \| { [key: string]: any }` | - |
| xs | `< 576px` | `number \| { [key: string]: any }` | - |
| xxl | `>= 1600px` | `number \| { [key: string]: any }` | - |
