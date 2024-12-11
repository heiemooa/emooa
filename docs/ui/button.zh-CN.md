---
nav: 组件
group:
  title: 通用
  order: 0
toc: content
---

# Button 按钮

## 何时使用

按钮是一种命令组件，可发起一个即时操作，响应用户点击行为。

- 五种类型：`primary` 主按钮、`secondary` 次按钮（默认）、`dashed` 虚线按钮、`outline` 线形按钮、`text` 文本按钮。
- 四种状态：`default` 默认、`danger` 危险、`success` 成功、`warning` 警告。
- 四种尺寸：`mini` 迷你、`small` 小、`mudume` 中（默认值）、`large`大。
- 三种形状：`square` 长方形 (默认), `circle` 圆形, `round` 全圆角。
- 其他：
  - 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
  - 链接：一般用于链接，即导航至某位置。
  - 组合按钮：可用在同级多项操作，以按钮组合方式出现。
  - 宽度自适应：按钮宽度随着容器宽度进行适配。

## 代码演示

<code src="../../packages/ui/examples/button/basic.tsx" description="按钮有五种类型：主按钮、次按钮、虚线按钮、线形按钮和文本按钮。主按钮在同一个操作区域最多出现一次。">基本用法</code>  
<code src="../../packages/ui/examples/button/disabled.tsx" description="添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。">禁用状态</code>  
<code src="../../packages/ui/examples/button/size.tsx" description="按钮分为：迷你、小、中、大，四种尺寸。高度分别为：24px/28px/32px/36px。推荐及默认为尺寸「中」。可在不同场景及不同业务需求选择适合尺寸。">按钮尺寸</code>  
<code src="../../packages/ui/examples/button/shape.tsx" description="`Button` 有多种形状，`square` - 长方形 (默认), `circle` - 圆形, `round` - 全圆角。">按钮形状</code>  
<code src="../../packages/ui/examples/button/loading.tsx" description="通过设置 `loading` 可以让一个按钮处于加载中状态，处于加载中状态的按钮不会触发点击事件。">加载中</code>  
<code src="../../packages/ui/examples/button/link.tsx" description="通过设置 `href` 可以让一个按钮变成 `a` 标签。">Link 按钮</code>  
<code src="../../packages/ui/examples/button/group.tsx" description="可用在同级多项操作，以按钮组合方式出现。">组合按钮</code>  
<code src="../../packages/ui/examples/button/full.tsx" description="通过设置 `full` ,可以使按钮宽度随着容器宽度进行适配。">宽度自适应</code>

## API

### Button

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| type | 按钮主要分为五种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮 | `secondary \| primary \| dashed \| outline \| text` | `secondary` |
| size | 按钮的尺寸 | `mini \| small \| medium \| large` | `medium` |
| status | 按钮状态 | `warning \| danger \| success \| default` | `default` |
| shape | 按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形 | `circle \| round \| square` | `square` |
| disabled | 是否禁用 | `boolean` | - |
| loading | 是否是加载状态 | `boolean` | - |
| full | 设置按钮的图标 | `boolean` | - |
| icon | 按钮宽度随容器自适应 | `ReactNode` | - |
| htmlType | 按钮原生的 `html type` 类型 | `button \| submit \| reset` | - |
| href | 添加跳转链接，设置此属性，`button` 表现跟 `a` 标签一致 | `string` | - |
| target | `a` 链接的 `target` 属性，`href` 存在时生效 | `_blank \| _self \| _parent \| _top` | - |
| anchorProps | `a` 链接的原生属性，`href` 存在时生效，见 [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement) | `HTMLProps<HTMLAnchorElement>` | - |

## 主题变量 Theme

