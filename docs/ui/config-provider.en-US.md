---
nav: Components
group: 
    title: Other
    order: 2
order: 0
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

<code src="../../packages/ui/examples/config-provider/language.tsx" description="Set the internationalized languages.">Languages</code>
<code src="../../packages/ui/examples/config-provider/basic.tsx" description="Set the default configuration of each component globally.">Basic</code>
<code src="../../packages/ui/examples/config-provider/rtl.tsx" description="Set the component to a view that reads from right to left.">RTL View</code>


## API

### ConfigProvider

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| prefixCls       | `string`                                     | `eui`    | Global ClassName prefix.			              |
| size            | `mini`｜`small`｜`medium`｜`large`            | `medium` | Configure the default size of the component, which will only take effect for components that support the `size` property.	|
| locale          | [Locale](#locale)                            | -        | Language package setting.			              |
| components | [Components](#components)                         | -        | Default parameters for global configuration of all components.|
| theme           | [Theme](#theme)                              | -        | Theme Configuration.	                      |


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

### Theme
```ts
// TODO
```