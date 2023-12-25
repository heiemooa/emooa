# `@emooa/logger`

> A simple logger to work with Nodejs.

`@emooa/logger` is a simple logger for use with Nodejs, designed as a simple and versatile pure ESM logging library, supporting multiple transports, developed using TS.

## Quick Start

```
npm install @emooa/logger
// or
yarn add @emooa/logger

```

## Usage

IMPORTANT: `@emooa/logger` is pure ESM.

- If you use a bundler, make sure it supports ESM and that you have correctly configured it for ESM.
- The log method supports a second optional parameter, the parameter type is HEX.

```ts
import Logger from "@emooa/logger";

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
        // More file config see https://www.npmjs.com/package/streamroller
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

Terminal output:

This will then output to stdout with the coloured layout

```
[2023-12-17 12:56:25] [LOG] My Project - The color is grey!
[2023-12-17 12:56:25] [INFO] My Project - The color is green!
[2023-12-17 12:56:25] [WARN] My Project - The color is yellow!
[2023-12-17 12:56:25] [ERROR] My Project - The color is red!
[2023-12-17 12:56:25] [DEBUG] My Project - The color is cyan!
```

## API

### Appender

| **参数** | **类型**                                         | **默认值**                           | **定义**                                                                 |
| -------- | ------------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------ |
| type     | `console`｜`stderr`｜`stdout`｜`file` (Required) | null                                 | coloured console logging to stdout or stderr.                            |
| colour   | boolean (Optional)                               | true                                 | Whether to output colored logs.                                          |
| layout   | [Layout](###Layout) (Required)                   | { type: 'basic' }                    | The appemder layout, supports multiple log output formats.               |
| file     | [File](###File) (Required when the type is file) | { filename: 'log/emooa-logger.log' } | file appender, with configurable log rolling based on file size or date. |

### Layout

The appender layout, supports multiple log output formats

| **参数** | **类型**                                           | **默认值**         | **定义**                                                                                                                                                    |
| -------- | -------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | `basic`｜`message`｜ `pattern` (Required)          | `basic`            | `basic`[time] [logLevel] category - message <br> `message` simple message <br> `pattern` A special type that allows you to define any format you want. <br> |
| pattern  | string (Required when the output style is pattern) | `%[[%d] [%p]%] %m` | A special type that allows you to define any format you want.                                                                                               |

### File

file appender, with configurable log rolling based on file size or date, [Read More.](https://github.com/log4js-node/streamroller#readme)

- filename <string>
- maxSize <integer> - defaults to 0 - the size in bytes to trigger a rollover. If not specified or 0, then no log rolling will happen.
- numBackups <integer> - defaults to 1 - the number of old files to keep (excluding the hot file)
- options <Object>
  - encoding <string> - defaults to 'utf8'
  - mode <integer> - defaults to 0o600 (see node.js file modes)
  - flags <string> - defaults to 'a' (see node.js file flags)
  - compress <boolean> - defaults to false - compress the backup files using gzip (backup files will have .gz extension)
  - keepFileExt <boolean> - defaults to false - preserve the file extension when rotating log files (file.log becomes file.1.log instead of file.log.1).
  - fileNameSep <string> - defaults to '.' - the filename separator when rolling. e.g.: abc.log.1 or abc.1.log (keepFileExt)

## FAQ

### How can I move my CommonJS project to ESM?

- Add "type": "module" to your package.json.
- Replace "main": "index.js" with "exports": "./index.js" in your package.json.
- Replace all require()/module.export with import/export.
- Use only full relative file paths for imports: import x from '.'; → import x from './index.js';.
- If you have a TypeScript type definition (for example, index.d.ts), update it to use ESM imports/exports.

### Can I import ESM packages in my TypeScript project?

Yes, but you need to convert your project to output ESM. See below.
