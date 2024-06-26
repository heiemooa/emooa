---
nav: Component
group: 
    title: General
    order: 0
toc: content
---

# Button


## Usage

A button is a command component that initiates an immediate action in response to a user click.


- Five types: `primary` main button, `secondary` secondary button (default), `dashed` dashed button, `outline` linear button, `text` text button.
- Four states: `default`, `danger`, `success`, and `warning`.
- Four sizes: `mini`, `small`, `medium` (default), `large`.
- Three shapes: `square` rectangle (default), `circle` circle, `round` fully rounded corners.
- other:
    - Loading: used for asynchronous operations to avoid multiple submissions when waiting for feedback.
    - Link: Generally used for links, that is, to navigate to a certain location.
    - Combination buttons: can be used for multiple operations at the same level, appearing in the form of button combinations.
    - Width adaptive: The button width adapts to the width of the container.

## Examples

<code src="../../packages/ui/examples/button/basic.tsx" description="There are five types of buttons: primary button, secondary button, dashed button, linear button and text button. The primary button is in The same operation area can appear at most once ">Basic usage</code>
<code src="../../packages/ui/examples/button/disabled.tsx" description="Add the disabled attribute to make the button unavailable, and the button style will also change.">Disable</code>
<code src="../../packages/ui/examples/button/size.tsx" description="Buttons are divided into four sizes: mini, small, medium and large. The heights are: 24px/28px/ 32px/36px. The recommended and default size is `Medium`. You can choose the appropriate size for different scenarios and different business needs. ">Button size</code>
<code src="../../packages/ui/examples/button/shape.tsx" description="`Button` has many shapes, `square` - rectangle (default), `circle` - circle, `round` - Fully rounded corners. ">Button shape</code>
<code src="../../packages/ui/examples/button/loading.tsx" description="By setting `loading`, a button can be placed in the loading state. The button in the loading state will not trigger a click. Event.">Loading</code>
<code src="../../packages/ui/examples/button/link.tsx" description="You can turn a button into an `a` label by setting `href`.">Link button</code>
<code src="../../packages/ui/examples/button/group.tsx" description="Can be used for multiple operations at the same level, appearing as a combination of buttons.">Combined buttons</code>
<code src="../../packages/ui/examples/button/full.tsx" description="By setting `full`, the button width can be adapted to the width of the container.">Width adaptive</code>


## API

### Button

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | `string`              | -        | The className of Button     |
| style     | `CSSProperties`       | -        | The style of Button 	    |
| type      | `secondary` `primary` `dashed` `outline` `text`  | `secondary`   | Buttons are mainly divided into five button types: primary buttons, secondary buttons, virtual box buttons, text buttons, and linear buttons.	        |
| size      | `mini` `small` `medium` `large`                  | `medium`      | The button size		        |
| status    | `warning` `danger` `success` `default`           | `default`     | The button state			        |
| shape     | `circle` `round` `square`                        | `square`      | Button shape, `circle` – round, `round` – full rounded corners, `square` – rectangular			        |
| disabled  | `boolean`                        | -             | Whether to disable		|
| loading   | `boolean`                        | -             | Whether it is loading status  |
| full      | `boolean`                        | -             | Set button icon  |
| icon      | `ReactNode`                      | -             | Button width adapts to container  |
| htmlType  | `button` `submit` `reset`        | -             | The native `html type` of the button	  |
| href      | `string`                         | -             | Add a jump link and set this attribute, `button` behaves the same as `a` tag	  |
| target    | `_blank` `_self` `_parent` `_top`| -             | `a` link's `target` attribute, effective when `href` exists	  |
| anchorProps| `HTMLProps<HTMLAnchorElement>`  | -             | `a` The native attribute of the link, effective when `href` exists, see [Document]		  |

## Theme

### Button Token
// TODO
<!-- | **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- | -->

