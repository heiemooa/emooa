
## Usage

Simple example

```tsx
import { Image } from "@emooa/ui";

export default () => (
  <>
    <Image url="https://api.emooa.com/aimg" />
  </>
);
```

No placeholder

```tsx
import { Image } from "@emooa/ui";

export default () => (
  <>
    <Image url="https://api.emooa.com/aimg" placeholder={false} />
  </>
);
```

Delay placeholder

- Load when 100px from the top of the image.
- delay 300ms load placeholder.

```tsx
import { Image } from "@emooa/ui";

export default () => (
  <>
    <Image
      url="https://api.emooa.com/aimg"
      delay={300}
      options={{ rootMargin: "100px 0px 0px 0px" }}
    />
  </>
);
```



## Image

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| url | string (Required) | - | Image url path. |
| placeholder | string ｜ boolean | <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzA1MDI4NDQ4OTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0MjUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNOTI4IDg5Nkg5NmMtNTMuMDIgMC05Ni00Mi45OC05Ni05NlYyMjRjMC01My4wMiA0Mi45OC05NiA5Ni05Nmg4MzJjNTMuMDIgMCA5NiA0Mi45OCA5NiA5NnY1NzZjMCA1My4wMi00Mi45OCA5Ni05NiA5NnpNMjI0IDI0MGMtNjEuODU2IDAtMTEyIDUwLjE0NC0xMTIgMTEyczUwLjE0NCAxMTIgMTEyIDExMiAxMTItNTAuMTQ0IDExMi0xMTItNTAuMTQ0LTExMi0xMTItMTEyek0xMjggNzY4aDc2OFY1NDRsLTE3NS4wMy0xNzUuMDNjLTkuMzcyLTkuMzcyLTI0LjU2OC05LjM3Mi0zMy45NDIgMEw0MTYgNjQwbC0xMTEuMDMtMTExLjAzYy05LjM3Mi05LjM3Mi0yNC41NjgtOS4zNzItMzMuOTQyIDBMMTI4IDY3MnY5NnoiIGZpbGw9IiNmOGY4ZjgiIHAtaWQ9IjQ0MjYiPjwvcGF0aD48L3N2Zz4="> | Load placeholder, use default placeholder or false |
| delay | number | 300 | (ms) The placeholder will be rendered if the url is not loaded within the delay time range. |
| options | [Options](#Options) | - | `IntersectionObserver` properties api. |
| onError | (event: Event) => void | - | Triggered when image loading fails. |
| onLoad | (event: Event) => void | - | Triggered when image loading success. |

其他更多属性见 [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

## Options

Optional `Options` property reference [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| root | React.ReactElement | null | The [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) whose bounds are used as the bounding box when testing for intersection. If no root value was passed to the constructor or its value is null, the top-level document's viewport is used. |
| rootMargin | string | "0px 0px 0px 0px" | An offset rectangle applied to the root's [bounding box](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box) when calculating intersections, effectively shrinking or growing the root for calculation purposes. The value returned by this property may not be the same as the one specified when calling the constructor as it may be changed to match internal requirements. Each offset can be expressed in pixels (px) or as a percentage (%). The default is "0px 0px 0px 0px". |
| thresholds | number | 0 | A list of thresholds, sorted in increasing numeric order, where each threshold is a ratio of intersection area to bounding box area of an observed target. Notifications for a target are generated when any of the thresholds are crossed for that target. If no value was passed to the constructor, 0 is used. |

