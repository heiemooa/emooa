<p align="center"><b> 中文 | <a href="./README_EN.md"> 英文 </a>  </b></p>

## Scope Emooa 依赖包

#### [@emooa/logger](/packages/logger/README.md)

`@emooa/logger` 是一个与 Nodejs 一起使用的简单记录器，被设计为一个简单且多功能的纯 ESM 日志库，支持多种传输。 [阅读更多。](/packages/logger/README.md)

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
yarn login

// 根目录
yarn run publish
```
