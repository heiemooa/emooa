# [Http](https://www.npmjs.com/package/@emooa/http) Network Request

`@emooa/http` is a network request library based on secondary encapsulation of [Axios](https://axios-http.com/), which provides unified error pop-up window processing and works in browsers. It combines back-end interface services to provide error alerts for the return body, and supports customized return status codes, internationalization, and prompt content.

## Characteristic

- Based on [Axios](https://axios-http.com/) package
- Create from browser [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- Support [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Supports interception of requests and responses
- Chinese and English language
- Support return structures for different fields
- Support custom prompt content
- Support prompting different information for different status codes

## Installation

```bash
npm install @emooa/http
// or
yarn add @emooa/http
```

## Usage

Simple Example:

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

Complex Example:

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
              Hello, your current account is not logged in, please click the{' '}
              <span class="color-primary">Log in again</span> button below.
            </span>
          </div>
        ),
        onOk: () => {
          window.location.href = `/login`;
        },
        okText: 'Login',
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

More: [Examples.](https://docs.emooa.com/plugin/http)

## API

### Constructor Options

| **Parameters** | **Definition**                   | **Type**                 | **Default value** |
| -------------- | -------------------------------- | ------------------------ | ----------------- |
| locale         | International language           | `zhCN \| en`             | zhCN              |
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

Extend [Emool UI ModalProps](https://docs.emooa.com/ui/modal#modal)

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

## License

MIT Licensed  
Copyright (c) 2023 Emooa

<!-- ## FAQ -->
