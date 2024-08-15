---
nav: 插件
group: 库
toc: content
demo:
  cols: 2
---

# [Http](https://www.npmjs.com/package/@emooa/http) 网络请求

## 何时使用

`@emooa/http` 是一个基于 [Axios](https://axios-http.com/) 二次封装的网络请求库，提供统一的错误弹窗处理，作用于浏览器中。它结合后端接口服务，针对返回体进行错误告警，支持自定义返回的状态码、国际化，以及提示内容等。

- 基于 [Axios](https://axios-http.com/) 封装
- 从浏览器创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 支持拦截请求和响应
- 中英文语言
- 支持针对不同字段的返回结构体
- 支持自定义提示内容
- 支持针对不同状态码提示不同信息

默认的返回结构体

```json
{
  "code": 0,
  "message": "success",
  ...
}
```

## 代码演示

<code src="../../packages/http/examples/basic/index.tsx" description="最基本的用法。">基本用法</code>  
<code src="../../packages/http/examples/color/index.tsx" description="通过 `colorPrimary` 修改配置错误提示的默认主题色。">主题色</code>  
<code src="../../packages/http/examples/locale/index.tsx" description="通过 `locale` 修改默认语言。">国际化</code>  
<code src="../../packages/http/examples/info/index.tsx" description="针对不同状态码自定义提示，通过设置`content`自定义提示内容。">自定义提示</code>  
<code src="../../packages/http/examples/code/index.tsx" description="定制其他的返回状态码的映射关系，如 `code: 'status'` 代表 `status`字段是状态码, `ok: 200` 代表 `200` 为接口成功的状态。">自定义返回码</code>  
<code src="../../packages/http/examples/interceptors/index.tsx" description="支持拦截器配置。">拦截器</code>

## API

### 实例参数 Options

| **参数**     | **定义**       | **类型**                 | **默认值** |
| ------------ | -------------- | ------------------------ | ---------- |
| locale       | 国际化语言     | `zhCN \| en`             | zhCN       |
| colorPrimary | 主题色         | `CSSProperties['color']` | #1677ff    |
| mapping      | 返回体映射关系 | [Mapping](#mapping)      | -          |
| modal        | 弹窗风格       | [Modal](#modal)          | -          |

#### Mapping

| **参数** | **定义**                                         | **类型**             | **默认值** |
| -------- | ------------------------------------------------ | -------------------- | ---------- |
| code     | 指定某个字段来代表接口返回的状态 Key             | `string`             | code       |
| ok       | 指定返回状态码                                   | `string \| number`   | 0          |
| message  | 指定某个字段来返回提示消息，一般用于接口错误提示 | `string \| string[]` | -          |

#### Modal

继承 [Emool UI ModalProps](/ui/modal#modal)

```ts
type Modal = ModalProps & {
  /**
   * 自定义提示内容
   */
  content?: React.ReactNode;
  /**
   * 非错误弹窗，属于通知类的弹窗样式，401 可能需要单独提示
   */
  info?: {
    [key: number | string]: ModalProps & { content?: React.ReactNode };
  };
};
```
