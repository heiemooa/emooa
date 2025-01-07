---
nav: Components
group:
  title: Other
  order: 4
toc: content
demo:
  cols: 2
---

# App

## Usage

Providing static methods of `Modal.xxx` that can consume `React context` can simplify the problem that methods such as useModal need to manually implant `contextHolder`.

## Examples

<code src="../../packages/ui/examples/app/basic.tsx" description="Get modal base instance.">Basic usage</code>  
<code src="../../packages/ui/examples/app/context.tsx" description="The context properties passed to `App` can be obtained via `useContext(App.Context)`.">Context</code>

## API

### App

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| className | The className of App | `string` | - |
| style | The style of App | `CSSProperties` | - |
| component | `React` component string so that when `CSS` variables are enabled, there is a container to host the `CSS` class name | `ComponentType<P> \| string \| false` | div |
| values | `Provider Context` values | `{ [key: string]: any }` | - |

## How Usage

### Basic usage

The App component provides contextual method calls through Context, so useApp needs to be used as a subcomponent. We recommend wrapping App at the top level of the application.

The context properties passed to `App` can be obtained via `useContext(App.Context)`.

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

### Order with ConfigProvider

App components can only use Design Token under ConfigProvider. If you need to use its style reset capability, ConfigProvider and App components must appear in pairs.

```js
<ConfigProvider theme={{ ... }}>
  <App>
    ...
  </App>
</ConfigProvider>
```
