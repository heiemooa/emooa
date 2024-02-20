---
nav: 组件
group: 通用
order: 0
toc: content
---

# Image 图片


## 何时使用
需要进行图片懒加载的时候。


## 代码演示

<code src="../../packages/ui/examples/image/basic.tsx">基本用法</code>
<code src="../../packages/ui/examples/image/delay.tsx" description="加载大图时超过一定时间将加载占位符。">延迟加载占位符</code>
<code src="../../packages/ui/examples/image/placeholder.tsx" description="使用自定义的占位符，不加载占位符。">占位符</code>
<code src="../../packages/ui/examples/image/process.tsx" description="异步观察目标元素与祖先元素或顶级文档视口的交集变化，判断加载时机。">懒加载边界配置</code>
<code src="../../packages/ui/examples/image/error.tsx" description="加载失败显示图像占位符。">容错处理</code>



## API

### Image

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| src | string (必填) | - | 图片地址 |
| placeholder | string ｜ boolean | <img src="data:image/svg+xml;base64,PHN2ZyB0PSIxNzA1MDI4NDQ4OTQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0MjUiIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4Ij48cGF0aCBkPSJNOTI4IDg5Nkg5NmMtNTMuMDIgMC05Ni00Mi45OC05Ni05NlYyMjRjMC01My4wMiA0Mi45OC05NiA5Ni05Nmg4MzJjNTMuMDIgMCA5NiA0Mi45OCA5NiA5NnY1NzZjMCA1My4wMi00Mi45OCA5Ni05NiA5NnpNMjI0IDI0MGMtNjEuODU2IDAtMTEyIDUwLjE0NC0xMTIgMTEyczUwLjE0NCAxMTIgMTEyIDExMiAxMTItNTAuMTQ0IDExMi0xMTItNTAuMTQ0LTExMi0xMTItMTEyek0xMjggNzY4aDc2OFY1NDRsLTE3NS4wMy0xNzUuMDNjLTkuMzcyLTkuMzcyLTI0LjU2OC05LjM3Mi0zMy45NDIgMEw0MTYgNjQwbC0xMTEuMDMtMTExLjAzYy05LjM3Mi05LjM3Mi0yNC41NjgtOS4zNzItMzMuOTQyIDBMMTI4IDY3MnY5NnoiIGZpbGw9IiNmOGY4ZjgiIHAtaWQ9IjQ0MjYiPjwvcGF0aD48L3N2Zz4="> | 加载占位符 |
| delay | number | 300 | (ms) 如果在延迟时间范围内 url 未加载，则将渲染占位符。 |
| options | [Options](#options) | - | `IntersectionObserver` 属性 API，异步观察目标元素与祖先元素或顶级文档视口的交集变化，判断加载时机。 |
| onError | (event: Event) => void | - | 图片加载失败时触发回调。 |
| onLoad | (event: Event) => void | - | 图片加载完成时触发回调。 |

其他更多属性见 [img.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes)

### Options

可选的 `Options` 属性参考 [IntersectionObserver.](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| root | React.ReactElement | null | [元素](https://developer.mozilla.org/en-US/docs/Web/API/Element) 或 [文档](https://developer.mozilla.org/en-US/docs/Web/API/Document)，其边界在测试相交时用作边界框。如果没有将根值传递给构造函数或其值为 null，则使用顶级文档的视口。 |
| rootMargin | string | "0px 0px 0px 0px" | 计算交叉点时应用于根的[边界框](https://developer.mozilla.org/en-US/docs/Glossary/Bounding_box)的偏移矩形，有效地缩小或增长根以进行计算。此属性返回的值可能与调用构造函数时指定的值不同，因为它可能会更改以匹配内部要求。每个偏移量可以用像素 (px) 或百分比 (%) 表示。默认值为“0px 0px 0px 0px”。 |
| thresholds | number | 0 | 阈值列表，按数字递增顺序排序，其中每个阈值是观察目标的交叉面积与边界框面积的比率。当超过某个目标的任何阈值时，就会生成该目标的通知。如果没有值传递给构造函数，则使用 0。 |

