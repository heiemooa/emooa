---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
demo:
  cols: 2
---

# Copy 剪切板

## 何时使用

用于快速复制文本内容到剪切板

## 代码演示

<code src="../../packages/ui/examples/copy/basic.tsx" description="通过 `hover` 属性控制 `icon` 图标。">基本用法</code>  
<code src="../../packages/ui/examples/copy/loading.tsx" description="通过 `text` 属性自定义剪切板文本。">自定义图标</code>  
<code src="../../packages/ui/examples/copy/icon.tsx" description="通过 `icon` 属性自定义复制图标。">自定义图标</code>

## API

### Message

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| text | 自定义复制文本 | `string \| (() => string \| Promise<string>)` | - |
| hover | 是否鼠标悬浮时才展示图标 | `boolean` | - |
| icon | 自定义图标：[默认图标, 拷贝成功后的图标] | `[React.ReactNode, React.ReactNode?]` | - |
| onCopy | 复制完成的回调 | `(text: string, e: React.ClipboardEventHandler<HTMLDivElement>) => void` | - |
