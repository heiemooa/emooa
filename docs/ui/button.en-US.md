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
<code src="../../packages/ui/examples/button/disabled.tsx" description="Add the `disabled` attribute to make the button unavailable, and the button style will also change.">Disable</code>  
<code src="../../packages/ui/examples/button/size.tsx" description="Buttons are divided into four sizes: mini, small, medium and large. The heights are: 24px/28px/ 32px/36px. The recommended and `default` size is `Medium`. You can choose the appropriate size for different scenarios and different business needs. ">Button size</code>  
<code src="../../packages/ui/examples/button/shape.tsx" description="`Button` has many shapes, `square` - rectangle (default), `circle` - circle, `round` - Fully rounded corners. ">Button shape</code>  
<code src="../../packages/ui/examples/button/loading.tsx" description="By setting `loading`, a button can be placed in the loading state. The button in the loading state will not trigger a click. Event.">Loading</code>  
<code src="../../packages/ui/examples/button/link.tsx" description="You can turn a button into an `a` label by setting `href`.">Link button</code>  
<code src="../../packages/ui/examples/button/group.tsx" description="Can be used for multiple operations at the same level, appearing as a combination of buttons.">Combined buttons</code>  
<code src="../../packages/ui/examples/button/full.tsx" description="By setting `full`, the button width can be adapted to the width of the container.">Width adaptive</code>

## API

### Button

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Button | `string` | - |
| style | The style of Button | `CSSProperties` | - |
| type | Buttons are mainly divided into five button types: primary buttons, secondary buttons, virtual box buttons, text buttons, and linear buttons. | `secondary \| primary \| dashed \| outline \| text` | `secondary` |
| size | The button size | `mini \| small \| medium \| large` | `medium` |
| status | The button state | `warning \| danger \| success \| default` | `default` |
| shape | Button shape, `circle` – round, `round` – full rounded corners, `square` – rectangular | `circle \| round \| square` | `square` |
| disabled | Whether to disable | `boolean` | - |
| loading | Whether it is loading status | `boolean` | - |
| full | Set button icon | `boolean` | - |
| icon | Button width adapts to container | `ReactNode` | - |
| htmlType | The native `html type` of the button | `button \| submit \| reset` | - |
| href | Add a jump link and set this attribute, `button` behaves the same as `a` tag | `string` | - |
| target | `a` link's `target` attribute, effective when `href` exists | `_blank \| _self \| _parent \| _top` | - |
| anchorProps | `a` The native attribute of the link, effective when `href` exists, see [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement) | `HTMLProps<HTMLAnchorElement>` | - |

## Theme

