---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Notification 通知提示框

## 何时使用

全局展示通知提醒，将信息及时有效的传达给用户。

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。

## 代码演示

<code src="../../packages/ui/examples/notification/basic.tsx">基本用法</code>  
<code src="../../packages/ui/examples/notification/type.tsx" description="全局提示有 4 种不同的类型，分别为：info, success, warning, error。">不同类型</code>  
<code src="../../packages/ui/examples/notification/icon.tsx" description="设置 `icon` 来自定义图标。">自定义图标</code>  
<code src="../../packages/ui/examples/notification/update.tsx" description="通过指定 id，可以更新已经存在的消息提示。">更新内容</code>  
<code src="../../packages/ui/examples/notification/actions.tsx" description="通过指定 actions 字段，可以添加操作按钮。">自定义操作按钮</code>  
<code src="../../packages/ui/examples/notification/position.tsx" description="通过 `position` 修改消息提示位置，提示有 2 种不同的弹出位置，分别为顶部和底部。">提示位置</code>  
<code src="../../packages/ui/examples/notification/close.tsx" description="`Notification.xxx()` 会返回一个函数，调用此函数能手动关闭通知。">手动控制关闭</code>  
<code src="../../packages/ui/examples/notification/closable.tsx" description="设置 `closable` 来显示关闭按钮，支持自定义关闭按钮。">显示关闭按钮</code>  
<code src="../../packages/ui/examples/notification/hooks.tsx" description="手动植入 contextHolder 挂载，无法消费 context 上下文。">Hooks 用法</code>  
<code src="../../packages/ui/examples/notification/app.tsx" description="推荐使用 [App 包裹](/ui/app) 组件来提供可消费 React context 的 Notification.xxx 的静态方法，可以简化 useMessage 等方法需要手动植入 contextHolder 的问题。">useApp Hooks 用法</code>

## API

### Notification

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| title | 标题 | `string` | - |
| closable | 是否显示关闭按钮 | `boolean` | true |
| showIcon | 是否显示图标 | `boolean` | true |
| duration | 自动关闭的时间，单位为 `ms` | `number` | 3000 |
| id | 当前消息的唯一标识，可以用来更新消息 | `string` | - |
| transitionClassNames | 消息弹出动画的类名，见 react-transition-group 的 `classNames` | `string` | - |
| position | 消息的位置，分为 `top` 上方和 `bottom` 下方 | `top \| bottom` | - |
| closeIcon | 自定义右上角关闭按钮 | `ReactNode` | - |
| icon | 自定义图标 | `ReactNode` | - |
| actinos | 添加操作 | `ReactNode[]` | - |
| content | 消息内容 | `ReactNode \| string` | - |
| onClose | 关闭时的回调 | `() => void` | - |

### Notification.method(config)

使用方法

- `Notification.info(config: MessageProps | string)`
- `Notification.success(config: MessageProps | string)`
- `Notification.warning(config: MessageProps | string)`
- `Notification.error(config: MessageProps | string)`
- `Notification.remove(id)`
- `Notification.clear()`

### Notification.config 配置

`Notification.config(Options)`

`Options` 的具体参数如下所示：

| 参数名       |        描述        |        类型         |              默认值 |
| ------------ | :----------------: | :-----------------: | ------------------: |
| closable     |   是否有关闭按钮   |      `boolean`      |                   - |
| maxCount     |    最大通知数量    |      `number`       |                   - |
| getContainer |   放置通知的容器   | `() => HTMLElement` | () => document.body |
| duration     | 通知自动关闭的时间 |      `number`       |                3000 |
| title        |        标题        |      `string`       |                   - |

### Notification.useNotification 方法

通过方法去使用对话框，像是 `Notification.info` `Notification.success`，因为是通过 `ReactDOM.render` 直接渲染，所以不在上下文中，因此拿不到 `context`。如果希望获取上下文 `context`，那么可以通过 `useNotification` 去通过 hook 的方法调用，将 `contextHolder` 放到上下文中。

```js
const [notification, contextHolder] = Notification.useNotification();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => notification.info('Something notification!')}>Open</Button>
</Context.Provider>;
```
