# [Logger](https://www.npmjs.com/package/@emooa/logger) 日志

`@emooa/logger` 是一个与 Nodejs 一起使用的简单记录器，通过 TS 开发，设计为支持多种传输的简单日志库。

## Installation

```bash
npm install @emooa/logger
// or
yarn add @emooa/logger
```

## Usage

`@emooa/logger` 支持 import 导入和 require 导入两种模式。

#### CommonJS

```
const Logger = require("@emooa/logger");
```

#### ESM

```
import Logger from "@emooa/logger";
```

简单例子:

```ts
const Logger = require("@emooa/logger");

const logger = new Logger({
  category: "My Project",
});

logger.log("The color is grey!");
logger.info("The color is green!");
logger.warn("The color is yellow!");
logger.error("The color is red!");
logger.debug("The color is cyan!");
```

将使用彩色布局输出日志信息。

```
[2023-12-17 12:56:25] [LOG] My Project - The color is grey!
[2023-12-17 12:56:25] [INFO] My Project - The color is green!
[2023-12-17 12:56:25] [WARN] My Project - The color is yellow!
[2023-12-17 12:56:25] [ERROR] My Project - The color is red!
[2023-12-17 12:56:25] [DEBUG] My Project - The color is cyan!
```

Appender 例子:

- 目前支持4种 Appender 附加器类型，分别是 `stdout`, `console`, `stderr`, 和 `file`.

- 当 Appender 附加器类型为[File](#file)时，支持文件自定义配置日志格式。

- 支持 3 种布局类型，即 `message`、`basic` 和 `pattern`。默认为`basic`，输出格式为`%[[%d] [%p]%] %m`。

- 当布局类型为正则时，它允许您定义任何您想要的任何格式。

```ts
const Logger = require("@emooa/logger");

const logger = new Logger({
  category: "My Project",
  appenders: [
    {
      type: "stdout", // "console" | "stderr" | "stdout" | "file"
      colour: true,
      layout: {
        type: "pattern", // message, basic, pattern,
        pattern: "%[[%d] [%p]%] %m",
      },
    },
    {
      type: "file",
      colour: false,
      file: {
        filename: "log/emooa-logger.log",
        options: {
          keepFileExt: true,
        },
      },
      layout: {
        type: "basic",
      },
    },
  ],
});

logger.log("The color is grey!");
logger.info("The color is green!");
logger.warn("The color is yellow!");
logger.error("The color is red!");
logger.debug("The color is cyan!");
```

更多例子见: [Examples.](https://github.com/heiemooa/emooa/tree/main/packages/logger/examples)

## API

### Appender

| **参数** | **类型** | **默认值** | **定义**  |
| --- | --- | --- | --- |
| type     | `console`｜`stderr`｜`stdout`｜`file` (必填)  | null                          | 日志输出类型。                                 |
| colour   | boolean                             | true                                  |  是否输出彩色日志。                             |
| layout   | [Layout](#layout) (必填)             | { type: 'basic' }                     | appemder布局，支持多种日志输出格式。             |
| file     | [File](#file) (当 type=file 时必填)   | { filename: 'logs/emooa-logger.log' } | 文件附加器，具有基于文件大小或日期的可配置日志滚动。 |

### Layout

Appender 布局，支持多种日志输出格式。

| **参数** | **类型** | **默认值** | **定义**  |
| --- | --- | --- | --- |
| type     | `basic`｜`message`｜ `pattern` (必填)     | `basic`           | `basic` [time] [logLevel] category - message <br> `message` 简单消息 <br> `pattern` 一种特殊类型，允许您定义所需的任何格式。 |
| pattern  | string (当附加器 type 为 `pattern` 时必填) | `%[[%d] [%p]%] %m` | 一种特殊类型，允许您定义任何您想要的格式。 |

### File

文件附加器，具有基于文件大小或日期的可配置日志滚动，[阅读更多](https://www.npmjs.com/package/streamroller)

- filename <string> - 默认为logs/emooa-logger.log。
- maxSize <integer> - 默认为 0 - 触发翻转的大小（以字节为单位）。如果未指定或为 0，则不会发生日志滚动。
- options
  - encoding <string> - 默认为“utf8”。
  - mode <integer> - 默认为 0o600（请参阅 node.js 文件模式）。
  - flags <string> -默认为 'a'（请参阅​​node.js 文件标志）。
  - compress <boolean> - 默认为 false - 使用 gzip 压缩备份文件（备份文件将具有 .gz 扩展名）。
  - keepFileExt <boolean> - 默认为 false - 旋转日志文件时保留文件扩展名（file.log 变为 file.1.log 而不是 file.log.1）。
  - fileNameSep <string> - 滚动时的文件名分隔符。例如：abc.log.1 或 abc.1.log (keepFileExt)。


## License

MIT Licensed  
Copyright (c) 2023 Emooa

<!-- ## FAQ -->
