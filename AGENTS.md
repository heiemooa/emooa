# 开发规范

本文件是仓库级开发约定。新增或修改代码时必须遵循；如需改变既有约定，应先由用户明确提出，并同步更新本文件及相关配置。不要为了风格偏好顺手重排或重写无关代码。

## 项目结构

- 仓库使用 Yarn workspaces 与 Lerna，业务包位于 `packages/*`。改动应归属到对应 package，不要把 package 私有实现放到仓库根目录。
- UI 组件属于 `packages/ui`，图标组件及生成工具属于 `packages/icon`，HTTP 封装属于 `packages/http`，日志库属于 `packages/logger`。遵循所在 package 已有的目录划分、入口导出和构建方式。
- 开始 `packages/ui` 的实现任务前，必须先阅读并遵循 [packages/ui/AGENTS.md](packages/ui/AGENTS.md)。根规范与包内规范同时适用；冲突时以更具体的包内规范为准，但不得违反根目录工具配置。
- UI 组件实现位于 `packages/ui/components/<component>`，目录名使用现有的小写形式（如 `button`、`config-provider`）；导出的 React 组件符号使用 PascalCase。文档示例/页面代码位于 `packages/ui/src/containers/<Component>` 或 `packages/ui/examples`，目录形式参照相邻示例；不要混淆组件实现和示例容器。
- 新增组件时参照同类组件，保持实现、类型、样式、入口导出、测试和文档之间的组织方式一致。

## 格式与语言

- 以根目录 `.prettierrc` 为格式化依据：2 空格缩进、单引号、行宽 120、对象括号内留空格、尾逗号 `all`、单参数箭头函数省略括号、保留自动检测的行尾。
- TypeScript/TSX 为主要实现语言。公共 API、组件 props、跨模块数据结构应声明明确类型；沿用所在 package 的 TS 配置，不擅自改变编译目标或模块格式。
- React 组件沿用周边代码的函数组件与 JSX 写法；保持现有导出习惯（默认导出或具名导出），不在同一模块无理由混用。
- 路径和文件命名遵循所在目录现有形式：UI 实现目录使用小写组件名（必要时 kebab-case），React 组件/类型符号使用 PascalCase，其余模块文件多用小写名称。新增文件先参照同级文件，不另造命名体系。
- import 使用明确的模块路径，优先沿用同 package 的既有 barrel/相对路径约定。不要为全仓库引入未经配置的自动排序、别名或新的格式化规则。
- 注释只用于补足代码无法清楚表达的原因或约束；新增注释与目标文件语言保持一致。

## 实现约定

