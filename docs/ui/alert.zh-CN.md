---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Alert 警告提示

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 通过警告提示，展现需要关注的信息，用户可以点击关闭。

## 代码演示

<code src="../../packages/ui/examples/alert/basic.tsx" description="最简单的用法，适用于简短的警告提示。">基本用法</code>  
<code src="../../packages/ui/examples/alert/type.tsx" description="共有四种样式 `success`、`info`、`warning`、`error`。">不同类型</code>  
<code src="../../packages/ui/examples/alert/closable.tsx" description="显示关闭按钮，点击可关闭警告提示。通过设置 `closeIcon` 可以自定义关闭按钮。">可关闭</code>  
<code src="../../packages/ui/examples/alert/showIcon.tsx" description="通过 `icon` 属性自定义图标，可通过 `showIcon=false` 来不显示图标。">图标</code>  
<code src="../../packages/ui/examples/alert/title.tsx" description="通过设置 `title` 可以给添加标题，将 `content` 变为辅助性介绍文字。">标题</code>  
<code src="../../packages/ui/examples/alert/banner.tsx" description="设置 `banner = true`，可以当作顶部公告使用。" iframe="250">顶部公告</code>  
<code src="../../packages/ui/examples/alert/action.tsx" description="通过 `action` 可以自定义右上角操作项。">操作项</code>

## API

### Message

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | info |
| type | 警告的类型 | `'info' \| 'success' \| 'warning' \| 'error'` | - |
| icon | 设置按钮的图标，`showIcon` 为 `true` 时生效。 | `ReactNode` | - |
| closable | 是否展示关闭按钮图标。 | `boolean` | - |
| showIcon | 是否展示图标。 | `boolean` | true |
| title | 标题 | `ReactNode` | - |
| content | 内容 | `ReactNode` | - |
| closeIcon | 自定义关闭按钮，`closable` 为 `true` 时生效。 | `ReactNode` | - |
| onClose | 关闭的回调 | `(e) => void` | - |
| ofterClose | 关闭动画结束后执行的回调 | `() => void` | - |
| action | 自定义操作项 | `ReactNode` | - |
| banner | 是否用作顶部公告 | `boolean` | - |
