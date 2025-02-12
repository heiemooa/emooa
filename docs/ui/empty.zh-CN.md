---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Empty 标签

## 何时使用

当目前没有数据时的渲染提示。

## 代码演示

<code src="../../packages/ui/examples/empty/basic.tsx" description="最简单的展示。">基本用法</code>  
<code src="../../packages/ui/examples/empty/icon.tsx" description="可以通过 `icon` 参数传入自定义图标，`description` 修改显示文案。">自定义图标和文案</code>  
<code src="../../packages/ui/examples/empty/image.tsx" description="通过配置图片地址 `Url` 修改图标。">图标 Url</code>  
<code src="../../packages/ui/examples/empty/description.tsx" description="无描述信息。">无描述</code>

## API

### Empty

| **参数**    | **定义**       | **类型**                 | **默认值** |
| ----------- | -------------- | ------------------------ | ---------- |
| className   | 组件名称       | `string`                 | -          |
| style       | 组件样式       | `CSSProperties`          | -          |
| description | 显示文案       | `ReactNode`              | -          |
| icon        | 自定义显示图案 | `ReactElement \| string` | -          |
