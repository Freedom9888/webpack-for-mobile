# 项目贡献指南

感谢你对 webpack-for-mobile 项目的贡献！

## 开发流程

### 1. Fork 和 Clone

```bash
git clone https://github.com/你的用户名/webpack-for-mobile.git
cd webpack-for-mobile
```

### 2. 创建功能分支

```bash
git checkout -b feature/your-feature-name
```

### 3. 开发和测试

```bash
# 启动开发服务器
pnpm dev

# 运行检查
pnpm check

# 运行测试
pnpm test

# 构建
pnpm build
```

### 4. Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: 新功能
- `fix`: 错误修复
- `docs`: 文档更新
- `style`: 代码风格（不影响代码逻辑）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建工具或依赖更新
- `ci`: CI/CD 配置

**Examples:**
```
feat(router): add new route page
fix(webpack): fix bundle analyzer plugin issue
docs(readme): update installation guide
```

### 5. Push 和 Pull Request

```bash
git push origin feature/your-feature-name
```

创建 Pull Request 到 `main` 或 `feature/history` 分支。

## 代码规范

### TypeScript

- 启用严格模式
- 避免使用 `any`
- 为函数参数和返回值添加类型注解

### React

- 使用函数组件和 Hooks
- 组件文件使用 `.tsx` 扩展名
- Props 类型使用 `interface`

### 样式

- 优先使用 CSS Modules
- 遵循 BEM 命名约定
- 使用设计令牌（`tokens.css`）中定义的颜色和间距

### 测试

- 为新功能添加单元测试
- 测试文件放在 `__tests__` 目录或使用 `.test.ts(x)` 后缀
- 覆盖率目标：60%+

## 提交前检查

在提交 PR 前，确保通过以下所有检查：

```bash
# 类型检查
pnpm typecheck

# Lint 检查
pnpm lint

# 格式检查
pnpm format:check

# 完整检查（推荐）
pnpm check

# 构建验证
pnpm build
```

## PR 检查清单

- [ ] 代码遵循项目风格
- [ ] 已更新相关文档
- [ ] 已添加必要的测试
- [ ] 所有检查通过
- [ ] Commit 信息清晰

## 报告问题

发现 bug 或有功能建议？

1. 查看 [Issues](https://github.com/Freedom9888/webpack-for-mobile/issues)
2. 如果问题未存在，创建新 Issue
3. 提供清晰的描述和重现步骤

## 许可证

ISC

感谢你的贡献！🎉