- 先复用当前 package 已有的依赖、工具函数、类型及组件，再考虑新增抽象或依赖。
- 禁止未经需求明确授权新增静默兜底或容错行为。按既有 API 契约处理输入；不合法或缺失的输入应按契约暴露问题，不得擅自替换成另一个默认值或忽略错误。
- 颜色、字号、行高、尺寸、间距、圆角、边框、层级和动效等设计值必须来自现有主题 token 或既有公共配置，且每项设计属性只能有一个权威来源；禁止在组件样式中写死设计值，或为同一属性并列维护 token、常量和局部覆盖值。确需增加设计值时，先扩展现有 token 系统并让组件引用该 token。
- 修改公共组件或包接口时，保持向后兼容；确需破坏兼容时，需同步更新类型、文档、示例和测试。
- 公共组件 API 以明确、可组合的 props 表达外观与行为（如 `size`、`status`、`disabled`、回调），不要把业务特定逻辑藏在组件内部。Props 类型放在组件对应的 `interface.ts`，复用已有全局类型；新增 public prop 时提供清晰的类型和值域，必要时补充中英文 API 注释。
- UI 组件优先包装合适的原生语义元素，并透传适用的原生属性。需要保持 DOM 可访问性或让调用方定位底层节点时，沿用同类组件的 `forwardRef` 模式；不要为了统一而给无须 ref 的组件机械添加 ref。
- UI 组件按现有实现顺序组织：导入依赖和 Props；读取配置上下文；解构并设置默认 props；计算 prefix、主题样式和 class；定义事件/状态逻辑；最后渲染语义清晰的 JSX。复杂逻辑拆成有名字的函数或同目录模块，不把多种职责塞进单个 JSX 表达式。
- 支持 ConfigProvider 的组件沿用 `ConfigContext`、`getPrefixCls`、`rtl`、`size`、`scheme` 等现有机制；需要组件级默认配置时，按同类组件的 `Object.assign({}, components?.Component, props)` 模式合并，并确保调用者显式 props 覆盖默认配置。
- CSS 类通过 `classnames` 组合基础类、尺寸/状态修饰类、布尔状态类与调用方 `className`。类名前缀使用 `getPrefixCls`，不要硬编码全局组件前缀；动态主题样式沿用 `useStyle` 和主题 token，不重复写死可由 token 表达的颜色、间距、圆角、字体和动效。
- 组件样式跟随主题系统的 token 与 style hook 组织；新增样式应覆盖组件状态（默认、交互、禁用、加载等适用状态）、尺寸和 RTL 等已有能力。避免用内联样式替代主题样式；内联 style 留给调用方覆盖或确实依赖运行时值的场景。
- 有交互状态时明确区分受控与非受控模式：提供 `value`/`checked` 一类受控 prop 时，由调用方状态为准并通过回调请求变更；`defaultValue`/`defaultChecked` 只作为初始值。沿用目标组件现有 API，不擅自增加新的状态范式。
- 事件处理应尊重原生行为和 disabled/loading 等状态，并使用可读的命名 handler；异步操作要定义成功、失败、结束时的状态恢复行为。避免静默吞掉错误或留下永久 loading 状态。
- 设计优先级是行为可预测、API 可组合、主题与全局配置一致、对原生语义和 RTL 友好、向后兼容。新增能力应以小而清晰的 props 扩展实现，不为单一示例引入复杂抽象。
- UI 发布组件沿用 `packages/ui/components` 中的主题 CSS-in-JS/style hook 机制；LESS 等其他样式形式只用于仓库中已有的对应示例或页面，不要用于新增发布组件。
- 文档和示例与实际 API 保持一致；示例按现有 dumi 文档约定组织。
- SVG 图标源文件位于 `packages/icon/_svgs`，生成文件由 `packages/icon/build` 工具维护。修改图标产物前先确认源文件及生成流程，避免直接改生成输出。
- 不随任务范围格式化或改写无关文件，不借规范整理进行大范围重构。

## 按包的代码组织

- `packages/ui/components/<component>` 存放可发布组件实现。常规组件使用 `index.tsx`、`interface.ts`、`style/index.ts` 的现有结构；复合组件和配套逻辑按最接近的组件拆分到同级文件。新增前必须选出并检查一个最接近的组件作为实现模板，在交付说明中指出参考组件。
- UI 包使用 `@/` 指向 `packages/ui/components` 的路径别名；只在该 package 已有配置生效的源码中使用。dumi 示例/容器沿用现有相对路径和文档目录结构，不扩散别名假设。
- UI 组件必须在 `packages/ui/components/index.ts` 同时导出默认组件和 public Props 类型；包根入口如有单独导出清单，也必须按现有规则同步更新。不得只新增实现文件而遗漏公共导出。
- 文档示例按现有 dumi 约定放在 `packages/ui/src/containers/<Component>` 和/或 `packages/ui/examples`，并沿用既有页面/示例组织。新增 public API 时同步更新对应中英文文档，不以源码注释代替用户文档。
- 当前 `packages/ui/__tests__/ui.test.js` 只覆盖导出快照，不覆盖组件交互。新增或修改 UI 行为必须增加能验证新增行为的测试；同时更新导出快照（若导出清单变化）。若现有 Jest 环境无法运行该测试，须先补足最小测试配置/依赖并验证，不能以导出快照代替行为测试。
- `packages/http/src` 按 `index.ts` 请求入口、`interceptor/`、`_locale/`、`utils/`、`error-modal/` 分工。实例级可配置行为通过 `Options`/`MappingOptions` 暴露；默认配置与用户配置按现有 `lodash.merge` 模式合并。请求使用 Axios 实例和 response interceptor：响应数据校验/规范化后再统一错误提示；新增逻辑应放到对应职责模块，不在调用方重复实现错误映射或在 interceptor 中混合 UI 渲染。保持 `ignoreError`、响应字段映射和 locale 机制兼容。当前 package 没有独立测试文件；新增逻辑必须补可运行的自动化测试基础或明确增加该 package 的测试脚本，不能把“没有测试”当作不需要验证。
- `packages/logger/src` 按 `Logger` 核心、`LoggingEvent`、`layouts`、`interface/` 和 `appenders/` 分层。日志级别与配置解析留在核心，事件对象携带日志上下文，layout 负责把 event 格式化为字符串，appender 负责输出；新增输出目标遵循 `IAppender` discriminated union 和 appender 导出表，新增格式遵循 `IAppenderLayout` 与 `layouts` 分派。不要把格式化、级别判断和 I/O 混到一个 appender。当前测试脚本运行 `__tests__/logger.test.js`，属于 Node smoke/example 风格；新行为需要新增可断言测试，且测试命令仍须由 package script 执行。
- `packages/icon/_svgs` 是图标源数据，`packages/icon/build` 中的扫描、SVG 优化、模板渲染、入口/类型/示例/JSON 生成脚本负责生成发布文件。新增/修改图标先维护源 SVG 与相应分类/中英文元数据，再按既有 build 流程生成；不得手工编辑 `esm/`、`cjs/` 等构建产物。生成组件沿用 React `forwardRef`、SVG 原生属性透传、`IconContext` 前缀、统一 icon class 和 `spin` 行为。图标测试目前使用 Jest 快照检查导出清单，新增图标时更新快照并运行 build/test。
- 各 package 的模块格式、导出入口和构建产物不同。改动必须遵循对应 `package.json`、tsconfig 和构建配置，不将一个 package 的导出/模块写法直接套用到另一个 package。根目录通过 Yarn workspaces/Lerna 执行 package scripts；只有 package 声明了对应 script 时才运行该命令。

