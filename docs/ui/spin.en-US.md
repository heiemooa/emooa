---
nav: Components
group:
    title: Feedback
    order: 3
toc: content
---

# Spin


## Usage

- Pages that are waiting for asynchronous data or in the process of rendering
- Appropriate loading animations will effectively relieve users’ anxiety

## Examples

<code src="../../packages/ui/examples/spin/basic.tsx" description="A simple loading state.">Basic usage</code>
<code src="../../packages/ui/examples/spin/size.tsx" description="Set `size` to get loading icons of different sizes.">Different sizes</code>
<code src="../../packages/ui/examples/spin/tip.tsx" description="Customize the loading copy through the `tip` field.">Tip</code>
<code src="../../packages/ui/examples/spin/delay.tsx" description="Delayed display of `loading` through `delay`, anti-shake processing of state switching, effectively avoiding rapid state switching The screen flashes ">Delay</code>.
## API

### Spin

| **Parameters** | **Type** | **Default value** | **Definition** |
|--|--|--|--|
| className | `string`              | -        | The className of Spin       |
| style     | `CSSProperties`       | -        | The style properties of Spin	        |
|loading|`boolean`|true|Whether is loading status|
|delay|`number`|-|Specifies a delay(ms) for loading state|
|size|`number`|-|The size of loading icon	|
|icon|`ReactNode`|-|Customize icon which will be rotated automatically.	|
|element|`ReactNode`|-|Customize element which won't be rotated automatically, such as image/gif.		|
|tip|`string` \| `ReactNode` |-|Customize description content when Spin has children	|
