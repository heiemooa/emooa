---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Modal 弹窗

## 何时使用

在当前页面打开一个浮层，承载相关操作。

## 代码演示

<code src="../../packages/ui/examples/modal/basic.tsx" description="文本信息对话框。">基本用法</code>  
<code src="../../packages/ui/examples/modal/async.tsx" description="在对话框中使用表单时，如提交表单，点击确定后异步关闭对话框。可通过设置 `loadingConfirming` 或 `onOK` 为 `Promise` 时进行异步关闭">异步关闭</code>  
<code src="../../packages/ui/examples/modal/footer.tsx" description="传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 `props`。如果 `okButtonProps` 、 `cancelButtonProps` 仍然不能满足需要的话，可以直接传入 `footer` 来自定义页脚内容。">自定义页脚</code>  
<code src="../../packages/ui/examples/modal/disabled.tsx" description="通过 `diabledOnPromise` 可设置 `onOk` 在 `Promise` 期间不可关闭对话框。">异步期间禁用</code>  
<code src="../../packages/ui/examples/modal/btn-text.tsx" description="设置 `okText` 与 `cancelText` 以自定义按钮文字。">自定义文案</code>  
<code src="../../packages/ui/examples/modal/location.tsx" description="使用 `center` 或类似 `style.top、style.width` 的样式来设置对话框位置。">自定义位置</code>

## API

### Modal

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| classNames | 组件名称 | `header?: string; content?: string; footer?: string; mask?: string; wrapper?: string;` | - |
| style | 组件样式 | `CSSProperties` | - |
| styles | 组件样式 | `header?: CSSProperties; content?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties;` | - |
| autoFocus | 是否默认聚焦第一个可聚焦元素。 | `boolean` | true |
| closable | 是否显示右上角的关闭按钮 | `boolean` | - |
| confirmLoading | 确认按钮加载中 | `boolean` | - |
| disabledOnPromise | 在 onOk 为 Promise 事件时，并且加载中的时候，取消、close icon、mask 等不可点击 | `boolean` | - |
| escToExit | 按 `ESC` 键关闭 | `boolean` | true |
| mask | 是否显示遮罩 | `boolean` | true |
| maskClosable | 点击蒙层是否可以关闭 | `boolean` | true |
| mountOnEnter | 是否在初次打开对话框时才渲染 dom | `boolean` | true |
| unmountOnExit | 是否在隐藏之后销毁 DOM 结构 | `boolean` | - |
| visible | 弹出框是否可见 | `boolean` | - |
| cancelText | 取消按钮文案 | `ReactNode` | - |
| closeIcon | 自定义右上角的关闭按钮节点 | `ReactNode` | - |
| okText | 确认按钮文案 | `ReactNode` | - |
| title | 弹出框的标题 | `string \| ReactNode` | - |
| center | 是否居中 | `boolen` | - |
| cancelButtonProps | 取消按钮的 props | [ButtonProps](/ui/button#button) | - |
| okButtonProps | 确认按钮的 props | [ButtonProps](/ui/button#button) | - |
| onOk | 点击确认按钮的回调 | `(e?: MouseEvent) => Promise<any> \| void` | - |
| onCancel | 关闭弹出框的回调 | `(e?: MouseEvent) => void ` | - |
| afterClose | 弹框关闭之后的回调 | `() => void` | - |
| afterOpen | 弹框打开之后的回调 | `() => void` | - |
| footer | 自定义页脚，传入 null 则不显示 | `ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode)` | - |
| getPopupContainer | 指定弹出框挂载的父节点 | `() => Element` | () => document.body |
| modalRender | 自定义渲染对话框 | `(modalNode: ReactNode) => ReactNode` | - |
