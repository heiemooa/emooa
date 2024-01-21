---
nav: 组件
group: 
    title: 其他
    order: 2
order: 0
toc: content
---

# ConfigProvider


## 何时使用

使用 React 的 [context](https://legacy.reactjs.org/docs/context.html) 特性，在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。

```bash
import React from 'react';
import { ConfigProvider } from '@emooa/ui';
import en from '@emooa/ui/esm/_locale/en-US';

const App: React.FC = () => (
  <ConfigProvider locale={en}>
    <Root />
  </ConfigProvider>
);

export default App;
```


## 代码演示

<code src="../../packages/ui/examples/config-provider/basic.tsx">基本用法</code>
