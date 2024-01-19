---
nav: Components
group: General
order: 0
toc: content
---

# Image 

## Usage
When lazy loading of images is required.


## Examples

<code src="../../packages/ui/examples/image/basic.tsx">Basic</code>
<code src="../../packages/ui/examples/image/delay.tsx" description="When loading a large image, placeholders will be loaded after a certain time.">Lazy loading placeholder</code>
<code src="../../packages/ui/examples/image/placeholder.tsx" description="Use custom placeholders and do not load placeholders.">Placeholder</code>
<code src="../../packages/ui/examples/image/process.tsx" description="Asynchronously observe the intersection changes between the target element and the ancestor element or the top-level document viewport to determine the loading timing.">Lazy loading of boundary configuration</code>
<code src="../../packages/ui/examples/image/error.tsx" description="Load failed to display image placeholder.">Fault tolerant</code>



## API
### Image

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| url | string (Required) | - | Image url path. |
| placeholder | string ｜ boolean | <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzA1MDI4NDQ4OTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0MjUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNOTI4IDg5Nkg5NmMtNTMuMDIgMC05Ni00Mi45OC05Ni05NlYyMjRjMC01My4wMiA0Mi45OC05NiA5Ni05Nmg4MzJjNTMuMDIgMCA5NiA0Mi45OCA5NiA5NnY1NzZjMCA1My4wMi00Mi45OCA5Ni05NiA5NnpNMjI0IDI0MGMtNjEuODU2IDAtMTEyIDUwLjE0NC0xMTIgMTEyczUwLjE0NCAxMTIgMTEyIDExMiAxMTItNTAuMTQ0IDExMi0xMTItNTAuMTQ0LTExMi0xMTItMTEyek0xMjggNzY4aDc2OFY1NDRsLTE3NS4wMy0xNzUuMDNjLTkuMzcyLTkuMzcyLTI0LjU2OC05LjM3Mi0zMy45NDIgMEw0MTYgNjQwbC0xMTEuMDMtMTExLjAzYy05LjM3Mi05LjM3Mi0yNC41NjgtOS4zNzItMzMuOTQyIDBMMTI4IDY3MnY5NnoiIGZpbGw9IiNmOGY4ZjgiIHAtaWQ9IjQ0MjYiPjwvcGF0aD48L3N2Zz4="> | Load placeholder, use default placeholder or false |
| delay | number | 300 | (ms) The placeholder will be rendered if the url is not loaded within the delay time range. |
| options | [Options](#options) | - | `IntersectionObserver` properties api. |
| onError | (event: Event) => void | - | Triggered when image loading fails. |
| onLoad | (event: Event) => void | - | Triggered when image loading success. |

Other attributes [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

### Options

Optional `Options` property reference [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| root | React.ReactElement | null | The [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) whose bounds are used as the bounding box when testing for intersection. If no root value was passed to the constructor or its value is null, the top-level document's viewport is used. |
| rootMargin | string | "0px 0px 0px 0px" | An offset rectangle applied to the root's [bounding box](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (px) or as a percentage (%). The default is "0px 0px 0px 0px". |
| thresholds | number | 0 | A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used. |

