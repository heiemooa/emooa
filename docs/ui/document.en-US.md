---
nav: Components
group:
  title: Feedback
  order: 3
toc: content
---

# Document

## Usage

Provide a micro window to load product documentation information.

- Supports regular matching of multiple routing rules.
- Single instance, whichever is the first (first) registered instance.

## Examples

<code src="../../packages/ui/examples/document/basic.tsx" description="The `a` label that meets the routing matching rules is automatically hit, and supports ignoring document rules through the `'aria-label': 'not-document'` attribute parameter.">Basic usage</code>

## API

### Document

| **Parameters** | **Type** | **Default value** | **Definition** |
| --- | --- | --- | --- |
| className | The className of Modal | `string` | - |
| classNames | Config Modal build-in module's className | `header?: string; content?: string; footer?: string; mask?: string; wrapper?: string;` | - |
| style | The style of Modal | `CSSProperties` | - |
| styles | Config Modal build-in module's style | `header?: CSSProperties; content?: CSSProperties; footer?: CSSProperties; mask?: CSSProperties; wrapper?: CSSProperties;` | - |
| title | title | `string \| ReactNode` | - |
| home | Document center address URL | `string` | - |
| patterns | Routing regular matching | `RegExp[]` | - |
| unmountOnExit | Whether to destroy the DOM structure after hiding | `boolean` | - |
| afterClose | Callback after document close | `() => void` | - |
| afterOpen | Callback after document is opened | `() => void` | - |
| getPopupContainer | Specify the parent node where the pop-up box is mounted | `() => Element` | () => document.body |

### Document.config

`Document.config(Options)`

The specific parameters of `Options` are as follows and are consistent with [Document](#document).

- Method 1: Recommended usage

  It is recommended to use the `Document.config` registration method, which is more direct and can be defined in the root file.

```
import { Document } from '@emooa/ui';

Document.config({
  patterns: [/^https?:\/\/docs\.emooa\.com(?:\/.*)?$/],
});
const App: React.FC = () => {
  return (
    <a href="https://docs.emooa.com/ui/document" target="_blank">
      Document
    </a>
  );
};

export default App;
```

- Method 2: Component injection

  Supports component injection and can be defined in the root file.

```
import { Document } from '@emooa/ui';

// 其他 Component
const Component: React.FC = () => {
  return (
    <a href="https://docs.emooa.com/ui/document" target="_blank">
      Document
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
