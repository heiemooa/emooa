---
nav: Components
group:
  title: Other
  order: 4
toc: content
---

# ConfigProvider

## Usage

Use React's [context](https://legacy.reactjs.org/docs/context.html) feature to configure it at the outermost layer of the application. Once set, it will take effect globally.

- Set international language.
- Globally set the default configuration of each component.

```js
import React from 'react';
import { ConfigProvider } from '@emooa/ui';

const App: React.FC = () => (
  <ConfigProvider locale="en">
    <XXXApp />
  </ConfigProvider>
);

export default App;
```

## Examples

<code src="../../packages/ui/examples/config-provider/basic.tsx" description="Set the default configuration of each component globally.">Basic</code>  
<code src="../../packages/ui/examples/config-provider/language.tsx" description="Set the internationalized languages.">Languages</code>  
<code src="../../packages/ui/examples/config-provider/rtl.tsx" description="Set the component to a view that reads from right to left.">RTL View</code> <code src="../../packages/ui/examples/config-provider/scheme.tsx" description="The component switches with the system theme by default, and the theme can be controlled through the `scheme` attribute.">Scheme</code>

### Get Eui Token

If you want to use the Theme Token under the current theme, we provide 2 ways to obtain it.

```js
import React from 'react';
import { ConfigProvider, Theme } from '@emooa/ui';

const { useToken, getToken } = Theme;
const theme = {
  token: {
    colorPrimary: '#123456',
  },
};

// Method one, obtain through static method
const token = getToken(theme);

// Method two, through component hook method
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

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| prefixCls Global ClassName prefix. |  | `string` | `eui` |
| size | Configure the default size of the component, which will only take effect for components that support the `size` property. | `mini \| small \| medium \| large` | `medium` |
| locale | Language package setting. | [Locale](#locale) | - |
| components | Default parameters for global configuration of all components. | [Components](#components) | - |
| theme | Theme Configuration. | [Theme](#theme) | - |

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

## Theme

// TODO
