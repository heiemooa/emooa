---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
demo:
  cols: 2
---

# Drawer

## Usage

Basic drawer, click the trigger button to slide the drawer out from the right, click the mask area to close.

Users do not have to leave the current task when operating in the drawer. After the operation is completed, they can smoothly return to the original task.

## Examples

<code src="../../packages/ui/examples/drawer/basic.tsx" description="Text information dialog box.">Basic usage</code>  
<code src="../../packages/ui/examples/drawer/placement.tsx" description="Customize the position and click the trigger button to slide the drawer out from the corresponding position.">Custom Location</code>  
<code src="../../packages/ui/examples/drawer/async.tsx" description="When using a form in a dialog box, such as submitting the form, click OK to close the dialog box asynchronously. You can set it by ` Asynchronous closing when loadingConfirming` or `onOK` is `Promise`">Asynchronous closing</code>  
<code src="../../packages/ui/examples/drawer/footer.tsx" description="Pass in `okButtonProps` and `cancelButtonProps` to customize the `props` of the OK button and the Cancel button respectively. If If `okButtonProps` and `cancelButtonProps` still cannot meet the needs, you can directly pass in `footer` to customize the footer content ">Customized footer</code>  
<code src="../../packages/ui/examples/drawer/disabled.tsx" description="`onOk` can be set via `disabledOnPromise`. The dialog cannot be closed during `Promise`."> Disabled during asynchronous </code>  
<code src="../../packages/ui/examples/drawer/two.tsx" description="Open new drawers within drawers.">Multi-layer Drawers</code>  
<code src="../../packages/ui/examples/drawer/container.tsx" description="You can specify the parent node of the drawer mounting through `getPopupContainer`.">Mount Node</code>

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
| placement | The location of Drawer | `right \| left \| top \| bottom` | right |
| cancelButtonProps | The props of `cancel` button | [ButtonProps](/ui/button#button) | - |
| okButtonProps | The props of `ok` button | [ButtonProps](/ui/button#button) | - |
| onOk | Callback when click ok button | `(e?: MouseEvent) => Promise<any> \| void` | - |
| onCancel | Callback when click cancel button | `(e?: MouseEvent) => void ` | - |
| afterClose | Callback when Modal closed | `() => void` | - |
| afterOpen | Callback when Modal opened | `() => void` | - |
| footer | Custom `footer`. if it is null, the footer will not be displayed | `ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode)` | - |
| getPopupContainer | Specify the parent node of the Modal | `() => Element` | () => document.body |
