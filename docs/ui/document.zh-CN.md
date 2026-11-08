---
nav: 组件
group:
  title: 反馈
  order: 3
toc: content
---

# Document 文档

## 何时使用

提供一个微窗口加载产品文档。

- 支持多个路由规则的正则匹配。
- 单实例，以最先（首次）注册的实例为准。

## 代码演示

<code src="../../packages/ui/examples/document/basic.tsx" description="符合路由匹配规则的 `a` 标签自动命中，支持通过 `'aria-label': 'not-document'` 属性参数忽略文档规则。">基本用法</code>  
<code src="../../packages/ui/examples/document/content.tsx" description="点击不同触发项，在同一个可拖拽窗口中更新本地 React 内容。">本地内容</code>

## API

### Document

| 参数     | 定义                           | 类型        |
| -------- | ------------------------------ | ----------- |
| content  | 点击后在共享窗口展示的本地内容 | `ReactNode` |
| children | 文本按钮的触发内容             | `ReactNode` |
| title    | 本地文档标题                   | `ReactNode` |

### DocumentConfigProps

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| classNames | 组件名称 | `header?: string; content?: string; footer?: string; mask?: string; wrapper?: string;` | - |
| style | 组件样式 | `CSSProperties` | - |
| styles | 组件样式 | `header?: CSSProperties; content?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties;` | - |
| title | 标题 | `string \| ReactNode` | - |
| home | 文档中心地址 URL | `string` | - |
| patterns | 路由正则匹配 | `RegExp[]` | - |
| unmountOnExit | 是否在隐藏之后销毁 DOM 结构 | `boolean` | - |
| afterClose | 文档关闭之后的回调 | `() => void` | - |
| afterOpen | 文档打开之后的回调 | `() => void` | - |
| getPopupContainer | 指定弹出框挂载的父节点 | `() => Element` | () => document.body |

### Document.config 配置

`Document.config(Options)`

`Options` 用于配置链接匹配模式，参数见 [DocumentConfigProps](#documentconfigprops)。`content` 和 `children` 用于组件触发模式，不传给 `Document.config`。

链接文档注册：

建议使用 `Document.config` 注册方式，更为直接，可在根文件进行定义。

```
import { Document } from '@emooa/ui';

Document.config({
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/],
});
const App: React.FC = () => {
  return (
    <a href="https://docs.emooa.com/ui/document" target="_blank">
      Document 文档
    </a>
  );
};

export default App;
```
