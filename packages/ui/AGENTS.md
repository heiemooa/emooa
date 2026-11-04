# UI 组件 Agent 规范

本规范约束 `packages/ui` 下的所有新增与修改。它用于统一新增实现的代码写法和流程，不授权对旧组件做顺手重构。根目录 `AGENTS.md` 仍然适用。

## 开工前必须完成

1. 阅读根目录 `AGENTS.md`、本文件，以及 `packages/ui/components/index.ts`。
2. 选一个职责最接近的现有组件作为主模板，并检查它的实现、`interface.ts`、`style/`、导出和文档/示例。基础语义展示组件优先看 `Divider`；有外观变体、全局配置和 ref 的看 `Button`；有异步/内部状态的看 `Tag` 或 `Alert`；布局组件看 `Grid`；弹层/静态 API 看 `Modal` 或 `Message`。
3. 若主模板不足以覆盖某项行为，再选一个补充模板。实现必须沿用模板相同的职责划分和 API/样式机制；不得只挑其中符合自己偏好的局部模式。
4. 在交付说明中注明主模板和补充模板（如有）。若仓库没有可比实现，先将采用的最接近模式和缺失点写进任务说明，再实现；不要自行引入新架构。

## 固定命名与文件

- 组件目录一律使用小写 kebab-case，例如 `config-provider`；组件和 Props 类型使用 PascalCase，例如 `ConfigProvider`、`ConfigProviderProps`。
- 一个常规发布组件的实现位于 `components/<name>/index.tsx`，公共 props 位于 `components/<name>/interface.ts`，主题样式位于 `components/<name>/style/index.ts`。只有主模板也将可复用子组件或逻辑拆到同级文件时，才按同样的拆分方式新增文件。
- 无主题样式的组件仍须先参照同职责的无样式组件；不得为了填满目录而添加空 `style` 文件。
- 示例和文档遵循相邻组件的既有 dumi 目录结构；组件实现目录不得存放示例页面。
- 不修改 `esm/`、`cjs/`、`lib/` 等生成产物。

## `interface.ts` 写法

- 公共类型定义必须留在 `interface.ts`，组件实现从该文件导入。主 Props 类型命名为 `<Component>Props`，相关辅助类型留在同文件并使用明确名称。
- 优先继承对应原生 DOM 属性类型（例如 `React.HTMLAttributes<HTMLDivElement>` 或 `React.ButtonHTMLAttributes<HTMLButtonElement>`），再声明组件特有属性；元素类型必须与实际渲染元素一致。多种根元素/模式按主模板的 discriminated union 或组合类型表达，不用宽泛的 `any` 混合。
- props 用可读的联合字面量、共享 UI 类型和 React 类型表达合法值域。除非主模板同样将其作为公共 API，不把 CSS 内部值域暴露成字符串兜底。
- 每个新增公共 prop 都写简短的中英文 API 注释，并在有默认值时标注 `@defaultValue`。注释描述用户可观察的行为，不重复类型名称。
- 可选 boolean 默认值在组件实现解构处设置，沿用主模板写法；不要在类型声明、ConfigProvider 默认项和组件实现三处重复定义互相可能冲突的默认值。

## `index.tsx` 写法

- 保持主模板的模块组织和 import 顺序。不得全仓重排 import，也不得在同一新组件中随意改变相邻语句顺序。
- 有 ConfigProvider 集成的普通组件按主模板组织：导入 React/所需 hooks、props 类型、配置上下文及类型、`classnames`、本组件 style hook、内部组件/图标；在组件开头读取 `ConfigContext`，接着合并组件级默认 props 与实例 props（`Object.assign({}, components?.<Component>, props)`，props 必须最后），然后计算 prefix/style/classes，再组织状态/事件逻辑，最后返回 JSX。
- 只有组件确实使用全局配置时才读取 context。组件实际用到哪些配置字段就只解构哪些字段，不增加无用的 `ConfigProviderProps`。
- 根 DOM 有 ref 需求且主模板以该 DOM 暴露 ref 时，使用同样的 `React.forwardRef<DOMElement, Props>` 形式；开发态按主模板设置 `displayName`。无 ref 需求时按主模板使用普通函数组件。
- 默认导出形式沿用主模板。复合子组件的静态挂载方式（如 `Button.Group`）仅在 API 明确需要且有对应先例时使用。
- 解构 props 时明确列出消费的 props，剩余原生 props 用 `...rest` 透传到语义正确的根元素。不要吞掉 `className`、`style`、`children` 或适用的原生事件属性。
- `classNames` 使用仓库当前依赖 `classnames`，变量命名和排列顺序照主模板；基础 prefix、主题 hash、变体类、布尔状态类和外部 `className` 的合并规则保持一致。
- handler 使用有意义的 `handle...`/`onHandle...` 命名并在 JSX 外定义；沿用同类组件对原生事件、取消默认行为、异步回调和错误状态的处理方式。禁止在 JSX 中塞入跨多步状态转换逻辑。
- 禁止未经需求明确授权新增静默兜底或容错行为。遵循组件已有 API 契约；不合法或缺失的输入应按契约暴露问题，不得擅自替换成另一个默认值或忽略错误。
- 受控 prop 存在时，是否受控按 props 是否提供判断，不能由内部 state 覆盖。非受控初始值只用于初始化；受控/非受控两种模式及变更回调都必须有测试。

