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

```
import Logger from '@emooa/logger';

const logger = new Logger('My Project');
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

## FAQ

### How can I move my CommonJS project to ESM?

- Add "type": "module" to your package.json.
- Replace "main": "index.js" with "exports": "./index.js" in your package.json.
- Replace all require()/module.export with import/export.
- Use only full relative file paths for imports: import x from '.'; → import x from './index.js';.
- If you have a TypeScript type definition (for example, index.d.ts), update it to use ESM imports/exports.

### Can I import ESM packages in my TypeScript project?

Yes, but you need to convert your project to output ESM. See below.
