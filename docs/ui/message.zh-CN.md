---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Message 消息提示

## 何时使用

由用户的操作触发的轻量级全局消息反馈。

## 代码演示

<code src="../../packages/ui/examples/message/basic.tsx">基本用法</code>  
<code src="../../packages/ui/examples/message/type.tsx" description="全局提示有 4 种不同的类型，分别为：info, success, warning, error。">不同类型</code>  
<code src="../../packages/ui/examples/message/icon.tsx" description="设置 `icon` 来自定义图标。">自定义图标</code>  
<code src="../../packages/ui/examples/message/update.tsx" description="通过指定 id，可以更新已经存在的消息提示。">更新内容</code>  
<code src="../../packages/ui/examples/message/position.tsx" description="通过 `position` 修改消息提示位置，提示有 2 种不同的弹出位置，分别为顶部和底部。">提示位置</code>  
<code src="../../packages/ui/examples/message/close.tsx" description="`Message.xxx()` 会返回一个函数，调用此函数能手动关闭通知。">手动控制关闭</code>  
<code src="../../packages/ui/examples/message/closable.tsx" description="设置 `closable` 来显示关闭按钮，支持自定义关闭按钮。">显示关闭按钮</code>  
<code src="../../packages/ui/examples/message/hooks.tsx" description="手动植入 contextHolder 挂载，无法消费 context 上下文。">Hooks 用法</code>  
<code src="../../packages/ui/examples/message/app.tsx" description="推荐使用 [App 包裹](/ui/app) 组件来提供可消费 React context 的 Message.xxx 的静态方法，可以简化 useMessage 等方法需要手动植入 contextHolder 的问题。">useApp Hooks 用法</code>

## API

### Message

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| closable | 是否显示关闭按钮 | `boolean` | true |
| showIcon | 是否显示图标 | `boolean` | true |
| duration | 自动关闭的时间，单位为 `ms` | `number` | 3000 |
| id | 当前消息的唯一标识，可以用来更新消息 | `string` | - |
| transitionClassNames | 消息弹出动画的类名，见 react-transition-group 的 `classNames` | `string` | - |
| position | 消息的位置，分为 `top` 上方和 `bottom` 下方 | `top \| bottom` | - |
| closeIcon | 自定义右上角关闭按钮 | `ReactNode` | - |
| icon | 自定义图标 | `ReactNode` | - |
| content | 消息内容 | `ReactNode \| string` | - |
| onClose | 关闭时的回调 | `() => void` | - |

### Message.method(config)

使用方法

- `Message.info(config: MessageProps | string)`
- `Message.success(config: MessageProps | string)`
- `Message.warning(config: MessageProps | string)`
- `Message.error(config: MessageProps | string)`
- `Message.loading(config: MessageProps | string)`

### 全局设置

`Message.config(Options)`

`Options` 的具体参数如下所示：

| 参数名       |        描述        |        类型         |              默认值 |
| ------------ | :----------------: | :-----------------: | ------------------: |
| closable     |   是否有关闭按钮   |      `boolean`      |                   - |
| maxCount     |    最大通知数量    |      `number`       |                   - |
| getContainer |   放置通知的容器   | `() => HTMLElement` | () => document.body |
| duration     | 通知自动关闭的时间 |      `number`       |                3000 |

### Message.useMessage 方法

通过方法去使用对话框，像是 `Message.info` `Message.success`，因为是通过 `ReactDOM.render` 直接渲染，所以不在上下文中，因此拿不到 `context`。如果希望获取上下文 `context`，那么可以通过 `useMessage` 去通过 hook 的方法调用，将 `contextHolder` 放到上下文中。

```js
const [message, contextHolder] = Message.useMessage();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => message.info('Something message!')}>Open</Button>
</Context.Provider>;
```
