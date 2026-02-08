# Development Journey Index

本文件提供所有功能的开发历程索引，方便查看设计迭代过程。

## 📁 功能模块开发历程

### 🚪 DoorRelated (门相关功能)
**Production 文件:**
- `Production/handwritten-echo.html` - 手写记忆界面
- `Production/profile-card-primary.html` - 主要个人资料卡片
- `Production/profile-card-secondary.html` - 次要个人资料卡片

**开发历程:**
- `0-Pages/DoorRelated/DesignJourney/` - 设计迭代文件夹
  - `d1.html` - 设计版本 1
  - `d3-网格科技感.html` - 网格科技感设计
  - `d4-临时状态.html` - 临时状态设计

---

### 🏠 Landing Page-Search (首页-搜索)
**Production 文件:**
- `Production/landing-page.html` - 主页面
- `Production/search-results.html` - 搜索结果页面

**开发历程:**
- `0-Pages/Landing Page-Search/dev/` - 开发迭代文件夹
  - `01-landing.html` - 首页版本 1
  - `01-MemoryHook.html` - Memory Hook 版本 1
  - `02-MemoryHook.html` - Memory Hook 版本 2
  - `03-memoryHook.html` - Memory Hook 版本 3
  - `04-memoryhook.html` - Memory Hook 版本 4
  - `2-6-landing.html` - 首页版本 2-6
  - `searchResult.html` - 搜索结果初版
  - `searchresults02.html` - 搜索结果版本 2

---

### 💭 Memory (记忆功能)
**Production 文件:**
- `Production/memory-public.html` - 我的公开记忆
- `Production/memory-private.html` - 我的私人记忆
- `Production/memory-others.html` - 他人的记忆

**开发历程:**
- `0-Pages/Memory/Design-journey/` - 设计迭代文件夹（包含 10 个 HTML 文件）

---

### 💬 EchoChat (聊天功能)
**Production 文件:**
- 暂无生产文件（仍在开发中）

**开发历程:**
- `0-Pages/EchoChat/` - 包含多个迭代版本
  - `01-perspective-tilting.html` - 透视倾斜效果
  - `01.1-centered-response(great aura).html` - 居中响应版本
  - `01.2-focused mode.html` - 专注模式
  - `02-amazing-balls.html` - 球体效果
  - `03-finalized.html` - 最终版本
  - `EchoChat-Breath effect/` - 呼吸效果相关文件

---

### 🗺️ Map (地图功能)
**Production 文件:**
- 暂无生产文件（仍在开发中）

**开发历程:**
- `0-Pages/Map/` - 地图相关开发文件
  - `EchoButton-Map/` - Echo 按钮地图相关
  - `main_bignumber_withHeads.html` - 大数字显示
  - `main_time_variant.html` - 时间变体
  - `map_view.html` - 地图视图
  - `memoryDetail.html` - 记忆详情

---

### 😊 Emotions (情感功能)
**Production 文件:**
- 暂无生产文件（仍在开发中）

**开发历程:**
- `0-Pages/Emotions/` - 情感相关文件
  - `balls.html` - 球体效果
  - `emotionband.html` - 情感带
  - `Eyes.html` - 眼睛效果
  - `simples.html` - 简单版本

---

### 💬 PeerMessage (对等消息)
**Production 文件:**
- 暂无生产文件（仍在开发中）

**开发历程:**
- `0-Pages/PeerMessage/PeerChat.html` - 对等聊天界面

---

### 🎨 UI-ELEMENTS (UI 元素)
**Production 文件:**
- `Production/memory-component.html` - Memory UI 组件

**开发历程:**
- `UI-ELEMENTS/` - UI 元素开发文件夹
  - `MemoryTags/` - Memory 标签相关
  - `TOGGLE.HTML` - 切换组件

---

## 📝 使用说明

1. **查找 Production 版本**: 所有生产文件都在 `Production/` 文件夹根目录中，使用专业的语义化命名
2. **查看开发历程**: 每个功能模块的开发历程都在对应的 `0-Pages/[功能名]/` 文件夹中
3. **设计迭代**: 设计相关的迭代文件通常在 `DesignJourney/` 或 `dev/` 文件夹中

## 🔗 快速链接

- [Production 文件夹](./Production/)
- [0-Pages 文件夹](./0-Pages/)

## 📋 文件命名规范

Production 文件夹中的所有文件遵循以下命名规范：

- **kebab-case**: 使用小写字母和连字符
- **语义化命名**: 文件名清晰表达功能
- **无版本前缀**: 不包含 P0、v1 等版本标识
- **功能导向**: 文件名直接反映文件用途
