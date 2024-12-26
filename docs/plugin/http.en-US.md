---
nav: Plugin
group: Library
toc: content
demo:
  cols: 2
---

# [Http](https://www.npmjs.com/package/@emooa/http)

## Usage

`@emooa/http` is a network request library based on secondary encapsulation of [Axios](https://axios-http.com/), which provides unified error pop-up window processing and works in browsers. It combines back-end interface services to provide error alerts for the return body, and supports customized return status codes, internationalization, and prompt content.

- Based on [Axios](https://axios-http.com/) package
- Create from browser [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- Support [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Supports interception of requests and responses
- Chinese and English language
- Support return structures for different fields
- Support custom prompt content
- Support prompting different information for different status codes

Default return structure

```json
{
  "code": 0,
  "message": "success"
}
```

## Examples

<code src="../../packages/http/examples/basic/index.tsx" description="The most basic usage.">Basic</code>  
<code src="../../packages/http/examples/color/index.tsx" description="Use `colorPrimary` to modify the default theme color of the configuration error prompt.">Theme Color</code>  
<code src="../../packages/http/examples/locale/index.tsx" description="Modify the default language through `locale`.">Language</code>  
<code src="../../packages/http/examples/info/index.tsx" description="Customize prompts for different status codes by setting `content` to customize the prompt content.">Custom prompts</code>  
<code src="../../packages/http/examples/code/index.tsx" description="Customize the mapping relationship of other return status codes. For example, `code: 'status'` means that the `status` field is the status code, and `ok: 200` means that `200` is the status of the interface success.">Custom return code</code>  
<code src="../../packages/http/examples/interceptors/index.tsx" description="Support interceptor configuration.">Interceptors</code>

## API

### Constructor Options

| **Parameters** | **Definition**                   | **Type**                 | **Default value** |
| -------------- | -------------------------------- | ------------------------ | ----------------- |
| locale         | International language           | `zhCN \| en`             | zhCN              |
| scheme         | Scheme                           | `light \| dark`          | -                 |
| colorPrimary   | Theme color                      | `CSSProperties['color']` | #1677ff           |
| mapping        | Return body mapping relationship | [Mapping](#mapping)      | -                 |
| modal          | Modal style                      | [Modal](#modal)          | -                 |

#### Mapping

| **Parameters** | **Definition** | **Type** | **Default value** |
| --- | --- | --- | --- |
| code | Specify a field to represent the status returned by the interface KEY | `string` | code |
| ok | Specify return status code | `string \| number` | 0 |
| message | Specify a field to return a prompt message, generally used for interface error prompts | `string \| string[]` | - |

#### Modal

Extend [Emool UI ModalProps](/ui/modal#modal)

```ts
type Modal = ModalProps & {
  /**
   * Customize prompt content
   */
  content?: React.ReactNode;
  /**
   * Non-error pop-up window, a notification-type pop-up window style, 401 may require a separate prompt
   */
  info?: {
    [key: number | string]: ModalProps & { content?: React.ReactNode };
  };
};
```
