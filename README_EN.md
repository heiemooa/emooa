<p align="center"><b> <a href="./README.md"> 中文 </a> | English </b></p>

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
yarn npm login

// Root directory
yarn run publish
```

## Q&A

- Why is the installation dependency `yarn run exec`, instead of `yarn` directly?

  The `lerna exec -- yarn` command is used to execute the `yarn` command in each package in the `Lerna` repository to install dependencies.

  Specifically, `lerna exec` is a command provided by `Lerna` to execute a specified command on each package in the repository. `--` is the flag used to separate the `lerna exec` command from the command to be executed (`yarn install`).

  By running `lerna exec -- yarn`, `Lerna` will iterate through each package in the repository and execute `yarn` in each package's directory to ensure that their dependencies are installed correctly.

  For convenience, I wrote it into the `package.json scripts` configuration.

- Why `yarn npm login`, and not `yarn login` or `npm login`?

  `yarn npm login` and `npm login` are the same commands used to log in to the `npm` repository. And `yarn login` is a `Yarn`-specific command, used to log in to the Yarn repository.

  `Yarn` is a package manager created by `Facebook` that is compatible with `npm` repositories and has improvements in performance and security. Therefore, if you use Yarn as your package manager, you may choose to use the `yarn login` command to log in to the `Yarn` repository. If you still want to use the `npm` repository, you can use `yarn npm login` or `npm login`. These two commands are equivalent.

  Since I am used to using `yarn` to install dependencies and other operations instead of `npm`, I chose `yarn npm login`.

- Why `yarn run publish` instead of `yarn publish`?

  We currently use lerna to manage the release of packages in multi-package repositories. To release a version, you need to execute `lerna run tsc && lerna publish`, which is not a simple `yarn publish`.

  For convenience, I wrote it into the `package.json scripts` configuration.
