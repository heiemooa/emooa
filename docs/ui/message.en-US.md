---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Message

## Usage

Lightweight global message feedback triggered by user actions.

## Examples

<code src="../../packages/ui/examples/message/basic.tsx">Basic</code>  
<code src="../../packages/ui/examples/message/type.tsx" description="There are 4 different types of global prompts: info, success, warning, error.">Different Type</code>  
<code src="../../packages/ui/examples/message/icon.tsx" description="Set `icon` to customize the icon.">Custom Icon</code>  
<code src="../../packages/ui/examples/message/update.tsx" description="By specifying the id, you can update an existing message prompt.">Update Content</code>  
<code src="../../packages/ui/examples/message/position.tsx" description="Modify the message prompt position through `position`. The prompt has 2 different pop-up positions, top and bottom.">Prompt Location</code>  
<code src="../../packages/ui/examples/message/close.tsx" description="`Message.xxx()` will return a function that can be called to manually close the notification.">Manual control off</code>  
<code src="../../packages/ui/examples/message/closable.tsx" description="Set `closable` to display the close button and support custom close buttons.">Show close button</code>  
<code src="../../packages/ui/examples/message/hooks.tsx" description="Manually implant the contextHolder mount, and the context context cannot be consumed.">Hooks Usage</code>  
<code src="../../packages/ui/examples/message/app.tsx" description="It is recommended to use the [App package](/ui/app) component to provide static methods that can consume Message.xxx of React context, which can simplify the problem that methods such as useMessage need to be manually implanted into contextHolder.">useApp Hooks Usage</code>

## API

### Message

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| closable | Whether to show the close button | `boolean` | false |
| showIcon | Whether to show the icon | boolean | `true` |
| duration | Automatic shutdown time, the unit is `ms` | `number` | 3000 |
| id | The unique identifier of the current message, which can be used to update the message | `string` | - |
| transitionClassNames | ClassNames of react-transition-group of the message pop-up animation, see `classNames` | `string` | - |
| position | The position of the message | `top \| bottom` | - |
| closeIcon | Custom the close button on top-right of the drawer dialog | `ReactNode` | - |
| icon | Custom icon | `ReactNode` | - |
| content | Message content | `ReactNode \| string` | - |
| onClose | Callback when close | `() => void` | - |

### Message.method(config)

Usage

- `Message.info(config: MessageProps | string)`
- `Message.success(config: MessageProps | string)`
- `Message.warning(config: MessageProps | string)`
- `Message.error(config: MessageProps | string)`
- `Message.loading(config: MessageProps | string)`
- `Message.clear()`

### Message.config Setting

`Message.config(Options)`

`Options` The specific parameters are as follows：

| **Parameters** |                        **Type**                        |  **Default value**  |      **Definition** |
| -------------- | :----------------------------------------------------: | :-----------------: | ------------------: |
| closable       |                Is there a close button                 |      `boolean`      |                   - |
| maxCount       |            Maximum number of notifications             |      `number`       |                 `-` |
| getContainer   |             Container of the notification              | `() => HTMLElement` | () => document.body |
| duration       | The time when the notification is automatically closed |      `number`       |                3000 |

### Message.useMessage Methods

Use the dialog box through methods, such as `Message.info` `Message.success`, because it is directly rendered through `ReactDOM.render`, so it is not in the context, so you cannot get `context`. If you want to get the context `context`, you can use `useMessage` to call the hook method and put `contextHolder` into the context.

```js
const [message, contextHolder] = Message.useMessage();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => message.info('Something message!')}>Open</Button>
</Context.Provider>;
```
