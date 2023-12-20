<p align="center"><b> <a href="./README.md"> 中文 </a> | English </b></p>

## Scope Emooa Dependency Package

#### [@emooa/logger](/packages/logger/README.md)

`@emooa/logger` is a simple logger for use with Nodejs, designed as a simple and versatile pure ESM logging library, supporting multiple transports. [Read More.](/packages/logger/README.md)

```
yarn add @emooa/logger
```

## Development Process

#### 1. Create a new module

```bash
lerna create new_name
```

#### 2. Install dependencies

Install dependencies for all packages

```bash
// Root directory
yarn run exec
```

#### 3. Build

```bash
// Root directory
yarn run build
```

#### 4. Test

```bash
// Root directory
yarn run test
```

#### 5. Publish NPM package

```bash
yarn login

// Root directory
yarn run publish
```
