---
nav: 组件
group:
  title: 其他
  order: 3
toc: content
demo:
  cols: 2
---

# App 包裹

## 何时使用

提供可消费 `React context` 的 `Modal.xxx` 的静态方法，可以简化 useModal 等方法需要手动植入 `contextHolder` 的问题。

## 代码演示

<code src="../../packages/ui/examples/app/basic.tsx" description="获取 modal 基本实例">基本用法</code>  
<code src="../../packages/ui/examples/app/context.tsx" description="通过 `useContext(App.Context)` 可获取传递给 `App` 的上下文属性。">获取上下文</code>

## API

### App

| **参数** | **定义** | **类型** | **默认值** |
| --- | --- | --- | --- |
| className | 组件名称 | `string` | - |
| style | 组件样式 | `CSSProperties` | - |
| component | `React` 组件字符串，以便在启用 `CSS` 变量时，有一个容器来承载 `CSS` 类名。 | `ComponentType<P> \| string \| false` | div |
| values | `Provider Context` 属性 | `{ [key: string]: any }` | - |

## 如何使用

### 基础用法

App 组件通过 Context 提供上下文方法调用，因而 useApp 需要作为子组件才能使用，我们推荐在应用中顶层包裹 App。

通过 `useContext(App.Context)` 可获取传递给 `App` 的上下文属性。

```ts
import React from 'react';
import { App, Button, Space } from '@emooa/ui';

const MyPage: React.FC = () => {
  const { modal } = App.useApp();

  const showModal = () => {
    modal.info({
      title: 'This is a message',
      content: `Some modal messages...`,
    });
  };

  return (
    <Button type="primary" onClick={showModal}>
      Hooks modal
    </Button>
  );
};

export default () => (
  <App>
    <MyPage />
  </App>
);
```

### 与 ConfigProvider 先后顺序

App 组件只能在 ConfigProvider 之下才能使用 Design Token， 如果需要使用其样式重置能力，则 ConfigProvider 与 App 组件必须成对出现。

```js
<ConfigProvider theme={{ ... }}>
  <App>
    ...
  </App>
</ConfigProvider>
```
