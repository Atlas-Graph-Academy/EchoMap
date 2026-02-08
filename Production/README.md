# Production Files

本文件夹包含所有生产环境使用的最终版本文件。所有文件都经过完整测试和验证，可直接部署到生产环境。

## 📋 文件列表

### 核心页面

| 文件名 | 功能描述 | 对应模块 |
|--------|---------|---------|
| `landing-page.html` | 应用主页面 | Landing Page-Search |
| `search-results.html` | 搜索结果页面 | Landing Page-Search |

### 记忆功能

| 文件名 | 功能描述 | 对应模块 |
|--------|---------|---------|
| `memory-public.html` | 我的公开记忆 | Memory |
| `memory-private.html` | 我的私人记忆 | Memory |
| `memory-others.html` | 他人的记忆 | Memory |

### 个人资料

| 文件名 | 功能描述 | 对应模块 |
|--------|---------|---------|
| `profile-card-primary.html` | 主要个人资料卡片 | DoorRelated |
| `profile-card-secondary.html` | 次要个人资料卡片 | DoorRelated |
| `handwritten-echo.html` | 手写记忆界面 | DoorRelated |

### UI 组件

| 文件名 | 功能描述 | 对应模块 |
|--------|---------|---------|
| `memory-component.html` | Memory UI 组件 | UI-ELEMENTS |

## 🎯 命名规范

所有文件遵循以下命名规范：

- **kebab-case**: 使用小写字母和连字符
- **语义化命名**: 文件名清晰表达功能
- **无版本前缀**: 不包含 P0、v1 等版本标识
- **功能导向**: 文件名直接反映文件用途

### 命名模式

- `[功能]-[类型].html` - 如 `memory-public.html`
- `[功能]-[描述].html` - 如 `profile-card-primary.html`
- `[功能]-page.html` - 如 `landing-page.html`

## 🔍 查找开发历程

如需查看某个功能的开发历程，请参考：
- [Development Journey Index](../Development-Journey.md)

## 📝 文件对应关系

| 原文件名 | 新文件名 |
|---------|---------|
| `P0-landing.html` | `landing-page.html` |
| `P0-searchresults.html` | `search-results.html` |
| `P0-Memory-mine-public.html` | `memory-public.html` |
| `p0-Memory-mine-private.html` | `memory-private.html` |
| `P0-Memory-of-Others.html` | `memory-others.html` |
| `P0-profile01.html` | `profile-card-primary.html` |
| `P0-profile02.html` | `profile-card-secondary.html` |
| `P0-handwritten.html` | `handwritten-echo.html` |
| `p0-Memory.html` | `memory-component.html` |

## 🚀 使用建议

1. **部署前检查**: 确保所有文件都已测试通过
2. **版本控制**: 修改文件前，建议先创建备份
3. **开发历程**: 如需查看设计迭代，请参考对应的开发历程文件夹
