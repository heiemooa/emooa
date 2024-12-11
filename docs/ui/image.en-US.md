---
nav: Components
group:
  title: Data Entry
  order: 0
toc: content
---

# Image

## Usage

When lazy loading of images is required.

## Examples

<code src="../../packages/ui/examples/image/basic.tsx">Basic</code>  
<code src="../../packages/ui/examples/image/delay.tsx" description="By setting `delay`, the delayed placeholder is enabled by default. When loading a large image, the placeholder will be loaded after a certain time. Support manual loading by setting `content`.">Lazy loading placeholder</code>  
<code src="../../packages/ui/examples/image/placeholder.tsx" description="By default, the loading effect is not displayed. You can display the default loading effect by setting `placeholder=true`. Supports custom placeholders.">Placeholder</code>  
<code src="../../packages/ui/examples/image/footer.tsx" description="By setting `title` and `description`, the title and description of the image can be displayed at the bottom of the image.">Show Caption & Action</code>  
<code src="../../packages/ui/examples/image/actions.tsx" description="By setting `actionsLayout`, you can adjust the order of the function buttons in the preview control bar, and you can filter the function buttons so that only buttons in `actionsLayout` will appear. Among them, `extra` represents the button in `actions`, and the `key` in `actions` also supports being sorted separately.">Custom preview control bar</code>  
<code src="../../packages/ui/examples/image/preview.tsx" description="`Image.Preview` can be used alone, you need to configure `src` and control `visible`.">Use the preview component alone</code>  
<code src="../../packages/ui/examples/image/preview-group.tsx" description="Use `<Image.PreviewGroup>` to wrap the `<Image>` component to preview multiple images.">Multiple image preview</code>  
<code src="../../packages/ui/examples/image/preview-group-btn.tsx" description="`Image.PreviewGroup` can be used alone and needs to be controlled through `visible` and `onVisibleChange`. There are two scenarios for displaying pictures. One is to specify the first picture to be displayed through `defaultCurrent`; the other is to use `current` and `onChange` to control which picture is currently displayed in a controlled manner.">Use the multi-image preview component alone</code>  
<code src="../../packages/ui/examples/image/popup-container.tsx" description="You can specify the parent node of the preview mount through `getPopupContainer`.">Mount node</code>  
<code src="../../packages/ui/examples/image/process.tsx" description="Setting `lazy` can enable lazy loading, and the image will not be loaded until it appears in the viewport. The `lazy` attribute is implemented based on the `IntersectionObserver API`. Supports asynchronous observation of intersection changes between target elements and ancestor elements or top-level document viewports to determine loading timing.">Lazy loading of boundary configuration</code>  
<code src="../../packages/ui/examples/image/error.tsx" description="If loading fails, the image failure placeholder is displayed. Supports setting `error` to customize the error placeholder.">Fault tolerant</code>

## API

