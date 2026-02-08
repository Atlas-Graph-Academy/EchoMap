# EchoMap Project

## 📁 项目结构说明

### 核心文件夹

- **`0-Pages/`** - 所有页面和功能的开发文件夹
  - 每个子文件夹代表一个关键功能模块
  - 包含开发历程和迭代版本

- **`Production/`** - 生产环境文件
  - 包含所有生产环境使用的最终版本文件
  - 所有文件都在根目录，使用专业的语义化命名
  - 无子文件夹结构，便于快速访问和管理

### 其他重要文件夹

- **`UI-ELEMENTS/`** - UI 组件和元素
- **`image/`** - 项目图片资源
- **`System/`** - 系统配置文件
- **`MD-FILES/`** - 文档文件

## 🎯 Production 文件系统

### 文件组织方式

- **扁平化结构**: 所有文件直接在 `Production/` 根目录
- **语义化命名**: 文件名清晰表达功能，无需查看文件夹结构
- **专业命名规范**: 使用 kebab-case，无版本前缀

### 如何找到文件？

1. **直接访问**: 所有生产文件都在 `Production/` 文件夹根目录
2. **语义化命名**: 文件名直接反映功能，如 `landing-page.html`、`memory-public.html`
3. **查看索引**: 参考 [Development Journey Index](./Development-Journey.md) 或 [Production README](./Production/README.md)

## 🔍 开发历程

如果想查看某个功能的开发历程：

1. 查看 [Development Journey Index](./Development-Journey.md) 获取完整索引
2. 在 `0-Pages/[功能名]/` 文件夹中查找 `DesignJourney/` 或 `dev/` 文件夹
3. 每个功能模块的开发历程都保存在对应的子文件夹中

## 📋 当前 Production 文件列表

### 核心页面
- `landing-page.html` - 应用主页面
- `search-results.html` - 搜索结果页面

### 记忆功能
- `memory-public.html` - 我的公开记忆
- `memory-private.html` - 我的私人记忆
- `memory-others.html` - 他人的记忆

### 个人资料
- `profile-card-primary.html` - 主要个人资料卡片
- `profile-card-secondary.html` - 次要个人资料卡片
- `handwritten-echo.html` - 手写记忆界面

### UI 组件
- `memory-component.html` - Memory UI 组件

## 🚀 快速开始

1. **查看生产文件**: 进入 `Production/` 文件夹，所有文件都在根目录
2. **查看开发历程**: 参考 `Development-Journey.md`
3. **了解项目结构**: 查看各功能模块的 README

## 📝 文件命名规范

Production 文件夹中的所有文件遵循以下规范：

- **kebab-case**: 使用小写字母和连字符（如 `landing-page.html`）
- **语义化命名**: 文件名清晰表达功能（如 `memory-public.html`）
- **无版本前缀**: 不包含 P0、v1 等版本标识
- **功能导向**: 文件名直接反映文件用途

### 命名模式

- `[功能]-[类型].html` - 如 `memory-public.html`
- `[功能]-[描述].html` - 如 `profile-card-primary.html`
- `[功能]-page.html` - 如 `landing-page.html`

## 🔗 相关文档

- [Production 文件夹说明](./Production/README.md)
- [Development Journey Index](./Development-Journey.md)