## `style/` 与主题

- 发布组件的样式继续使用仓库的 CSS-in-JS token 系统。新增 `style/index.ts` 时沿用主模板的 `CSSObject`、`FullToken`、`GenerateStyle`、`GetDefaultToken`、`genStyleHooks`、`mergeToken` 导入与声明顺序，以及 `genStyleHooks(componentName, generator, prepareComponentToken)` 注册结构。
- token 类型命名为 `ComponentToken` 与 `<Component>Token`，组件样式生成函数按职责命名；选择器使用 hook 提供的 `componentCls`/`euiCls`，不得写死 `eui-<component>` 全局选择器。
- 颜色、字号、行高、尺寸、间距、圆角、边框、层级和动效等设计值必须使用现有主题 token，且每项设计属性只能有一个权威来源；禁止在组件样式中写死设计值，或为同一属性并列维护 token、常量和局部覆盖值。缺少合适 token 时，按本规范的主题 token 流程扩展 token，再由组件引用。
- 仅当组件确需独立可覆写值时才新增 component token，并同时实现 `prepareComponentToken`。
- 只要新增了或调整了通过 ConfigProvider 暴露的公开 component token，必须同步在 `components/_theme/interface/components.ts` 导入并加入 `ComponentTokenMap`，并检查 ConfigProvider 的 theme.components 类型可以使用它；仅内部使用且不允许外部覆盖的 token 不新增映射。
- 样式需对新增变体/状态提供明确 modifier selector，并覆盖该状态与 disabled/loading/RTL 等相关组合；不适用的状态不增加空规则。
- 内联 `style` 仅用于调用方透传或运行时计算值。静态视觉规则放在 style hook，不在 JSX 写死颜色/间距/尺寸。

## 导出、主题映射、文档与测试

- 在 `components/index.ts` 按现有顺序添加 `export { default as <Component> } from './<name>'` 和 `export type { <Component>Props } from './<name>/interface'`。有公共辅助类型时一并显式导出。
- 有公开可配置的 component token 时同步更新 `_theme/interface/components.ts`；新增全局配置字段时同步更新 ConfigProvider props、默认值、context 和相关消费逻辑。不得只改组件本身。
- 新增组件必须提供对应中英文文档和最小可运行示例，放置位置、文件命名、dumi frontmatter 按最接近组件复制其结构；示例需覆盖公共 props 的代表性组合。
- 为每个新增的可观察行为写可断言测试，至少覆盖默认渲染、一个主要交互/状态转换、受控模式（若支持）以及禁用/异步失败等适用边界。导出清单变化时更新 `packages/ui/__tests__/__snapshots__/ui.test.js.snap`。不得把该快照当作交互测试。
- 如果现有 Jest 配置不能对新增测试执行，先补最小配置并运行测试；不能以“仓库当前测试较少”为理由省略行为验证。
- 运行 UI package 的 `yarn test` 和 `yarn build`。若新增样式需要文档站验证，再运行 `yarn docs:build`；报告所有未通过或无法运行的命令。
- 新组件结构完成后，必须从 `packages/ui` 运行 `yarn check:component <lowercase-kebab-name>`（或从仓库根目录运行 `yarn workspace @emooa/ui check:component <lowercase-kebab-name>`）；该脚本检查组件实现、Props 导出、样式、示例、中英文文档、非空专属测试和公共导出。检查通过不能替代测试、构建或人工核对。
- Pull Request 中新增的 UI 组件还会由 `.github/workflows/ui-component-contract.yml` 自动执行结构检查；检查失败时不得合并，必须补齐约定文件和导出。

## 完成前逐项核对

- 目录和文件名符合本规范，结构与主模板相符。
- Props 类型、默认值、受控逻辑、根 DOM/ref、class 合并、事件处理与主模板对应。
- 主题样式使用现有 token hook，所有公开可配置的 component token 已注册。
- 组件和类型均从聚合入口导出，文档、示例及测试完整。
- 测试和构建已运行，最终说明明确写出主模板、实现文件、验证结果和偏离依据。

没有用户明确授权或清楚技术约束时，不偏离上述要求。确需偏离时，先在实现说明中指出具体条目和原因，并保持其余规范不变。