### 组件 Token

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| secondaryColorBg | 二级按钮 Default 背景颜色 | `string` | token.colorBorderSecondary |
| secondaryColorBgHover | 二级按钮 Default 类型背景 Hover 颜色 | `string` | token.colorBorder |
| secondaryColor | 二级按钮 Default 类型字体颜色 | `string` | token.colorText |
| secondaryBorder | 二级按钮 Default 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondarySuccessColorBg | 二级按钮 Success 类型背景色 | `string` | token.colorSuccessBg |
| secondarySuccessColorBgHover | 二级按钮 Success 类型背景 Hover 色 | `string` | token.colorSuccessBgHover |
| secondarySuccessColor | 二级按钮 Success 类型字体颜色 | `string` | token.colorSuccess |
| secondarySuccessBorder | 二级按钮 Success 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondaryDangerColorBg | 二级按钮 Danger 类型背景色 | `string` | token.colorErrorBg |
| secondaryDangerColorBgHover | 二级按钮 Danger 类型背景 Hover 色 | `string` | token.colorErrorBgHover |
| secondaryDangerColor | 二级按钮 Danger 类型字体颜色 | `string` | token.colorError |
| secondaryDangerBorder | 二级按钮 Danger 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| secondaryWarningColorBg | 二级按钮 Warning 类型背景色 | `string` | token.colorWarningBg |
| secondaryWarningColorBgHover | 二级按钮 Warning 类型背景 Hover 色 | `string` | token.colorWarningBgHover |
| secondaryWarningColor | 二级按钮 Warning 类型字体颜色 | `string` | token.colorWarning |
| secondaryWarningBorder | 二级按钮 Warning 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryColorBg | 主按钮 Default 背景颜色 | `string` | token.colorPrimary |
| primaryColorBgHover | 主按钮 Default 类型背景 Hover 颜色 | `string` | token.colorPrimaryHover |
| primaryColor | 主按钮 Default 类型字体颜色 | `string` | token.colorTextLightSolid |
| primaryBorder | 主按钮 Default 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primarySuccessColorBg | 主按钮 Success 类型背景色 | `string` | token.colorSuccess |
| primarySuccessColorBgHover | 主按钮 Success 类型背景 Hover 色 | `string` | token.colorSuccessHover |
| primarySuccessColor | 主按钮 Success 类型字体颜色 | `string` | token.colorTextLightSolid |
| primarySuccessBorder | 主按钮 Success 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryDangerColorBg | 主按钮 Danger 类型背景色 | `string` | token.colorError |
| primaryDangerColorBgHover | 主按钮 Danger 类型背景 Hover 色 | `string` | token.colorErrorHover |
| primaryDangerColor | 主按钮 Danger 类型字体颜色 | `string` | token.colorTextLightSolid |
| primaryDangerBorder | 主按钮 Danger 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| primaryWarningColorBg | 主按钮 Warning 类型背景色 | `string` | token.colorWarning |
| primaryWarningColorBgHover | 主按钮 Warning 类型背景 Hover 色 | `string` | token.colorWarningHover |
| primaryWarningColor | 主按钮 Warning 类型字体颜色 | `string` | token.colorTextLightSolid |
| primaryWarningBorder | 主按钮 Warning 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} transparent` |
| dashedColorBg | 虚线按钮 Default 背景颜色 | `string` | token.colorBorderSecondary |
| dashedColorBgHover | 虚线按钮 Default 类型背景 Hover 颜色 | `string` | token.colorBorder |
| dashedColor | 虚线按钮 Default 类型字体颜色 | `string` | token.colorText |
| dashedBorder | 虚线按钮 Default 类型边框 | `string` | `${token.lineWidth}px dashed ${token.colorBorder}` |
| dashedSuccessColorBg | 虚线按钮 Success 类型背景色 | `string` | token.colorSuccessBg |
| dashedSuccessColorBgHover | 虚线按钮 Success 类型背景 Hover 色 | `string` | token.colorSuccessBgHover |
| dashedSuccessColor | 虚线按钮 Success 类型字体颜色 | `string` | token.colorSuccess |
| dashedSuccessBorder | 虚线按钮 Success 类型边框 | `string` | `${token.lineWidth}px dashed ${token.colorSuccessBorder}` |
| dashedDangerColorBg | 虚线按钮 Danger 类型背景色 | `string` | token.colorErrorBg |
| dashedDangerColorBgHover | 虚线按钮 Danger 类型背景 Hover 色 | `string` | token.colorErrorBgHover |
| dashedDangerColor | 虚线按钮 Danger 类型字体颜色 | `string` | token.colorError |
| dashedDangerBorder | 虚线按钮 Danger 类型边框 | `string` | `${token.lineWidth}px dashed ${token.colorErrorBorder}` |
| dashedWarningColorBg | 虚线按钮 Warning 类型背景色 | `string` | token.colorWarningBg |
| dashedWarningColorBgHover | 虚线按钮 Warning 类型背景 Hover 色 | `string` | token.colorWarningBgHover |
| dashedWarningColor | 虚线按钮 Warning 类型字体颜色 | `string` | token.colorWarning |
| dashedWarningBorder | 虚线按钮 Warning 类型边框 | `string` | `${token.lineWidth}px dashed ${token.colorWarningBorder}` |
| textColorBg | 文本按钮 Default 背景颜色 | `string` | transparent |
| textColorBgHover | 文本按钮 Default 类型背景 Hover 颜色 | `string` | token.colorBgTextHover |
| textColor | 文本按钮 Default 类型字体颜色 | `string` | token.colorPrimary |
| textColorHover | 文本按钮 Default 类型字体 Hover 颜色 | `string` | token.colorPrimaryHover |
| textBorder | 文本按钮 Default 类型边框 | `string` | `${token.lineWidth}px dashed transparent` |
| textSuccessColorBg | 文本按钮 Success 类型背景色 | `string` | transparent |
| textSuccessColorBgHover | 文本按钮 Success 类型背景 Hover 色 | `string` | token.colorBgTextHover |
| textSuccessColor | 文本按钮 Success 类型字体颜色 | `string` | token.colorSuccess |
| textSuccessColorHover | 文本按钮 Success 类型字体 Hover 颜色 | `string` | token.colorSuccessHover |
| textSuccessBorder | 文本按钮 Success 类型边框 | `string` | `${token.lineWidth}px dashed transparent` |
| textDangerColorBg | 文本按钮 Danger 类型背景色 | `string` | transparent |
| textDangerColorBgHover | 文本按钮 Danger 类型背景 Hover 色 | `string` | token.colorBgTextHover |
| textDangerColor | 文本按钮 Danger 类型字体颜色 | `string` | token.colorError |
| textDangerColorHover | 文本按钮 Danger 类型字体 Hover 颜色 | `string` | token.colorErrorHover |
| textDangerBorder | 文本按钮 Danger 类型边框 | `string` | `${token.lineWidth}px dashed transparent` |
| textWarningColorBg | 文本按钮 Warning 类型背景色 | `string` | transparent |
| textWarningColorBgHover | 文本按钮 Warning 类型背景 Hover 色 | `string` | token.colorBgTextHover |
| textWarningColor | 文本按钮 Warning 类型字体颜色 | `string` | token.colorWarning |
| textWarningColorHover | 文本按钮 Warning 类型字体 Hover 颜色 | `string` | token.colorWarningHover |
| textWarningBorder | 文本按钮 Warning 类型边框 | `string` | `${token.lineWidth}px dashed transparent` |
| outlineColorBg | 线形按钮 Default 背景颜色 | `string` | transparent |
| outlineColorBgHover | 线形按钮 Default 类型背景 Hover 颜色 | `string` | transparent |
| outlineColor | 线形按钮 Default 类型字体颜色 | `string` | token.colorPrimary |
| outlineColorHover | 线形按钮 Default 类型字体 Hover 颜色 | `string` | token.colorPrimaryHover |
| outlineBorder | 线形按钮 Default 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorPrimary}` |
| outlineBorderHover | 线形按钮 Default 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorPrimaryHover}` |
| outlineSuccessColorBg | 线形按钮 Success 类型背景色 | `string` | transparent |
| outlineSuccessColorBgHover | 线形按钮 Success 类型背景 Hover 色 | `string` | transparent |
| outlineSuccessColor | 线形按钮 Success 类型字体颜色 | `string` | token.colorSuccess |
| outlineSuccessColorHover | 线形按钮 Success 类型字体 Hover 颜色 | `string` | token.colorSuccessHover |
| outlineSuccessBorder | 线形按钮 Success 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorSuccess}` |
| outlineSuccessBorderHover | 线形按钮 Default 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorSuccessHover}` |
| outlineDangerColorBg | 线形按钮 Danger 类型背景色 | `string` | transparent |
| outlineDangerColorBgHover | 线形按钮 Danger 类型背景 Hover 色 | `string` | transparent |
| outlineDangerColor | 线形按钮 Danger 类型字体颜色 | `string` | token.colorError |
| outlineDangerColorHover | 线形按钮 Danger 类型字体 Hover 颜色 | `string` | token.colorErrorHover |
| outlineDangerBorder | 线形按钮 Danger 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorError}` |
| outlineDangerBorderHover | 线形按钮 Danger 类型 Hover 边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorErrorHover}` |
| outlineWarningColorBg | 线形按钮 Warning 类型背景色 | `string` | transparent |
| outlineWarningColorBgHover | 线形按钮 Warning 类型背景 Hover 色 | `string` | transparent |
| outlineWarningColor | 线形按钮 Warning 类型字体颜色 | `string` | token.colorWarning |
| outlineWarningColorHover | 线形按钮 Warning 类型字体 Hover 颜色 | `string` | token.colorWarningHover |
| outlineWarningBorder | 线形按钮 Warning 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorWarning}` |
| outlineWarningBorderHover | 线形按钮 Warning 类型边框 | `string` | `${token.lineWidth}px ${token.lineType} ${token.colorWarningHover}` |

### 如何使用

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
```
