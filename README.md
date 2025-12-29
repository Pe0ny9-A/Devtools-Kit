# DevToolsKit - 零代码工具平台

<div align="center">

# ⚡ DevToolsKit

**一个现代化的零代码工具平台，集合多种实用开发工具**

[![GitHub stars](https://img.shields.io/github/stars/Pe0ny9-A/Devtools-Kit?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=gold)](https://github.com/Pe0ny9-A/Devtools-Kit/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Pe0ny9-A/Devtools-Kit?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=blue)](https://github.com/Pe0ny9-A/Devtools-Kit/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Pe0ny9-A/Devtools-Kit?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=orange)](https://github.com/Pe0ny9-A/Devtools-Kit/issues)
[![GitHub license](https://img.shields.io/github/license/Pe0ny9-A/Devtools-Kit?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=green)](https://github.com/Pe0ny9-A/Devtools-Kit/blob/main/LICENSE)

![Vue](https://img.shields.io/badge/Vue-3.4-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
[![GitHub last commit](https://img.shields.io/github/last-commit/Pe0ny9-A/Devtools-Kit?style=flat-square&logo=github&logoColor=white&labelColor=181717)](https://github.com/Pe0ny9-A/Devtools-Kit/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Pe0ny9-A/Devtools-Kit?style=flat-square&logo=github&logoColor=white&labelColor=181717)](https://github.com/Pe0ny9-A/Devtools-Kit)

[⭐ Star](https://github.com/Pe0ny9-A/Devtools-Kit/stargazers) • [🍴 Fork](https://github.com/Pe0ny9-A/Devtools-Kit/network/members) • [🐛 Issues](https://github.com/Pe0ny9-A/Devtools-Kit/issues) • [💬 Discussions](https://github.com/Pe0ny9-A/Devtools-Kit/discussions)

[在线演示](https://pe0ny9-a.github.io/Devtools-Kit/) • [功能特性](#-功能特性) • [快速开始](#-快速开始) • [使用指南](#-使用指南) • [技术栈](#️-技术栈)

</div>

---

## ✨ 功能特性

DevToolsKit 是一个纯前端的零代码工具平台，集合了多种实用的开发工具，所有功能均在浏览器中运行，无需后端支持。
![IMG](https://github.com/Pe0ny9-A/Devtools-Kit/blob/main/screenshot/Screenshot.PNG)

### 🔌 API 测试工具
- 可视化HTTP请求构建器（支持GET/POST/PUT/DELETE等）
- 请求头、查询参数、请求体编辑器
- 响应查看器（格式化JSON、状态码、响应时间）
- 请求历史记录（本地存储）
- 自动生成API文档（Markdown格式）

### 🗄️ SQL 查询构建器
- 可视化表选择器
- 字段选择（支持多选）
- WHERE条件构建器（拖拽式）
- JOIN关系构建器
- GROUP BY / ORDER BY 配置
- 实时SQL预览和格式化

### 📝 表单构建器
- 拖拽式表单字段添加
- 支持多种字段类型（文本、数字、邮箱、日期、选择、多选、文件上传）
- 字段配置面板（标签、验证规则、必填等）
- 实时预览表单
- 表单数据收集和导出（CSV/JSON）

### 📄 Markdown 编辑器
- 分屏编辑（左侧编辑，右侧预览）
- 实时预览
- 支持Mermaid图表渲染
- 支持数学公式（KaTeX）
- 代码高亮
- 导出PDF/HTML

### 🔍 正则表达式工具
- 正则表达式输入和验证
- 测试字符串输入
- 实时匹配高亮
- 匹配结果列表（所有匹配项）
- 分组捕获显示
- 正则表达式解释
- 常用正则模板库
- 替换功能预览

### 🔄 JSON/CSV 转换工具
- JSON编辑器（格式化、验证）
- CSV编辑器（表格视图）
- JSON ↔ CSV 双向转换
- 数据验证和错误提示
- 大文件处理
- 数据预览和导出

### 🔐 编码/解码工具
- Base64 编码/解码
- URL 编码/解码
- 实时转换预览

### ⏰ 时间戳转换工具
- Unix 时间戳 ↔ 日期时间互转
- 支持秒级和毫秒级时间戳
- 时区转换

### 🆔 UUID/GUID 生成器
- 生成标准 UUID v4
- 批量生成
- 复制到剪贴板

### 🔒 哈希生成器
- 支持 MD5、SHA1、SHA256、SHA512
- 实时计算哈希值
- 文件哈希计算

### 🎨 颜色转换工具
- HEX ↔ RGB ↔ HSL 互转
- 颜色选择器
- 颜色预览

### 📱 二维码生成器
- 文本/URL 转二维码
- 自定义尺寸和容错级别
- 下载二维码图片

### 📊 文本差异对比
- 并排对比两个文本
- 高亮显示差异
- 支持代码和普通文本

### 💻 代码格式化工具
- 支持多种语言（JavaScript、TypeScript、JSON、CSS、SQL、HTML、Markdown等）
- 自动格式化
- 语法验证

## 🎨 设计特色

- **科技感UI**: 深色主题 + 渐变 + 玻璃态效果
- **现代化设计**: 响应式布局，支持移动端和桌面端
- **零依赖后端**: 完全在浏览器运行，无需服务器
- **TypeScript**: 类型安全，代码质量高
- **模块化设计**: 每个工具独立，易于维护和扩展

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

构建产物在 `dist` 目录

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
```

## 📖 使用指南

### API 测试工具

1. 选择HTTP方法（GET/POST等）
2. 输入API URL
3. 配置请求头、查询参数或请求体
4. 点击"发送"按钮
5. 查看响应结果
6. 可以保存请求到历史记录
7. 生成API文档

### SQL 查询构建器

1. 添加表名
2. 选择需要查询的字段
3. 添加WHERE条件
4. 配置JOIN关系（可选）
5. 设置排序规则（可选）
6. 实时查看生成的SQL
7. 格式化或复制SQL

### 表单构建器

1. 从左侧字段面板拖拽字段类型到画布
2. 点击字段进行配置（标签、占位符、必填等）
3. 实时预览表单效果
4. 填写表单收集数据
5. 导出表单配置或收集的数据

### Markdown 编辑器

1. 在左侧编辑器输入Markdown内容
2. 右侧实时预览效果
3. 使用工具栏快速插入格式
4. 支持Mermaid图表和数学公式
5. 导出为HTML或PDF

### 正则表达式工具

1. 输入正则表达式模式
2. 选择标志（g/i/m/s）
3. 输入测试字符串
4. 查看匹配结果和高亮
5. 查看分组捕获
6. 使用常用模板快速开始

### JSON/CSV 转换工具

1. 在JSON编辑器输入JSON数据
2. 或在CSV表格输入CSV数据
3. 点击"转换"按钮进行转换
4. 验证数据格式
5. 导出转换后的数据

## 🛠️ 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 下一代前端构建工具

### 主要依赖
- **Vue Router** - 官方路由管理器
- **Pinia** - Vue 状态管理库
- **Element Plus** - Vue 3 UI 组件库
- **Monaco Editor** - 代码编辑器（VS Code 编辑器核心）

### 功能库
- **marked** - Markdown 解析器
- **highlight.js** - 代码语法高亮
- **mermaid** - 图表和流程图
- **katex** - 数学公式渲染
- **papaparse** - CSV 解析
- **sql-formatter** - SQL 格式化
- **regexp-tree** - 正则表达式解析
- **qrcode** - 二维码生成
- **crypto-js** - 加密哈希算法
- **uuid** - UUID 生成
- **diff** - 文本差异对比
- **prettier** - 代码格式化

## 📁 项目结构

```
devtools-kit/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   └── styles/        # 全局样式
│   ├── components/        # 公共组件
│   │   ├── Layout/        # 布局组件
│   │   │   ├── AppHeader.vue
│   │   │   └── AppFooter.vue
│   │   ├── common/        # 通用组件
│   │   │   ├── CodeEditor.vue
│   │   │   └── ErrorBoundary.vue
│   │   └── ToolCard.vue
│   ├── views/             # 页面视图
│   │   ├── Home.vue       # 首页
│   │   ├── ApiTester/     # API 测试工具
│   │   ├── SqlBuilder/    # SQL 构建器
│   │   ├── FormBuilder/   # 表单构建器
│   │   ├── MarkdownEditor/ # Markdown 编辑器
│   │   ├── RegexTester/    # 正则表达式工具
│   │   ├── JsonConverter/  # JSON/CSV 转换
│   │   ├── Encoder/        # 编码/解码工具
│   │   ├── Timestamp/      # 时间戳转换
│   │   ├── UuidGenerator/  # UUID 生成器
│   │   ├── HashGenerator/  # 哈希生成器
│   │   ├── ColorConverter/ # 颜色转换
│   │   ├── QrCodeGenerator/ # 二维码生成
│   │   ├── TextDiff/       # 文本差异对比
│   │   └── CodeFormatter/  # 代码格式化
│   ├── stores/            # Pinia 状态管理
│   ├── utils/             # 工具函数
│   ├── types/             # TypeScript 类型定义
│   └── router/            # 路由配置
├── .github/
│   └── workflows/         # GitHub Actions
├── package.json
├── vite.config.ts
└── README.md
```


## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 Vue 3 Composition API 规范
- 使用 ESLint 进行代码检查
- 提交前运行 `npm run lint` 检查代码

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Mermaid](https://mermaid.js.org/)
- [KaTeX](https://katex.org/)

## 📧 联系方式

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Pe0ny9--A-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pe0ny9-A)
[![Email](https://img.shields.io/badge/Email-pikachu237325@163.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pikachu237325@163.com)

**开发者**: [Pe0ny9](https://github.com/Pe0ny9-A)  
**问题反馈**: [提交 Issue](https://github.com/Pe0ny9-A/Devtools-Kit/issues) • [参与讨论](https://github.com/Pe0ny9-A/Devtools-Kit/discussions)

</div>

---

<div align="center">

## ⭐ 如果这个项目对你有帮助，请给个 Star！

[![Star History Chart](https://api.star-history.com/svg?repos=Pe0ny9-A/Devtools-Kit&type=Date)](https://star-history.com/#Pe0ny9-A/Devtools-Kit&Date)

---

### 🌟 Star 这个项目

如果你觉得这个项目有用，请考虑：

- ⭐ **Star** 这个仓库
- 🍴 **Fork** 这个项目
- 🐛 提交 **Issue** 报告问题
- 💡 提交 **Pull Request** 贡献代码
- 📢 分享给其他开发者

---

Made with ❤️ by [Pe0ny9](https://github.com/Pe0ny9-A)

[![GitHub followers](https://img.shields.io/github/followers/Pe0ny9-A?label=Follow%20%40Pe0ny9-A&style=social)](https://github.com/Pe0ny9-A)

</div>

