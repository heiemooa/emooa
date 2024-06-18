---
nav: Components
group: 
    title: General
    order: 2
order: 0
toc: content
---

# Image 

## Usage
When lazy loading of images is required.


## Examples

<code src="../../packages/ui/examples/image/basic.tsx">Basic</code>
<code src="../../packages/ui/examples/image/delay.tsx" description="By setting `delay`, the delayed placeholder is enabled by default. When loading a large image, the placeholder will be loaded after a certain time.">Lazy loading placeholder</code>
<code src="../../packages/ui/examples/image/placeholder.tsx" description="By default, the loading effect is not displayed. You can display the default loading effect by setting `placeholder=true`. Supports custom placeholders.">Placeholder</code>
<code src="../../packages/ui/examples/image/footer.tsx" description="By setting `title` and `description`, the title and description of the image can be displayed at the bottom of the image.">Show Caption & Action</code>
<code src="../../packages/ui/examples/image/actions.tsx" description="By setting `actionsLayout`, you can adjust the order of the function buttons in the preview control bar, and you can filter the function buttons so that only buttons in `actionsLayout` will appear. Among them, `extra` represents the button in `actions`, and the `key` in `actions` also supports being sorted separately.">Custom preview control bar</code>
<code src="../../packages/ui/examples/image/preview.tsx" description="`Image.Preview` can be used alone, you need to configure `src` and control `visible`.">Use the preview component alone</code>
<code src="../../packages/ui/examples/image/popup-container.tsx" description="You can specify the parent node of the preview mount through `getPopupContainer`.">Mount node</code>
<code src="../../packages/ui/examples/image/process.tsx" description="Setting `lazy` can enable lazy loading, and the image will not be loaded until it appears in the viewport. The `lazy` attribute is implemented based on the `IntersectionObserver API`. Supports asynchronous observation of intersection changes between target elements and ancestor elements or top-level document viewports to determine loading timing.">Lazy loading of boundary configuration</code>
<code src="../../packages/ui/examples/image/error.tsx" description="If loading fails, the image failure placeholder is displayed. Supports setting `error` to customize the error placeholder.">Fault tolerant</code>



## API
### Image

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | `string`              | -        | The className of Image     |
| style     | `CSSProperties`       | -        | The style of Image 	    |
| url | `string` | - | Image url path. |
| title | `string` | - | Title |
| description | `string` | - | Description |
| placeholder | `boolean` `string` `React.ReactNode` | -- | Load placeholder, use default placeholder or false |
| preview | `boolean` | true | Whether to enable preview |
| motion | `boolean` | false | Whether to enable the animation of successful loading |
| actions | `React.ReactNode[]` | -- | Extra operations |
| error | `React.ReactNode` | -- | error placeholder |
| delay | number | -- | (ms) The placeholder will be rendered if the url is not loaded within the delay time range. |
| options | [Options](#options) | - | `IntersectionObserver` properties api. |
| onError | (event: Event) => void | - | Triggered when image loading fails. |
| onLoad | (event: Event) => void | - | Triggered when image loading success. |

Other attributes [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

### Lazy

Optional `Lazy Options` property reference [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| root | React.ReactElement | null | The [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) whose bounds are used as the bounding box when testing for intersection. If no root value was passed to the constructor or its value is null, the top-level document's viewport is used. |
| rootMargin | string | "0px 0px 0px 0px" | An offset rectangle applied to the root's [bounding box](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (px) or as a percentage (%). The default is "0px 0px 0px 0px". |
| thresholds | number | 0 | A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used. |

### Image.Preview

| **Parameters** | **Type** | **Default value** | **Definition** |
|---|---|---|---|
| className | `string`              | -        | The className of Image.Preview     |
| style     | `CSSProperties`       | -        | The style of Image.Preview 	    |
|closable|`boolean` |true|Whether to display a close button|
|defaultVisible|`boolean`|-|Visible by default, uncontrolled|
|escToExit|`boolean`|true|Press the `ESC` key to close the preview|
|maskClosable|`boolean`|true|Clicking on mask triggers shutdown|
|visible|`boolean`|-|Visible or not, controlled attribute|
|src|`string`|-|Image acquisition address, in `Image`, the default is `Image's src`|
|extra|`Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>`|-|Image attributes, transparently transmitted to the `img` tag in the preview pop-up window|
|actionsLayout|`string[]` |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|Control bar layout|
|scales|`number[]` |`[25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200, 250, 300, 400, 500, 750, 1000 ]`|The zoom percentage in the current array is used when previewing zoom. If it does not contain `100%`, it will be automatically added at the nearest position.|
|actions|[ImagePreviewActionProps](#ImagePreviewActionProps)[] |-|Extra operations, [ImagePreviewActionProps](#ImagePreviewActionProps)|
|getPopupContainer|() => HTMLElement |() => document.body|Pop-up layer mounted node|
|imageRender|(originalNode: ReactElement) => ReactNode |-|Rendering of custom `image` elements|
|onVisibleChange|(visible: boolean, preVisible: boolean) => void |-|Event triggered by switching visible state|

### ImagePreviewActionProps

Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.

| **Parameters** | **Type** | **Default value** | **Definition** |
|---|---|---|---|
| className | `string`              | -        | The className of ImagePreviewActionProps    |
| style     | `CSSProperties`       | -        | The style of ImagePreviewActionProps	    |
|disabled|`boolean` |-|Whether to disable|
|key|`string`|-|Uniquely identifies|
|name|`string`|-|Name|
|content|`ReactNode`|-|Content|
