---
nav: 组件
group:
  title: 其他
  order: 4
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
<code src="../../packages/ui/examples/config-provider/rtl.tsx" description="设置组件为从右向左阅读的视图。">RTL 视图</code>  
<code src="../../packages/ui/examples/config-provider/scheme.tsx" description="组件默认跟随系统主题切换，可通过 `scheme` 属性控制主题。">主题</code>

### 获取 Eui Token

如果你希望使用当前主题下的 Theme Token，我们提供 2 种方式获取。

```js
import React from 'react';
import { ConfigProvider, Theme } from '@emooa/ui';

const { useToken, getToken } = Theme;
const theme = {
  token: {
    colorPrimary: '#123456',
  },
};

// 方式一，通过静态方法获取
const token = getToken(theme);

// 方式二，通过组件 hook 方式
const App = () => {
  const { token } = useToken();
  return null;
};

const Demo: React.FC = () => {
  return (
    <>
      <ConfigProvider theme={theme}>
        <App />
      </ConfigProvider>
    </>
  );
};

export default Demo;
```

## API

### ConfigProvider

| **参数**   | **定义**                                             | **类型**                           | **默认值** |
| ---------- | ---------------------------------------------------- | ---------------------------------- | ---------- |
| prefixCls  | 全局组件类名前缀                                     | `string`                           | `eui`      |
| size       | 配置组件的默认尺寸，只会对支持 size 属性的组件生效。 | `mini \| small \| medium \| large` | `medium`   |
| locale     | 设置语言包                                           | [Locale](#locale)                  | -          |
| components | 用于全局配置所有组件的默认参数                       | [Components](#components)          | -          |
| theme      | 主题配置                                             | [Theme](#theme)                    | -          |

### Locale

```ts
export interface Locale {
  locale: string;
}
```

### Components

```ts
export type Components = {
  Button?: ButtonProps;
  Divider?: DividerProps;
  Icon?: IconProps;
  Image?: ImageProps;
  Space?: SpaceProps;
  GeoJSON?: GeoJSONProps;
};
```

## 主题变量 Theme

// TODO
