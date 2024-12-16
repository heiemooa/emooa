---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Notification

## Usage

Lightweight global notification feedback triggered by user actions.

## Examples

<code src="../../packages/ui/examples/notification/basic.tsx">Basic</code>  
<code src="../../packages/ui/examples/notification/type.tsx" description="There are 4 different types of global prompts: info, success, warning, error.">Different Type</code>  
<code src="../../packages/ui/examples/notification/icon.tsx" description="Set `icon` to customize the icon.">Custom Icon</code>  
<code src="../../packages/ui/examples/notification/update.tsx" description="By specifying the id, you can update an existing notification prompt.">Update Content</code>  
<code src="../../packages/ui/examples/notification/actions.tsx" description="Action buttons can be added by specifying the `actions` field.">Custom action button</code>  
<code src="../../packages/ui/examples/notification/position.tsx" description="Modify the notification prompt position through `position`. The prompt has 2 different pop-up positions, top and bottom.">Prompt Location</code>  
<code src="../../packages/ui/examples/notification/close.tsx" description="`Notification.xxx()` will return a function that can be called to manually close the notification.">Manual control off</code>  
<code src="../../packages/ui/examples/notification/closable.tsx" description="Set `closable` to display the close button and support custom close buttons.">Show close button</code>  
<code src="../../packages/ui/examples/notification/hooks.tsx" description="Manually implant the contextHolder mount, and the context context cannot be consumed.">Hooks Usage</code>  
<code src="../../packages/ui/examples/notification/app.tsx" description="It is recommended to use the [App package](/ui/app) component to provide static methods that can consume Notification.xxx of React context, which can simplify the problem that methods such as useMessage need to be manually implanted into contextHolder.">useApp Hooks Usage</code>

## API

### Notification

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | Notification class name | `string` | - |
| style | Notification style | `CSSProperties` | - |
| title | Notification title | `string` | - |
| closable | Whether to show the close button | `boolean` | true |
| showIcon | Whether to show the icon | boolean | `true` |
| duration | Automatic shutdown time, the unit is `ms` | `number` | 3000 |
| id | The unique identifier of the current notification, which can be used to update the notification | `string` | - |
| transitionClassNames | ClassNames of react-transition-group of the notification pop-up animation, see `classNames` | `string` | - |
| position | The position of the notification | `top \| bottom` | - |
| closeIcon | Custom the close button on top-right of the drawer dialog | `ReactNode` | - |
| icon | Custom icon | `ReactNode` | - |
| content | Notification content | `ReactNode \| string` | - |
| onClose | Callback when close | `() => void` | - |

### Notification.method(config)

Usage

- `Notification.info(config: MessageProps | string)`
- `Notification.success(config: MessageProps | string)`
- `Notification.warning(config: MessageProps | string)`
- `Notification.error(config: MessageProps | string)`
- `Notification.loading(config: MessageProps | string)`
- `Notification.remove(id)`
- `Notification.clear()`

### Notification.config Setting

`Notification.config(Options)`

`Options` The specific parameters are as follows：

| **Parameters** |                        **Type**                        |  **Default value**  |      **Definition** |
| -------------- | :----------------------------------------------------: | :-----------------: | ------------------: |
| closable       |                Is there a close button                 |      `boolean`      |                   - |
| maxCount       |            Maximum number of notifications             |      `number`       |                 `-` |
| getContainer   |             Container of the notification              | `() => HTMLElement` | () => document.body |
| duration       | The time when the notification is automatically closed |      `number`       |                3000 |
| title          |                   Notification title                   |      `string`       |                   - |

### Notification.useMessage Methods

Use the dialog box through methods, such as `Notification.info` `Notification.success`, because it is directly rendered through `ReactDOM.render`, so it is not in the context, so you cannot get `context`. If you want to get the context `context`, you can use `useMessage` to call the hook method and put `contextHolder` into the context.

```js
const [notification, contextHolder] = Notification.useMessage();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => notification.info('Something notification!')}>Open</Button>
</Context.Provider>;
```
