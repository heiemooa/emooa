# [Http](https://www.npmjs.com/package/@emooa/http) 网络请求

`@emooa/http` 是一个基于 [Axios](https://axios-http.com/) 二次封装的网络请求库，提供统一的错误弹窗处理，作用于浏览器中。它结合后端接口服务，针对返回体进行错误告警，支持自定义返回的状态码、国际化，以及提示内容等。

## 特性

- 基于 [Axios](https://axios-http.com/) 封装
- 从浏览器创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 支持拦截请求和响应
- 中英文语言
- 支持针对不同字段的返回结构体
- 支持自定义提示内容
- 支持针对不同状态码提示不同信息

## Installation

```bash
npm install @emooa/http
// or
yarn add @emooa/http
```

## Usage

简单例子:

```ts
// http.ts
import Http from '@emooa/http';

const axios = new Http();
const http = axios.create();

export default http;

// index.ts
import React from 'react';
import { Button, Space } from '@emooa/ui';
import http from './http';

const App: React.FC = () => {
  const fetchData = async () => {
    const data = await http.get('/api/ok');
    console.log(data);
  };
  const fetchData404 = async () => {
    const data = await http.get('/api/404');
    console.log(data);
  };

  return (
    <Space>
      <Button type="primary" onClick={fetchData} status="success">
        Load Success
      </Button>
      <Button type="primary" onClick={fetchData404} status="danger">
        Load 404
      </Button>
    </Space>
  );
};

export default App;
```

复杂的例子：

```ts
// http.ts
import { isEmpty } from 'lodash';
import Http from '@emooa/http';

const axios = new Http({
  mapping: {
    code: 'code',
    message: ['notice', 'message'],
    ok: 0,
  },
  modal: {
    style: { top: 140 },
    info: {
      401: {
        style: { top: 140 },
        content: (
          <div className="pb-10 pt-20">
            <span>
              您好，您当前帐户未登录，请点击下方 <span class="color-primary">重新登录</span> 按钮。
            </span>
          </div>
        ),
        onOk: () => {
          window.location.href = `/login`;
        },
        okText: '登录',
      },
    },
  },
});

const http = axios.create({
  baseURL: '/',
  headers: {
    'X-Client-Token': '******',
  },
});

http.interceptors.request.use(config => {
  config.headers!['TOKEN'] = '******';
  return config;
});

http.interceptors.response.use(response => {
  return response.data;
});

export default http;
```

更多例子见: [Examples.](https://docs.emooa.com/plugin/http)

## API

### Options

| **参数**     | **定义**       | **类型**                 | **默认值** |
| ------------ | -------------- | ------------------------ | ---------- |
| locale       | 国际化语言     | `zhCN \| en`             | zhCN       |
| colorPrimary | 主题色         | `CSSProperties['color']` | #1677ff    |
| mapping      | 返回体映射关系 | [Mapping](#mapping)      | -          |
| modal        | 返回体映射关系 | [Modal](#modal)          | -          |

#### Mapping

| **参数** | **定义**                                       | **类型**             | **默认值** |
| -------- | ---------------------------------------------- | -------------------- | ---------- |
| code     | 指定某个字段来代表接口返回的状态 Key           | `string`             | code       |
| ok       | 指定返回状态码                                 | `string \| number`   | 0          |
| message  | 指定某个字段返回提示消息，一般用于接口错误提示 | `string \| string[]` | -          |

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

## License

MIT Licensed  
Copyright (c) 2023 Emooa

<!-- ## FAQ -->
