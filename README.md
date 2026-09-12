# webpack-for-mobile

从零搭建一个移动端项目打包配置 - 企业级 React 移动端应用框架

## 📱 项目简介

webpack-for-mobile 是一个基于 Webpack 5 + React 19 + TypeScript 的移动端项目打包配置框架。提供开箱即用的构建配置、代码规范检查、国际化、路由、状态管理等完整开发工具链。

### ✨ 核心特性

- **⚡ 高性能构建**
  - SWC 超快编译器代替 Babel
  - 智能代码分割和 Tree Shaking
  - Gzip + Brotli 双压缩算法
  - 生产构建体积优化

- **📱 移动端适配**
  - px 自动转 vw 响应式布局
  - 移动端性能优化
  - PWA 离线缓存支持
  - Service Worker 集成

- **🛠️ 完整工具链**
  - TypeScript 5.4 严格类型检查
  - ESLint 9 + Prettier 代码规范
  - Husky + lint-staged Git 钩子
  - 环境变量配置管理

- **🌍 国际化支持**
  - i18next 多语言方案
  - 浏览器语言自动检测
  - react-i18next 集成

- **🛣️ 路由和导航**
  - React Router v7 现代化路由
  - 嵌套路由支持
  - 动态路由和懒加载

- **📊 状态管理**
  - React Query 数据获取和缓存
  - 自动重试和离线支持

- **🔌 模块联邦**
  - Module Federation 微前端支持
  - 跨应用组件共享

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发服务器

```bash
pnpm dev
```

服务器将在 `http://localhost:3000` 启动，支持热模块更新（HMR）。

### 生产构建

```bash
pnpm build
```

生成优化后的生产版本到 `dist/` 目录。

### 构建分析

```bash
pnpm build:analyze
```

生成并打开交互式包分析报告。

---

## 📁 项目结构

```
webpack-for-mobile/
├── src/
│   ├── components/          # React 组件
│   ├── pages/               # 页面组件
│   ├── utils/               # 工具函数
│   │   └── globalErrorHandler.ts
│   ├── hooks/               # 自定义 hooks
│   ├── services/            # API 服务
│   ├── common/              # 共享常量
│   ├── shared/              # 共享类型和接口
│   ├── styles/              # 全局样式
│   │   └── tokens.css       # 设计令牌
│   ├── i18n.ts              # 国际化配置
│   ├── router.ts            # 路由配置
│   ├── App.tsx              # 根组件
│   ├── index.tsx            # 应用入口
│   └── index.html           # HTML 模板
├── public/                  # 静态资源
├── webpack.config.js        # Webpack 配置
├── tsconfig.json            # TypeScript 配置
├── .eslintrc.js             # ESLint 配置
├── .prettierrc              # Prettier 配置
├── .env.example             # 环境变量示例
├── package.json             # 项目依赖
└── AGENTS.md                # AI Agent 工程规范
```

---

## 📖 开发指南

### NPM 脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（热更新） |
| `pnpm build` | 生产环境构建 |
| `pnpm build:analyze` | 生成包分析报告 |
| `pnpm lint` | ESLint 检查 |
| `pnpm lint:fix` | ESLint 自动修复 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm format` | Prettier 代码格式化 |
| `pnpm format:check` | 检查代码格式 |
| `pnpm check` | 完整检查（typecheck + lint + format） |

### 代码规范

#### TypeScript

- 启用严格模式 (`strict: true`)
- 禁止隐式 `any` 类型
- 必须为函数参数和返回值标注类型

#### ESLint

- 基于 ESLint Recommended
- React 最佳实践
- React Hooks 规则
- TypeScript 类型检查

#### Prettier

- 自动代码格式化
- 保证代码风格一致性
- 与 ESLint 完全集成

#### Git Hooks

提交前自动执行：
- ESLint 检查和修复
- Prettier 格式化
- commit message 规范检查（Commitlint）

### 环境变量

创建 `.env` 或 `.env.production` 文件：

```bash
# API 代理地址（开发环境）
API_PROXY_TARGET=http://localhost:3001

