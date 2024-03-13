---
nav: 组件
group: 
    title: 其他
    order: 2
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

<code src="../../packages/ui/examples/config-provider/language.tsx" description="设置国际化语言。">国际化</code>
<code src="../../packages/ui/examples/config-provider/basic.tsx" description="全局设置各组件默认配置，如 `size` 大小。">基本用法</code>
<code src="../../packages/ui/examples/config-provider/rtl.tsx" description="设置组件为从右向左阅读的视图。">RTL视图</code>

### 获取 Eui Token

如果你希望使用当前主题下的 Design Token，我们提供了 useToken 这个 hook 来获取 Design Token。

```js
import React from 'react';
import { ConfigProvider, Theme } from '@emooa/ui';

const { useToken } = Theme;

const App = () => {
  const { token } = useToken();
  return null;
};

const Demo: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#123456',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </>
  );
};

export default Demo;

```

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

## 主题变量 Theme

## Token
| **参数** | **类型** | **默认值** | **定义** |
| --- | --- | --- | --- |
| paddingXXS    | `number` | 4        | 控制元素的最小内间距，对应 size 为 `mini`。   |
| paddingXS     | `number` | 8        | 控制元素的小内间距，对应 size 为 `small`。    |
| padding       | `number` | 16       | 控制元素的内间距，对应 size 为 `medium` 。    |
| paddingLG     | `number` | 24       | 控制元素的大内间距，对应 size 为   `large`。  |
