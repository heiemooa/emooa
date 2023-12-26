# `@emooa/logger`

`@emooa/logger` is a simple logger for use with Nodejs, developed through TS and designed as a simple logging library that supports multiple transports.

## Installation

```
npm install @emooa/logger
// or
yarn add @emooa/logger
```

## Usage

`@emooa/logger` supports both import import and require import modes.

#### CommonJS

```
const Logger = require("@emooa/logger");
```

#### ESM

```
import Logger from "@emooa/logger";
```

Simple example:

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

This will then output to stdout with the coloured layout

```
[2023-12-17 12:56:25] [LOG] My Project - The color is grey!
[2023-12-17 12:56:25] [INFO] My Project - The color is green!
[2023-12-17 12:56:25] [WARN] My Project - The color is yellow!
[2023-12-17 12:56:25] [ERROR] My Project - The color is red!
[2023-12-17 12:56:25] [DEBUG] My Project - The color is cyan!
```

Appender example:

- Currently, 4 appender types are supported, namely `stdout`, `console`, `stderr`, and `file`.

- When the appender type is a [File](#File), the file custom configuration log format is supported.

- 3 layout types are supported, namely `message`, `basic` and `pattern`. The default is `basic`, and the output format is `%[[%d] [%p]%] %m`.

- When the layout type is pattern, it allows you to define any format you want.

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

More examples: [Examples.](https://github.com/heiemooa/emooa/tree/main/packages/logger/examples)

## API

### Appender

| **参数** | **类型**                                         | **默认值**                            | **定义**                                                                 |
| -------- | ------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------ |
| type     | `console`｜`stderr`｜`stdout`｜`file` (Required) | null                                  | coloured console logging to stdout or stderr.                            |
| colour   | boolean (Optional)                               | true                                  | Whether to output colored logs.                                          |
| layout   | [Layout](#Layout) (Required)                     | { type: 'basic' }                     | The appemder layout, supports multiple log output formats.               |
| file     | [File](#File) (Required when the type is file)   | { filename: 'logs/emooa-logger.log' } | file appender, with configurable log rolling based on file size or date. |

### Layout

The appender layout, supports multiple log output formats

| **参数** | **类型**                                           | **默认值**         | **定义**                                                                                                                                                    |
| -------- | -------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | `basic`｜`message`｜ `pattern` (Required)          | `basic`            | `basic`[time] [logLevel] category - message <br> `message` simple message <br> `pattern` A special type that allows you to define any format you want. <br> |
| pattern  | string (Required when the output style is pattern) | `%[[%d] [%p]%] %m` | A special type that allows you to define any format you want.                                                                                               |

### File

file appender, with configurable log rolling based on file size or date, [Read More.](https://www.npmjs.com/package/streamroller)

- filename <string> - defaults to logs/emooa-logger.log.
- maxSize <integer> - defaults to 0 - the size in bytes to trigger a rollover. If not specified or 0, then no log rolling will happen.
- numBackups <integer> - defaults to 1 - the number of old files to keep (excluding the hot file).
- options
  - encoding <string> - defaults to 'utf8'.
  - mode <integer> - defaults to 0o600 (see node.js file modes).
  - flags <string> - defaults to 'a' (see node.js file flags).
  - compress <boolean> - defaults to false - compress the backup files using gzip (backup files will have .gz extension).
  - keepFileExt <boolean> - defaults to false - preserve the file extension when rotating log files (file.log becomes file.1.log instead of file.log.1).
  - fileNameSep <string> - defaults to '.' - the filename separator when rolling. e.g.: abc.log.1 or abc.1.log (keepFileExt).

## License

MIT Licensed  
Copyright (c) 2023 Emooa

<!-- ## FAQ -->
