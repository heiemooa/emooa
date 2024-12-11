---
nav: 组件
group:
  title: 通用
  order: 0
toc: content
---

# Link 链接

## 何时使用

标签链接。

## 代码演示

<code src="../../packages/ui/examples/link/basic.tsx">基本用法</code>  
<code src="../../packages/ui/examples/link/hoverable.tsx" description="可以通过 `hoverable` 属性设置是否在悬浮状态时隐藏底色。">悬浮状态样式</code>

## API

### Link

| **参数**  | **定义**                                    | **类型**                                  | **默认值** |
| --------- | ------------------------------------------- | ----------------------------------------- | ---------- |
| className | 组件名称                                    | `string`                                  | -          |
| style     | 组件样式                                    | `CSSProperties`                           | -          |
| status    | 按钮状态                                    | `warning \| danger \| success \| default` | `default`  |
| disabled  | 是否禁用                                    | `boolean`                                 | -          |
| icon      | 按钮宽度随容器自适应                        | `ReactNode`                               | -          |
| href      | 添加跳转链接                                | `string`                                  | -          |
| target    | `a` 链接的 `target` 属性，`href` 存在时生效 | `_blank \| _self \| _parent \| _top`      | -          |
| hoverable | 悬浮状态是否有底色                          | `boolean`                                 | `true`     |

其他属性见 [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)

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
