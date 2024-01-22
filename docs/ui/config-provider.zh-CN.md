---
nav: 组件
group: 
    title: 其他
    order: 1
order: 0
toc: content
---

# ConfigProvider 全局配置


## 何时使用

使用 React 的 [context](https://legacy.reactjs.org/docs/context.html) 特性，在应用的最外层进行配置，一次设置，全局生效。   
- 设置国际化语言。
- 全局设置各组件默认配置。

```js
import React from 'react';
import { ConfigProvider } from '@emooa/ui';
import en from '@emooa/ui/esm/_locale/en-US';

const App: React.FC = () => (
  <ConfigProvider locale={en}>
    <XXXApp />
  </ConfigProvider>
);

export default App;
```


## 代码演示

<code src="../../packages/ui/examples/config-provider/basic.tsx" description="全局设置各组件默认配置，如 `size` 大小。">基本用法</code>
<code src="../../packages/ui/examples/config-provider/language.tsx" description="设置国际化语言。">国际化</code>


## API

### ConfigProvider

| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| prefixCls       | `string`                                     | `eui`    | 全局组件类名前缀		                         |
| size            | `mini`｜`small`｜`medium`｜`large`            | `medium` | 配置组件的默认尺寸，只会对支持size属性的组件生效。|
| locale          | [Locale](#locale)                            | -        | 设置语言包		                              |
| components | [Components](#components)                         | -        | 用于全局配置所有组件的默认参数		              |
| theme           | [Theme](#theme)                              | -        | 主题配置	                		              |


### Locale
```ts
export interface Locale {
  locale: string;
  dayjsLocale?: string;
}
```

### Components
```ts
export type Components = {
  Icon?: IconProps;
  Image?: ImageProps;
  Space?: SpaceProps;
  GeoJSON?: GeoJSONProps;
};
```

### Theme
```ts
// 未完待续
```