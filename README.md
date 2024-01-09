<p align="center"><b> 中文 | <a href="./README_EN.md"> 英文 </a>  </b></p>

## Scope Emooa 依赖包

#### [@emooa/logger](/packages/logger/README.md)

`@emooa/logger` 是一个与 Nodejs 一起使用的简单记录器，被设计为一个简单且多功能并且支持多种传输的日志库。 [更多信息](/packages/logger/README.md)

```
yarn add @emooa/logger
```

#### [@emooa/ui](/packages/ui/README.md)

`@emooa/ui` 一套企业级 UI 设计语言和 React 组件库。 [更多信息](/packages/ui/README.md)

```
yarn add @emooa/logger
```

## 开发流程

#### 1. 创建新的模块

```bash
lerna create new_name
```

#### 2. 安装依赖

为所有 packages 安装依赖

```bash
// 根目录
yarn run exec
```

#### 3. 构建

```bash
// 根目录
yarn run build
```

#### 4. 测试

```bash
// 根目录
yarn run test
```

#### 5. 发布 NPM 包

```bash
yarn npm login

// 根目录
yarn run publish
```

## Q&A

- 为什么安装依赖是 `yarn run exec`, 而不是直接 `yarn`?

  `lerna exec -- yarn` 命令的作用是在 `Lerna` 存储库中的每个包中执行 `yarn` 命令进行安装依赖。

  具体来说，`lerna exec` 是 `Lerna` 提供的一个命令，用于在存储库中的每个包上执行指定的命令。`--` 是用来分隔 `lerna exec` 命令和要执行的命令（`yarn install`）的标志。

  通过运行 ` lerna exec -- yarn`，`Lerna` 会遍历存储库中的每个包，并在每个包的目录中执行 `yarn`，以确保它们的依赖项被正确安装。

  方便起见，我将它写入 `package.json scripts` 配置。

- 为什么 `yarn npm login`, 而不是 `yarn login` 或 `npm login`?

  `yarn npm login` 和 `npm login` 是相同的命令，用于登录到 `npm` 仓库。而 `yarn login` 是 `Yarn` 特有的命令，用于登录到 Yarn 仓库。

  `Yarn` 是一个由 `Facebook` 创建的包管理器，它兼容 `npm` 的仓库，并且在性能和安全性方面进行了改进。因此，如果你使用 Yarn 作为包管理器，你可以选择使用 `yarn login` 命令来登录到 `Yarn` 仓库。如果你仍然想使用 `npm` 仓库，可以使用` yarn npm login` 或 `npm login`。这两个命令是等效的。

  由于我习惯了用 `yarn` 安装依赖等操作，而非 `npm`，所以选择 `yarn npm login`。

- 为什么 `yarn run publish` 而不是 `yarn publish`?

  我们当前使用的是 lerna 管理多包存储库中的包的发布，发版本需要执行 `lerna run tsc && lerna publish`, 并非简单的 `yarn publish`。

  方便起见，我将它写入 `package.json scripts` 配置。
