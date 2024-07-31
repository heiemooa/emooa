<p align="center"><b> 中文 | <a href="./README.en-US.md"> 英文 </a>  </b></p>

# [在线演示](https://docs.emooa.com)

## Scope Emooa 依赖包

#### [@emooa/logger](/packages/logger/README.md)

`@emooa/logger` 是一个与 Nodejs 一起使用的简单记录器，被设计为一个简单且多功能并且支持多种传输的日志库。 [更多信息](/packages/logger/README.md)

```
yarn add @emooa/logger
```

#### [@emooa/ui](/packages/ui/README.md)

`@emooa/ui` 灵活丰富的 UI 组件设计语言和 React 组件库。 [更多信息](/packages/ui/README.md)

```
yarn add @emooa/ui
```

#### [@emooa/icon](/docs/ui/icon.zh-CN.md)

`@emooa/icon` 包括海量的 `iconfont` 图标，且支持动态自定义的图标库。

```
yarn add @emooa/icon
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
npm login

// 根目录
npm run publish
```

## 文档

#### 1. 本地启动

```bash
yarn start
```

#### 2. 打包

```bash
yarn run docs:build
```

## Q&A

- 为什么安装依赖是 `yarn run exec`, 而不是直接 `yarn`?

  `lerna exec -- yarn` 命令的作用是在 `Lerna` 存储库中的每个包中执行 `yarn` 命令进行安装依赖。

  具体来说，`lerna exec` 是 `Lerna` 提供的一个命令，用于在存储库中的每个包上执行指定的命令。`--` 是用来分隔 `lerna exec` 命令和要执行的命令（`yarn install`）的标志。

  通过运行 ` lerna exec -- yarn`，`Lerna` 会遍历存储库中的每个包，并在每个包的目录中执行 `yarn`，以确保它们的依赖项被正确安装。

  方便起见，我将它写入 `package.json scripts` 配置。
