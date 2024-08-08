---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Modal

## Usage

Open a floating layer on the current page to carry related operations.

## Examples

<code src="../../packages/ui/examples/modal/basic.tsx" description="Text information dialog box.">Basic usage</code>  
<code src="../../packages/ui/examples/modal/async.tsx" description="When using a form in a dialog box, such as submitting the form, click OK to close the dialog box asynchronously. You can set it by ` Asynchronous closing when loadingConfirming` or `onOK` is `Promise`">Asynchronous closing</code>  
<code src="../../packages/ui/examples/modal/footer.tsx" description="Pass in `okButtonProps` and `cancelButtonProps` to customize the `props` of the OK button and the Cancel button respectively. If If `okButtonProps` and `cancelButtonProps` still cannot meet the needs, you can directly pass in `footer` to customize the footer content ">Customized footer</code>  
<code src="../../packages/ui/examples/modal/disabled.tsx" description="`onOk` can be set via `disabledOnPromise`. The dialog cannot be closed during `Promise`."> Disabled during asynchronous </code>  
<code src="../../packages/ui/examples/modal/text.tsx" description="Set `okText` and `cancelText` to customize button text.">Customized copy</code>  
<code src="../../packages/ui/examples/modal/location.tsx" description="Use `center` or a style like `style.top, style.width` to set the dialog position." >Custom location</code>  
<code src="../../packages/ui/examples/modal/confirm.tsx" description="Use `Modal.confirm()` to quickly pop up the dialog box." >Confirmation box</code>  
<code src="../../packages/ui/examples/modal/notice.tsx" description="There are four types of message prompts: `info`, `success`, `warning`, `error`, only Provide a confirmation button to close the message prompt dialog box ">Message prompt</code>  
<code src="../../packages/ui/examples/modal/sleep.tsx" description="Control manual updating and closing of dialog boxes based on `Modal` instances.">Manual updating and removal</code>  
<code src="../../packages/ui/examples/modal/hooks.tsx" description="Create a `contextHolder` that supports reading `context` through `Modal.useModal`. Only the hooks method is supported Promise await operation. ">Use hooks to obtain context</code>  
<code src="../../packages/ui/examples/modal/draggable.tsx" description="Customized rendering dialog, drag and drop can be achieved through `react-draggable`.">Customized rendering dialog box</code>

## API

### Modal

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --: | --- | --- |
| className | The className of Modal | `string` | - |
| classNames | Config Modal build-in module's className | `header?: string; content?: string; footer?: string; mask?: string; wrapper?: string;` | - |
| style | The style of Modal | `CSSProperties` | - |
| styles | Config Modal build-in module's style | `header?: CSSProperties; content?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties;` | - |
| autoFocus | Specify which button to autofocus | `boolean` | true |
| closable | Whether a close (x) button is visible on top right of the confirm dialog or not | `boolean` | - |
| confirmLoading | Whether to apply loading visual effect for OK button or not | `boolean` | - |
| disabledOnPromise | When `onOk` is a `Promise` event and is loading, `cancel`, `close icon`, `mask`, `etc`. cannot be clicked. | `boolean` | - |
| escToExit | Whether enable press `ESC` to close Modal | `boolean` | true |
| mask | Whether show mask or not | `boolean` | true |
| maskClosable | Whether enable click mask to close Modal | `boolean` | true |
| mountOnEnter | Whether to render DOM when first opened dom | `boolean` | true |
| unmountOnExit | Whether to destroy DOM after closed | `boolean` | - |
| open | Whether the Modal is open | `boolean` | - |
| cancelText | The text of `cancel` button | `ReactNode` | - |
| closeIcon | Customize the close icon | `ReactNode` | - |
| okText | The text of `ok` button | `ReactNode` | - |
| title | The title of Modal | `string \| ReactNode` | - |
| center | Modal is centered vertically and horizontally | `boolen` | - |
| cancelButtonProps | The props of `cancel` button | [ButtonProps](/ui/button#button) | - |
| okButtonProps | The props of `ok` button | [ButtonProps](/ui/button#button) | - |
| onOk | Callback when click ok button | `(e?: MouseEvent) => Promise<any> \| void` | - |
| onCancel | Callback when click cancel button | `(e?: MouseEvent) => void ` | - |
| afterClose | Callback when Modal closed | `() => void` | - |
| afterOpen | Callback when Modal opened | `() => void` | - |
| footer | Custom `footer`. if it is null, the footer will not be displayed | `ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode)` | - |
| getPopupContainer | Specify the parent node of the Modal | `() => Element` | () => document.body |
| modalRender | Custom the render of Modal | `(modalNode: ReactNode) => ReactNode` | - |

### Modal.method(config)

Including the following:

- `Modal.confirm(config)`
- `Modal.info(config)`
- `Modal.success(config)`
- `Modal.warning(config)`
- `Modal.error(config)`

The above functions will return an object, which can be used to update or close the Modal. Ex:

```js
const info = Modal.info({ title: 'Info' });
info.update({ title: 'Updated Title' });
info.close();
```

`config`'s details (extends all Modal's props):

| **Parameters** | **Type**             | **Default value** | **Definition** |
| -------------- | -------------------- | ----------------- | -------------- |
| content        | The content of Modal | `ReactNode`       | -              |
| icon           | The icon of Modal    | `ReactNode`       | -              |

### Modal.destroyAll

`Modal.destroyAll` will close all confirm modal (including `Modal.confirm` `Modal.info` `Modal.success` `Modal.error` `Modal.warning`), generally used when routing changes, Close all popups.

```js
Modal.destroyAll();
```

### Modal.useModal

Use method function to open Modal, such as `Modal.confirm` `Modal.warning`, because it is directly rendered through `ReactDOM.render`, so it is not in the context, so you cannot get `context`. If you want to get context, you can use `useModal`, Put the `contextHolder` in the context.

```js
const [modal, contextHolder] = Modal.useModal();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => modal.warning({ title: 'Title', content: 'content' })}>Open</Button>
</Context.Provider>;
```