### Image

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | The className of Image | `string` | - |
| style | The style of Image | `CSSProperties` | - |
| url | Image url path. | `string` | - |
| title | Title | `string` | - |
| description | Description | `string` | - |
| placeholder | Load placeholder, use default placeholder or false | `boolean` `string` `React.ReactNode` | -- |
| content | Loading component | `React.ReactNode` | -- |
| preview | Whether to enable preview | `boolean` | true |
| motion | Whether to enable the animation of successful loading | `boolean` | false |
| actions | Extra operations | `React.ReactNode[]` | -- |
| error | error placeholder | `React.ReactNode` | -- |
| delay | (ms) The placeholder will be rendered if the url is not loaded within the delay time range. | number | -- |
| options | `IntersectionObserver` properties api. | [Options](#options) | - |
| onError | Triggered when image loading fails. | `(event: Event) => void` | - |
| onLoad | Triggered when image loading success. | `(event: Event) => void` | - |

Other attributes [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

### Lazy

Optional `Lazy Options` property reference [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| root | The [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) whose bounds are used as the bounding box when testing for intersection. If no root value was passed to the constructor or its value is null, the top-level document's viewport is used. | React.ReactElement | null |
| rootMargin | An offset rectangle applied to the root's [bounding box](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (px) or as a percentage (%). The default is "0px 0px 0px 0px". | string | "0px 0px 0px 0px" |
| thresholds | A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used. |
| number | 0 |

### Image.Preview

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Image.Preview | `string` | - |
| style | The style of Image.Preview | `CSSProperties` | - |
| closable | Whether to display a close button | `boolean` | true |
| defaultVisible | Visible by default, uncontrolled | `boolean` | - |
| defaultScale | Default scale，range from 0 to 1 | number | 1 |
| escToExit | Press the `ESC` key to close the preview | `boolean` | true |
| maskClosable | Clicking on mask triggers shutdown | `boolean` | true |
| visible | Visible or not, controlled attribute | `boolean` | - |
| src | Image acquisition address, in `Image`, the default is `Image's src` | `string` | - |
| extra | Image attributes, transparently transmitted to the `img` tag in the preview pop-up window | `Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>` | - |
| actionsLayout | Control bar layout | `string[]` | `['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']` |
| scales | The zoom percentage in the current array is used when previewing zoom. If it does not contain `100%`, it will be automatically added at the nearest position. | `number[]` | `[30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ]` |
| actions | Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops) | [ImagePreviewActionProps](#imagepreviewactionprops)[] | - |
| getPopupContainer | Pop-up layer mounted node | `() => HTMLElement` | () => document.body |
| imageRender | Rendering of custom `image` elements | `(originalNode: ReactElement) => ReactNode` | - |
| onVisibleChange | Event triggered by switching visible state | `(visible: boolean, preVisible: boolean) => void` | - |

### Image.PreviewGroup

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of Image.Preview | `string` | - |
| style | The style of Image.Preview | `CSSProperties` | - |
| closable | Whether to display a close button | `boolean` | true |
| defaultVisible | Visible by default, uncontrolled | `boolean` | - |
| escToExit | Press the `ESC` key to close the preview | `boolean` | true |
| maskClosable | Clicking on mask triggers shutdown | `boolean` | true |
| visible | Visible or not, controlled attribute | `boolean` | - |
| src | Image acquisition address, in `Image`, the default is `Image's src` | `string` | - |
| extra | Image attributes, transparently transmitted to the `img` tag in the preview pop-up window | `Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>` | - |
| actionsLayout | Control bar layout | `string[]` | `['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']` |
| scales | The zoom percentage in the current array is used when previewing zoom. If it does not contain `100%`, it will be automatically added at the nearest position. | `number[]` | `[30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ]` |
| actions | Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops) | [ImagePreviewActionProps](#imagepreviewactionprops)[] | - |
| getPopupContainer | Pop-up layer mounted node | `() => HTMLElement` | () => document.body |
| imageRender | Rendering of custom `image` elements | `(originalNode: ReactElement) => ReactNode` | - |
| onVisibleChange | Event triggered by switching visible state | `(visible: boolean, preVisible: boolean) => void` | - |
| loop | Whether to loop infinitely | `boolean` | - |
| current | The index of the currently displayed image (controlled attribute) | `number` | - |
| defaultCurrent | The subscript of the first displayed image | `number` | - |
| items | Picture list (after setting this attribute, the picture information of the Image subcomponent will no longer be collected) | `string[]` | ` |
| onChange | Event triggered by switching pictures | `(index: number) => void` | - |

### ImagePreviewActionProps

Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.

| **Parameters** | **Definition**                           | **Type**        | **Default value** |
| -------------- | ---------------------------------------- | --------------- | ----------------- |
| className      | The className of ImagePreviewActionProps | `string`        | -                 |
| style          | The style of ImagePreviewActionProps     | `CSSProperties` | -                 |
| disabled       | Whether to disable                       | `boolean`       | -                 |
| key            | Uniquely identifies                      | `string`        | -                 |
| name           | Name                                     | `string`        | -                 |
| content        | Content                                  | `ReactNode`     | -                 |
