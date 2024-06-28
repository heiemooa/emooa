---
nav: 组件
group:
    title: 反馈
    order: 3
toc: content
---

# Watermark 水印


## 何时使用
页面需要添加水印标识版权时使用。

## 代码演示

<code src="../../packages/ui/examples/watermark/basic.tsx">基本用法</code>
<code src="../../packages/ui/examples/watermark/contents.tsx" description="通过 `content` 设置 字符串数组 指定多行文字水印内容。">多行水印</code>
<code src="../../packages/ui/examples/watermark/image.tsx" description="通过 `image` 指定图片地址。为保证图片高清且不被拉伸，请设置 `width` 和 `height`, 并上传至少两倍的宽高的 `logo` 图片地址。">图片水印</code>

## API

### Watermark

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| className | `string`              | -        | 组件名称       |
| style     | `CSSProperties`       | -        | 组件样式	    |
| image | `string` | - | 水印图片源，优先级比文字内容高 |
|rotate|`number`|-20|单个水印旋转角度|
|content|`string` `string[]`| - |水印的文字内容|
|fontStyle|`{color?: string;fontFamily?: string;fontSize?: number \| string;fontWeight?: number \| string;}` |{color:'rgba(0, 0, 0, 0.12)', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 'normal' }|水印文字样式|
|gap|`[number, number]` |[100, 100]|水印间的间距|
|height|`number` \| `string` |-|单个水印的高度|
|offset|`[number, number]` |[`gaps[0] / 2`,`gaps[1] / 2`]|水印相对于 `container` 容器的偏移量。|
|width|`number` \| `string` |-|单个水印的宽度。`image` 时默认为 `100`，`content` 时默认为文本宽度|
|zIndex|`string` \| `number` |-|zIndex|
