---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Drawer 抽屉

## 何时使用

基础抽屉，点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

## 代码演示

<code src="../../packages/ui/examples/drawer/basic.tsx" description="基础抽屉，点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。">基本用法</code>  
<code src="../../packages/ui/examples/drawer/placement.tsx" description="自定义位置，点击触发按钮抽屉从相应的位置滑出。">自定义位置</code>  
<code src="../../packages/ui/examples/drawer/async.tsx" description="在对话框中使用表单时，如提交表单，点击确定后异步关闭对话框。可通过设置 `loadingConfirming` 或 `onOK` 为 `Promise` 时进行异步关闭">异步关闭</code>  
<code src="../../packages/ui/examples/drawer/footer.tsx" description="传入 `okButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 `props`。如果 `okButtonProps` 、 `cancelButtonProps` 仍然不能满足需要的话，可以直接传入 `footer` 来自定义页脚内容。">自定义页脚</code>  
<code src="../../packages/ui/examples/drawer/disabled.tsx" description="通过 `disabledOnPromise` 可设置 `onOk` 在 `Promise` 期间不可关闭对话框。">异步期间禁用</code>  
<code src="../../packages/ui/examples/drawer/two.tsx" description="在抽屉内打开新的抽屉。">多层抽屉</code>  
<code src="../../packages/ui/examples/drawer/container.tsx" description="可以通过 `getPopupContainer` 指定抽屉挂载的父级节点。">挂载节点</code>

## API

### Drawer

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| classNames | 组件名称 | `header?: string; content?: string; footer?: string; mask?: string; wrapper?: string;` | - |
| style | 组件样式 | `CSSProperties` | - |
| styles | 组件样式 | `header?: CSSProperties; content?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties;` | - |
| autoFocus | 是否默认聚焦第一个可聚焦元素。 | `boolean` | true |
| closable | 是否显示右上角的关闭按钮 | `boolean` | - |
| confirmLoading | 确认按钮加载中 | `boolean` | - |
| disabledOnPromise | 在 `onOk` 为 `Promise` 事件时，并且加载中的时候，`取消`、`close icon`、`mask` 等不可点击 | `boolean` | - |
| escToExit | 按 `ESC` 键关闭 | `boolean` | true |
| mask | 是否显示遮罩 | `boolean` | true |
| maskClosable | 点击蒙层是否可以关闭 | `boolean` | true |
| mountOnEnter | 是否在初次打开对话框时才渲染 dom | `boolean` | true |
| unmountOnExit | 是否在隐藏之后销毁 DOM 结构 | `boolean` | - |
| open | 弹出框是否可见 | `boolean` | - |
| cancelText | 取消按钮文案 | `ReactNode` | - |
| closeIcon | 自定义右上角的关闭按钮节点 | `ReactNode` | - |
| okText | 确认按钮文案 | `ReactNode` | - |
| title | 弹出框的标题 | `string \| ReactNode` | - |
| placement | 抽屉位置 | `right \| left \| top \| bottom` | right |
| cancelButtonProps | 取消按钮的 props | [ButtonProps](/ui/button#button) | - |
| okButtonProps | 确认按钮的 props | [ButtonProps](/ui/button#button) | - |
| onOk | 点击确认按钮的回调 | `(e?: MouseEvent) => Promise<any> \| void` | - |
| onCancel | 关闭弹出框的回调 | `(e?: MouseEvent) => void ` | - |
| afterClose | 弹框关闭之后的回调 | `() => void` | - |
| afterOpen | 弹框打开之后的回调 | `() => void` | - |
| footer | 自定义页脚，传入 null 则不显示 | `ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode)` | - |
| getPopupContainer | 指定弹出框挂载的父节点 | `() => Element` | () => document.body |