# 启用模块联邦
ENABLE_MF=false
```

详见 `.env.example`。

---

## 🔧 Webpack 配置

### 开发模式

- 源代码映射：`eval-cheap-module-source-map`
- 启用 HMR 热模块更新
- 文件缓存加速
- TypeScript 类型检查（Fork TS Checker）

### 生产模式

- 代码最小化（Terser）
- CSS 最小化（CSS Minimizer）
- 文件名添加内容哈希
- 生成 Source Map（可选）
- Gzip + Brotli 压缩

### 代码分割策略

| 分块 | 包含内容 | 优先级 |
|------|---------|--------|
| `framework` | React、React DOM、Router | 40 |
| `lodash` | Lodash 库 | 30 |
| `vendors` | 其他 node_modules | -10 |
| `common` | src 中的 utils、common、hooks | -20 |

---

## 🌐 国际化 (i18n)

### 配置

```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return <h1>{t('key')}</h1>
}
```

### 语言包

在 `src/i18n` 目录添加语言包文件。

---

## 🛣️ 路由

### 基本使用

```typescript
import { RouterProvider } from 'react-router-dom'
import router from './router'

const App = () => <RouterProvider router={router} />
```

### 路由配置

在 `src/router.ts` 中定义路由：

```typescript
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
    ]
  }
]
```

---

## 📦 依赖管理

### 主要依赖版本

- React: 19.0.0
- React DOM: 19.0.0
- TypeScript: 5.4.0
- Webpack: 5.99.9
- Webpack Dev Server: 5.2.2
- SWC: 1.11.31

### 更新依赖

```bash
# 检查过时依赖
pnpm outdated

# 更新依赖
pnpm update
```

---

## 🔍 调试和开发

### 浏览器 DevTools

- React DevTools 检查组件
- Redux DevTools（如需要）
- Network 标签检查 API 请求
- Console 查看日志和错误

### VS Code 配置

推荐扩展：
- ESLint
- Prettier
- TypeScript Vue Plugin
- React Developer Tools

---

## 📱 PWA 支持

Service Worker 配置在 `src/service-worker.ts`。

### 启用 PWA

1. 创建 `public/manifest.json`
2. 生产构建时自动生成 Service Worker
3. 应用可离线运行

---

## 🚢 部署

### 静态部署（GitHub Pages、Vercel 等）

```bash
pnpm build
# 上传 dist/ 目录
```

### 环境特定配置

创建相应的环境文件：
- `.env` - 通用变量
- `.env.development` - 开发环境
- `.env.production` - 生产环境

---

## 🤝 贡献指南

### 开发流程

1. 创建功能分支：`git checkout -b feature/your-feature`
2. 提交更改：`git commit -m "feat: description"`
3. 推送分支：`git push origin feature/your-feature`
4. 创建 Pull Request

### Commit 规范

遵循 Conventional Commits：

```
<type>(<scope>): <subject>

<body>
<footer>
```

类型：`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## 📝 许可证

ISC

---

## 🆘 常见问题

### Q: 如何在 Webpack 中添加新的 loader？

A: 在 `webpack.config.js` 的 `module.rules` 中添加新规则。

### Q: 如何修改设计稿适配宽度？

A: 修改 `webpack.config.js` 中的 `postcss-px-to-viewport` 配置的 `viewportWidth`。

### Q: 生产构建时如何跳过 Source Map？

A: 修改 `webpack.config.js` 中的 `devtool` 配置。

### Q: 如何启用模块联邦？

A: 设置环境变量 `ENABLE_MF=true` 后构建。

---

## 📚 相关资源

- [Webpack 官方文档](https://webpack.js.org/)
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [i18next 文档](https://www.i18next.com/)
- [React Router 文档](https://reactrouter.com/)

---

**最后更新**: 2026-09-12
