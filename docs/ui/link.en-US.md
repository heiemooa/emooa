---
nav: Component
group:
  title: General
  order: 0
toc: content
---

# Link

## Usage

Label link.

## Examples

<code src="../../packages/ui/examples/link/basic.tsx">Basic usage</code>  
<code src="../../packages/ui/examples/link/hoverable.tsx" description="You can use the `hoverable` attribute to set whether to hide the background color in the hover state.">Hover state style</code>

## API

### Link

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Button | `string` | - |
| style | The style of Button | `CSSProperties` | - |
| status | The button state | `warning \| danger \| success \| default` | `default` |
| disabled | Whether to disable | `boolean` | - |
| icon | Button width adapts to container | `ReactNode` | - |
| href | Add a jump link and set this attribute, `button` behaves the same as `a` tag | `string` | - |
| target | `a` link's `target` attribute, effective when `href` exists | `_blank \| _self \| _parent \| _top` | - |
| hoverable | Whether there is a background color in the suspended state | `boolean` | `true` |

See other properties [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)

<!-- ## 主题变量 Theme -->

<!-- ### 组件 Token -->

<!-- | **参数**                | **定义**                         | **类型** | **默认值**              |
| ----------------------- | -------------------------------- | -------- | ----------------------- |
| textColorBg             | 链接 Default 背景颜色            | `string` | transparent             |
| textColorBgHover        | 链接 Default 类型背景 Hover 颜色 | `string` | token.colorBgTextHover  |
| textColor               | 链接 Default 类型字体颜色        | `string` | token.colorPrimary      |
| textColorHover          | 链接 Default 类型字体 Hover 颜色 | `string` | token.colorPrimaryHover |
| textSuccessColorBg      | 链接 Success 类型背景色          | `string` | transparent             |
| textSuccessColorBgHover | 链接 Success 类型背景 Hover 色   | `string` | token.colorBgTextHover  |
| textSuccessColor        | 链接 Success 类型字体颜色        | `string` | token.colorSuccess      |
| textSuccessColorHover   | 链接 Success 类型字体 Hover 颜色 | `string` | token.colorSuccessHover |
| textDangerColorBg       | 链接 Danger 类型背景色           | `string` | transparent             |
| textDangerColorBgHover  | 链接 Danger 类型背景 Hover 色    | `string` | token.colorBgTextHover  |
| textDangerColor         | 链接 Danger 类型字体颜色         | `string` | token.colorError        |
| textDangerColorHover    | 链接 Danger 类型字体 Hover 颜色  | `string` | token.colorErrorHover   |
| textWarningColorBg      | 链接 Warning 类型背景色          | `string` | transparent             |
| textWarningColorBgHover | 链接 Warning 类型背景 Hover 色   | `string` | token.colorBgTextHover  |
| textWarningColor        | 链接 Warning 类型字体颜色        | `string` | token.colorWarning      |
| textWarningColorHover   | 链接 Warning 类型字体 Hover 颜色 | `string` | token.colorWarningHover | -->

<!-- ### 如何使用

```js
<ConfigProvider
  theme={{
    components: {
      Button: {
        /* 这里是你的组件 token */
      },
    },
  }}
>
  ...
</ConfigProvider>
``` -->