### Component Token

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| secondaryColorBg | Secondary button `Default` background color | `string` | token.colorBorderSecondary |
| secondaryColorBgHover | Secondary button `Default` background Hover color | `string` | token.colorBorder |
| secondaryColor | Secondary button `Default` font color | `string` | token.colorText |
| secondaryBorder | Secondary button `Default` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondarySuccessColorBg | Secondary button `Success` background color | `string` | token.colorSuccessBg |
| secondarySuccessColorBgHover | Secondary button `Success` background `Hover` color | `string` | token.colorSuccessBgHover |
| secondarySuccessColor | Secondary button `Success` font color | `string` | token.colorSuccess |
| secondarySuccessBorder | Secondary button `Success` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondaryDangerColorBg | Secondary button `Danger` background color | `string` | token.colorErrorBg |
| secondaryDangerColorBgHover | Secondary button `Danger` background `Hover` color | `string` | token.colorErrorBgHover |
| secondaryDangerColor | Secondary button `Danger` font color | `string` | token.colorError |
| secondaryDangerBorder | Secondary button `Danger` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondaryWarningColorBg | Secondary button `Warning` background color | `string` | token.colorWarningBg |
| secondaryWarningColorBgHover | Secondary button `Warning` background `Hover` color | `string` | token.colorWarningBgHover |
| secondaryWarningColor | Secondary button `Warning` font color | `string` | token.colorWarning |
| secondaryWarningBorder | Secondary button `Warning` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryColorBg | Primary button `Default` background color | `string` | token.colorPrimary |
| primaryColorBgHover | Primary button `Default` background Hover color | `string` | token.colorPrimaryHover |
| primaryColor | Primary button `Default` font color | `string` | token.colorTextLightSolid |
| primaryBorder | Primary button `Default` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primarySuccessColorBg | Primary button `Success` background color | `string` | token.colorSuccess |
| primarySuccessColorBgHover | Primary button `Success` background `Hover` color | `string` | token.colorSuccessHover |
| primarySuccessColor | Primary button `Success` font color | `string` | token.colorTextLightSolid |
| primarySuccessBorder | Primary button `Success` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryDangerColorBg | Primary button `Danger` background color | `string` | token.colorError |
| primaryDangerColorBgHover | Primary button `Danger` background `Hover` color | `string` | token.colorErrorHover |
| primaryDangerColor | Primary button `Danger` font color | `string` | token.colorTextLightSolid |
| primaryDangerBorder | Primary button `Danger` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryWarningColorBg | Primary button `Warning` background color | `string` | token.colorWarning |
| primaryWarningColorBgHover | Primary button `Warning` background `Hover` color | `string` | token.colorWarningHover |
| primaryWarningColor | Primary button `Warning` font color | `string` | token.colorTextLightSolid |
| primaryWarningBorder | Primary button `Warning` border | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| dashedColorBg | Dashed button `Default` background color | `string` | token.colorBorderSecondary |
| dashedColorBgHover | Dashed button `Default` background Hover color | `string` | token.colorBorder |
| dashedColor | Dashed button `Default` font color | `string` | token.colorText |
| dashedBorder | Dashed button `Default` border | `string` | `${token.lineWidth}px dashed ${token.colorBorder}` |
| dashedSuccessColorBg | Dashed button `Success` background color | `string` | token.colorSuccessBg |
| dashedSuccessColorBgHover | Dashed button `Success` background `Hover` color | `string` | token.colorSuccessBgHover |
| dashedSuccessColor | Dashed button `Success` font color | `string` | token.colorSuccess |
| dashedSuccessBorder | Dashed button `Success` border | `string` | `${token.lineWidth}px dashed ${token.colorSuccessBorder}` |
| dashedDangerColorBg | Dashed button `Danger` background color | `string` | token.colorErrorBg |
| dashedDangerColorBgHover | Dashed button `Danger` background `Hover` color | `string` | token.colorErrorBgHover |
| dashedDangerColor | Dashed button `Danger` font color | `string` | token.colorError |
| dashedDangerBorder | Dashed button `Danger` border | `string` | `${token.lineWidth}px dashed ${token.colorErrorBorder}` |
| dashedWarningColorBg | Dashed button `Warning` background color | `string` | token.colorWarningBg |
| dashedWarningColorBgHover | Dashed button `Warning` background `Hover` color | `string` | token.colorWarningBgHover |
| dashedWarningColor | Dashed button `Warning` font color | `string` | token.colorWarning |
| dashedWarningBorder | Dashed button `Warning` border | `string` | `${token.lineWidth}px dashed ${token.colorWarningBorder}` |
| textColorBg | Text button `Default` background color | `string` | transparent |
| textColorBgHover | Text button `Default` background `Hover` color | `string` | token.colorBgTextHover |
| textColor | Text button `Default` font color | `string` | token.colorPrimary |
| textColorHover | Text button `Default` text `Hover` color | `string` | token.colorPrimaryHover |
| textBorder | Text button `Default` border | `string` | `${token.lineWidth}px dashed transparent` |
| textSuccessColorBg | Text button `Success` background color | `string` | transparent |
| textSuccessColorBgHover | Text button `Success` background `Hover` color | `string` | token.colorBgTextHover |
| textSuccessColor | Text button `Success` font color | `string` | token.colorSuccess |
| textSuccessColorHover | Text button `Success` text `Hover` color | `string` | token.colorSuccessHover |
| textSuccessBorder | Text button `Success` border | `string` | `${token.lineWidth}px dashed transparent` |
| textDangerColorBg | Text button `Danger` background color | `string` | transparent |
| textDangerColorBgHover | Text button `Danger` background `Hover` color | `string` | token.colorBgTextHover |
| textDangerColor | Text button `Danger` font color | `string` | token.colorError |
| textDangerColorHover | Text button `Danger` text `Hover` color | `string` | token.colorErrorHover |
| textDangerBorder | Text button `Danger` border | `string` | `${token.lineWidth}px dashed transparent` |
| textWarningColorBg | Text button `Warning` background color | `string` | transparent |
| textWarningColorBgHover | Text button `Warning` background `Hover` color | `string` | token.colorBgTextHover |
| textWarningColor | Text button `Warning` font color | `string` | token.colorWarning |
| textWarningColorHover | Text button `Warning` text `Hover` color | `string` | token.colorWarningHover |
| textWarningBorder | Text button `Warning` border | `string` | `${token.lineWidth}px dashed transparent` |
| outlineColorBg | Outline button `Default` background color | `string` | transparent |
| outlineColorBgHover | Outline button `Default` background Hover color | `string` | transparent |
| outlineColor | Outline button `Default` font color | `string` | token.colorPrimary |
| outlineColorHover | Outline button `Default` text `Hover` color | `string` | token.colorPrimaryHover |
| outlineBorder | Outline button `Default` border | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorPrimary}` |
| outlineBorderHover | Outline button `Default` 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorPrimaryHover}` |
| outlineSuccessColorBg | Outline button `Success` background color | `string` | transparent |
| outlineSuccessColorBgHover | Outline button `Success` background `Hover` color | `string` | transparent |
| outlineSuccessColor | Outline button `Success` font color | `string` | token.colorSuccess |
| outlineSuccessColorHover | Outline button `Success` text `Hover` color | `string` | token.colorSuccessHover |
| outlineSuccessBorder | Outline button `Success` border | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorSuccess}` |
| outlineSuccessBorderHover | Outline button `Default` 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorSuccessHover}` |
| outlineDangerColorBg | Outline button `Danger` background color | `string` | transparent |
| outlineDangerColorBgHover | Outline button `Danger` background `Hover` color | `string` | transparent |
| outlineDangerColor | Outline button `Danger` font color | `string` | token.colorError |
| outlineDangerColorHover | Outline button `Danger` text `Hover` color | `string` | token.colorErrorHover |
| outlineDangerBorder | Outline button `Danger` border | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorError}` |
| outlineDangerBorderHover | Outline button `Danger` 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorErrorHover}` |
| outlineWarningColorBg | Outline button `Warning` background color | `string` | transparent |
| outlineWarningColorBgHover | Outline button `Warning` background `Hover` color | `string` | transparent |
| outlineWarningColor | Outline button `Warning` font color | `string` | token.colorWarning |
| outlineWarningColorHover | Outline button `Warning` text `Hover` color | `string` | token.colorWarningHover |
| outlineWarningBorder | Outline button `Warning` border | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorWarning}` |
| outlineWarningBorderHover | Outline button `Warning` border | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorWarningHover}` |

### Usage

```js
<ConfigProvider
  theme={{
    components: {
      Button: {
        /* This is your Button token */
      },
    },
  }}
>
  ...
</ConfigProvider>
```
