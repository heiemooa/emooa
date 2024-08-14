<p align="center"><b> <a href="./README.md"> 中文 </a> | English </b></p>

# [Online Examples](https://docs.emooa.com/en-US)

## Scope Emooa Dependency Package

#### [@emooa/logger](/packages/logger/README.md)

`@emooa/logger` Is a simple logger for use with Nodejs, designed as a simple and versatile logging library that supports multiple transports. [Read More.](/packages/logger/README.md)

```
yarn add @emooa/logger
```

#### [@emooa/ui](/packages/ui/README.md)

`@emooa/ui` Is an enterprise-class UI design language and React UI library. [Read More.](/packages/ui/README.md)

```
yarn add @emooa/logger
```

#### [@emooa/icon](/docs/ui/icon.en-US.md)

`@emooa/icon` includes a large number of `iconfont` icons and supports dynamically customized icon libraries.

```
yarn add @emooa/icon
```

#### [@emooa/icon](/docs/plugin/http.en-US.md)

`@emooa/http` is a network request library based on secondary encapsulation of [Axios](https://axios-http.com/), which provides unified error pop-up window processing and works in browsers. It combines back-end interface services to provide error alerts for the return body, and supports customized return status codes, internationalization, and prompt content.

```
yarn add @emooa/http
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
npm login

// Root directory
npm run publish
```

## DOCS

#### 1. Local

```bash
yarn start
```

#### 2. Build Docs

```bash
yarn run docs:build
```

## Q&A

- Why is the installation dependency `yarn run exec`, instead of `yarn` directly?

  The `lerna exec -- yarn` command is used to execute the `yarn` command in each package in the `Lerna` repository to install dependencies.

  Specifically, `lerna exec` is a command provided by `Lerna` to execute a specified command on each package in the repository. `--` is the flag used to separate the `lerna exec` command from the command to be executed (`yarn install`).

  By running `lerna exec -- yarn`, `Lerna` will iterate through each package in the repository and execute `yarn` in each package's directory to ensure that their dependencies are installed correctly.

  For convenience, I wrote it into the `package.json scripts` configuration.
