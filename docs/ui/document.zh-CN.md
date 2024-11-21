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

## API

### Document

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

`Options` 的具体参数如下所示与 [Document](#document) 一致。

- 方式一：推荐用法

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

- 方式二：组件注入

  支持组件注入，可在根文件进行定义。

```
import { Document } from '@emooa/ui';

// 其他 Component
const Component: React.FC = () => {
  return (
    <a href="https://docs.emooa.com/ui/document" target="_blank">
      Document 文档
    </a>
  );
};

// App.js
const App: React.FC = () => {
  return (
    <>
      <Document patterns={[/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/]} />
      ...
    </>
  );
};

```