## 新 UI 组件执行清单

新增 UI 组件时必须遵循 `packages/ui/AGENTS.md` 的实现约束，并按以下顺序完成，不得跳过适用项：

1. 选择同类参考组件。基础展示组件参考 `Divider`、`Tag` 等；带配置/状态的组件参考 `Button`、`Spin` 等；复合布局组件参考 `Grid`；静态方法/弹层组件参考 `Modal`、`Message`。按真实职责选最接近者，不照抄不相关组件。
2. 在对应组件目录建立实现与 Props 类型，沿用参考组件的默认导出、命名、内部子模块和类型组织。Props 先复用已有原生属性/共享类型，新增 API 使用具体类型和清楚的默认值，不用无约束的 `any` 替代类型设计。
3. 若需要 ConfigProvider 能力，按参考组件读取 `ConfigContext`，使用 `getPrefixCls` 和已有配置字段；按现有组件模式合并 `components?.<Name>` 默认值与调用 props，保证调用 props 优先。若组件不消费全局配置，则不为形式统一而添加无用 context 代码。
4. 若组件有样式，使用该组件自己的 `style/` hook，并按参考组件注册/导出 token。类名由 prefix 生成，状态由 modifier class 表达，动态样式值来自主题 token；不要创建第二套主题变量或硬编码固定全局前缀。
5. 按交互语义实现受控/非受控状态和回调。只有确实需要组件内部维护状态时才使用 state；受控值不能被内部状态覆盖。禁用、加载、异步完成/失败等边界必须与参考组件保持一致的可预测行为。
6. 在组件聚合入口导出组件和类型，补齐示例、API 文档和有意义的测试，再运行对应 package 的测试/构建。
7. 提交前逐项对照本清单及所选参考组件。任何偏离都必须由需求或技术约束驱动，并在最终说明中写明原因；纯个人偏好不构成偏离理由。

React 组件实现的具体骨架并非要求每个组件都机械使用相同 hooks：无状态/无配置组件不应增加无用状态或 context；不需要暴露底层 DOM 的组件不应机械使用 `forwardRef`；静态方法、复合组件和 hooks 应分别沿用对应类型的现有实现。严格一致的含义是匹配同类组件的职责结构、API 和主题机制，而不是复制无关代码。

## 验证与交付

- 按改动范围运行相关 package 的测试与构建；影响多个 package 或公共导出时，再运行根目录 `yarn test`、`yarn build`。
- 测试、构建命令以根目录和对应 package 的 `package.json` scripts 为准。不要臆造仓库未配置的 lint/typecheck 命令。
- 新增行为应在现有测试模式下补充有意义的测试；UI 改动同时检查对应示例或文档是否仍可用。
- 最终说明改动范围、验证结果和未能验证的部分。

## 规范依据

- 明确配置优先：根目录 `.prettierrc`、根目录及各 package 的 `tsconfig.json`、各 `package.json` scripts、Rollup/Jest 配置。
- 代码惯例按目标目录内同类、近期维护的实现为准。仓库历史代码存在不一致时，不将单个旧例视为新增规范；不得以迁就旧例为由偏离明确配置。
