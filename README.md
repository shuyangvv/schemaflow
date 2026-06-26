# SchemaFlow

[English](#english) | [中文](#中文)

---

<a name="english"></a>
## English

Dynamic Form Schema Lifecycle Platform

> **Built with Spec-Driven Development** - See our [Specs](#specifications) and [RFCs](#architecture-decisions)

### Vision

SchemaFlow aims to become a **complete DevOps platform for dynamic forms**, providing seamless integration with industry-leading form solutions including [Formily](https://github.com/alibaba/formily), [FormRender](https://github.com/alibaba/x-render), and other major dynamic form frameworks.

Our ultimate goal is to bridge the gap between form design and development, enabling teams to manage form schemas through their entire lifecycle with enterprise-grade tooling.

### What is SchemaFlow?

SchemaFlow is NOT a low-code form builder. It is a platform for managing JSON Schema through its entire lifecycle:

- **Schema Registry**: Centralized storage for form schemas
- **Version Management**: Immutable history with full traceability
- **Diff Engine**: Compare versions and detect breaking changes
- **Release Management**: Tag stable versions for production
- **Rollback**: Revert to any previous version when needed

### Quick Start

#### Prerequisites

- **Node.js**: >= 22.0.0 (LTS recommended)
- **pnpm**: >= 11.9.0

We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage Node.js versions:

```bash
# Install and use Node.js 22
nvm install 22
nvm use 22

# Enable corepack for pnpm
corepack enable
corepack prepare pnpm@11.9.0 --activate
```

#### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/schemaflow.git
cd schemaflow

# Install dependencies
pnpm install

# Setup database
cd apps/server && pnpm db:migrate && cd ../..

# Start development
pnpm dev
```

Or use the helper script:

```bash
./scripts/dev.sh start
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **API Health**: http://localhost:3001/health

### Documentation

#### Getting Started

- [Getting Started](docs/guides/01-getting-started.md) - Setup and first steps
- [Development Workflow](docs/guides/02-development-workflow.md) - How we work
- [Spec-Driven Development](docs/guides/03-spec-driven-development.md) - Our methodology
- [Cursor Prompts](docs/guides/04-cursor-prompts.md) - AI-assisted development

#### Architecture

- [Overview](docs/architecture/01-overview.md) - System architecture
- [Domain Model](docs/architecture/02-domain-model.md) - Entities and relationships
- [API Design](docs/architecture/03-api-design.md) - REST API specification
- [Sequence Diagrams](docs/architecture/04-sequence-diagrams.md) - Data flows
- [Commit Conventions](docs/architecture/05-commit-conventions.md) - Git workflow

#### Contributing

- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Roadmap](ROADMAP.md) - Future plans
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards

### Project Structure

```
schemaflow/
├── .cursor/                    # Cursor configuration
│   ├── rules/                  # Coding standards & architecture
│   │   ├── architecture.md
│   │   ├── coding.md
│   │   ├── commit.md
│   │   └── release.md
│   ├── agents/                 # AI agent definitions
│   │   ├── architect.md
│   │   ├── planner.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   └── reviewer.md
│   └── templates/              # Document templates
│
├── apps/                       # Applications
│   ├── server/                 # Backend API (Express + Prisma)
│   └── web/                    # Frontend SPA (React + Vite)
│
├── packages/                   # Shared packages
│   └── (future: domain, diff-engine, etc.)
│
├── specs/                      # Feature specifications
│   ├── 000-schema-registry/
│   ├── 001-version-management/
│   ├── 002-diff-engine/
│   └── 003-release-management/
│
├── rfcs/                       # Architecture decisions
│   ├── 0001-domain-model.md
│   ├── 0002-version-strategy.md
│   └── 0003-diff-algorithm.md
│
├── docs/                       # Documentation
│   ├── architecture/
│   └── guides/
│
├── scripts/                    # Development helpers
│   ├── dev.sh
│   ├── create-spec.sh
│   └── test-api.sh
│
├── cursor-rules.md             # Project-level Cursor rules
├── README.md                   # This file
├── CONTRIBUTING.md             # Contribution guide
├── ROADMAP.md                  # Future plans
└── LICENSE                     # MIT License
```

### Specifications

Every feature has a complete specification:

| Spec | Feature | Status |
|------|---------|--------|
| [000](specs/000-schema-registry/) | Schema Registry | ✅ Implemented |
| [001](specs/001-version-management/) | Version Management | ✅ Implemented |
| [002](specs/002-diff-engine/) | Diff Engine | ✅ Implemented |
| [003](specs/003-release-management/) | Release Management | ✅ Implemented |

Each spec contains:
- `spec.md` - Requirements
- `design.md` - Architecture
- `tasks.md` - Implementation plan
- `review.md` - Code review

### Architecture Decisions

| RFC | Topic | Status |
|-----|-------|--------|
| [0001](rfcs/0001-domain-model.md) | Domain Model | Accepted |
| [0002](rfcs/0002-version-strategy.md) | Version Strategy | Accepted |
| [0003](rfcs/0003-diff-algorithm.md) | Diff Algorithm | Accepted |

### API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/schemas` | Create schema (auto-creates v1) |
| GET | `/api/schemas` | List schemas |
| GET | `/api/schemas/:id` | Get schema detail |
| PUT | `/api/schemas/:id` | Update metadata |
| DELETE | `/api/schemas/:id` | Delete schema |
| POST | `/api/schemas/:id/versions` | Create new version |
| GET | `/api/schemas/:id/versions` | List versions |
| POST | `/api/schemas/:id/rollback` | Rollback to version |
| GET | `/api/schemas/:id/diff` | Compare versions |
| POST | `/api/versions/:id/releases` | Create release |
| GET | `/api/releases` | List releases |

### Development Workflow

We follow **Spec-Driven Development (SDD)**:

```
Step 1: Write Spec (specs/)
        ↓
Step 2: Design Architecture (design.md)
        ↓
Step 3: Create Tasks (tasks.md)
        ↓
Step 4: Implement ONE Task
        ↓
Step 5: Review Code
        ↓
Step 6: Commit
        ↓
Continue to next Task
```

#### Creating New Features

```bash
# 1. Create new spec
./scripts/create-spec.sh my-feature 004

# 2. Edit spec.md, design.md

# 3. Generate tasks
# (Use Cursor with @planner agent)

# 4. Implement tasks one by one
# (Use Cursor with @backend/@frontend agents)

# 5. Review
# (Use Cursor with @reviewer agent)
```

#### Cursor Prompts

The project includes ready-to-use Cursor prompts:

```
@architect Design domain model for my-feature
@planner Create implementation tasks
@reviewer Review current implementation
```

See [Cursor Prompts Guide](docs/guides/04-cursor-prompts.md) for all prompts.

### Tech Stack

#### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (Prisma ORM)
- **Package Manager**: pnpm
- **Testing**: Jest (planned)

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

#### Monorepo
- **Package Manager**: pnpm workspaces
- **Structure**: apps/ + packages/

### Scripts

#### Helper Scripts

| Command | Description |
|---------|-------------|
| `./scripts/dev.sh start` | Start development servers |
| `./scripts/dev.sh db:reset` | Reset database |
| `./scripts/dev.sh test` | Run tests |
| `./scripts/dev.sh clean` | Clean node_modules and build outputs |
| `./scripts/create-spec.sh name 004` | Create new spec |
| `./scripts/test-api.sh` | Test API endpoints |

#### pnpm Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start all development servers |
| `pnpm dev:server` | Start only backend |
| `pnpm dev:web` | Start only frontend |
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm lint` | Run all linters |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |

### Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup
- Coding standards
- Pull request process
- Community guidelines

### Roadmap

See [ROADMAP.md](ROADMAP.md) for:

- Current milestone (MVP)
- Upcoming features
- Future plans

### License

MIT License - see [LICENSE](LICENSE) file.

### Acknowledgments

Built with:
- [Cursor](https://cursor.sh/) - AI-first IDE
- [Spec-Driven Development](docs/guides/03-spec-driven-development.md) methodology
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles

---

<a name="中文"></a>
## 中文

动态表单 Schema 生命周期管理平台

> **基于规范驱动开发 (SDD)** - 查看我们的[规范](#规范)和[RFC](#架构决策)

### 愿景

SchemaFlow 致力于成为一个**完整的动态表单 DevOps 平台**，无缝对接业界领先的表单解决方案，包括 [Formily](https://github.com/alibaba/formily)、[FormRender](https://github.com/alibaba/x-render) 以及其他主流动态表单框架。

我们的终极目标是弥合表单设计与开发之间的鸿沟，让团队能够通过企业级工具管理表单 Schema 的完整生命周期。

### 什么是 SchemaFlow？

SchemaFlow **不是**低代码表单构建器。它是一个管理 JSON Schema 完整生命周期的平台：

- **Schema 注册中心**: 表单 Schema 的集中存储
- **版本管理**: 不可变历史记录，全程可追溯
- **差异引擎**: 比较版本并检测破坏性变更
- **发布管理**: 为生产环境标记稳定版本
- **回滚**: 随时回退到任意历史版本

### 快速开始

#### 前置条件

- **Node.js**: >= 22.0.0（推荐 LTS 版本）
- **pnpm**: >= 11.9.0

我们推荐使用 [nvm](https://github.com/nvm-sh/nvm)（Node 版本管理器）来管理 Node.js 版本：

```bash
# 安装并使用 Node.js 22
nvm install 22
nvm use 22

# 启用 corepack 安装 pnpm
corepack enable
corepack prepare pnpm@11.9.0 --activate
```

#### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/schemaflow.git
cd schemaflow

# 安装依赖
pnpm install

# 设置数据库
cd apps/server && pnpm db:migrate && cd ../..

# 启动开发环境
pnpm dev
```

或使用辅助脚本：

```bash
./scripts/dev.sh start
```

服务将运行在：
- **前端**: http://localhost:3000
- **API**: http://localhost:3001
- **API 健康检查**: http://localhost:3001/health

### 文档

#### 入门指南

- [入门指南](docs/guides/01-getting-started.md) - 安装和第一步
- [开发工作流](docs/guides/02-development-workflow.md) - 我们的工作方式
- [规范驱动开发](docs/guides/03-spec-driven-development.md) - 我们的方法论
- [Cursor 提示词](docs/guides/04-cursor-prompts.md) - AI 辅助开发

#### 架构

- [概述](docs/architecture/01-overview.md) - 系统架构
- [领域模型](docs/architecture/02-domain-model.md) - 实体和关系
- [API 设计](docs/architecture/03-api-design.md) - REST API 规范
- [时序图](docs/architecture/04-sequence-diagrams.md) - 数据流
- [提交规范](docs/architecture/05-commit-conventions.md) - Git 工作流

#### 贡献

- [贡献指南](CONTRIBUTING.md) - 如何贡献
- [路线图](ROADMAP.md) - 未来计划
- [行为准则](CODE_OF_CONDUCT.md) - 社区规范

### 项目结构

```
schemaflow/
├── .cursor/                    # Cursor 配置
│   ├── rules/                  # 编码标准和架构
│   │   ├── architecture.md
│   │   ├── coding.md
│   │   ├── commit.md
│   │   └── release.md
│   ├── agents/                 # AI 代理定义
│   │   ├── architect.md
│   │   ├── planner.md
│   │   ├── backend.md
│   │   ├── frontend.md
│   │   └── reviewer.md
│   └── templates/              # 文档模板
│
├── apps/                       # 应用
│   ├── server/                 # 后端 API (Express + Prisma)
│   └── web/                    # 前端 SPA (React + Vite)
│
├── packages/                   # 共享包
│   └── (future: domain, diff-engine, etc.)
│
├── specs/                      # 功能规范
│   ├── 000-schema-registry/
│   ├── 001-version-management/
│   ├── 002-diff-engine/
│   └── 003-release-management/
│
├── rfcs/                       # 架构决策
│   ├── 0001-domain-model.md
│   ├── 0002-version-strategy.md
│   └── 0003-diff-algorithm.md
│
├── docs/                       # 文档
│   ├── architecture/
│   └── guides/
│
├── scripts/                    # 开发辅助脚本
│   ├── dev.sh
│   ├── create-spec.sh
│   └── test-api.sh
│
├── cursor-rules.md             # 项目级 Cursor 规则
├── README.md                   # 本文件
├── CONTRIBUTING.md             # 贡献指南
├── ROADMAP.md                  # 未来计划
└── LICENSE                     # MIT 许可证
```

### 规范

每个功能都有完整的规范：

| 规范 | 功能 | 状态 |
|------|------|------|
| [000](specs/000-schema-registry/) | Schema 注册中心 | ✅ 已实现 |
| [001](specs/001-version-management/) | 版本管理 | ✅ 已实现 |
| [002](specs/002-diff-engine/) | 差异引擎 | ✅ 已实现 |
| [003](specs/003-release-management/) | 发布管理 | ✅ 已实现 |

每个规范包含：
- `spec.md` - 需求
- `design.md` - 架构
- `tasks.md` - 实现计划
- `review.md` - 代码审查

### 架构决策

| RFC | 主题 | 状态 |
|-----|------|------|
| [0001](rfcs/0001-domain-model.md) | 领域模型 | 已接受 |
| [0002](rfcs/0002-version-strategy.md) | 版本策略 | 已接受 |
| [0003](rfcs/0003-diff-algorithm.md) | 差异算法 | 已接受 |

### API

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/schemas` | 创建 Schema（自动创建 v1） |
| GET | `/api/schemas` | 列出所有 Schema |
| GET | `/api/schemas/:id` | 获取 Schema 详情 |
| PUT | `/api/schemas/:id` | 更新元数据 |
| DELETE | `/api/schemas/:id` | 删除 Schema |
| POST | `/api/schemas/:id/versions` | 创建新版本 |
| GET | `/api/schemas/:id/versions` | 列出所有版本 |
| POST | `/api/schemas/:id/rollback` | 回滚到指定版本 |
| GET | `/api/schemas/:id/diff` | 比较版本 |
| POST | `/api/versions/:id/releases` | 创建发布 |
| GET | `/api/releases` | 列出所有发布 |

### 开发工作流

我们遵循**规范驱动开发 (SDD)**：

```
第1步：编写规范 (specs/)
        ↓
第2步：设计架构 (design.md)
        ↓
第3步：创建任务 (tasks.md)
        ↓
第4步：实现单个任务
        ↓
第5步：代码审查
        ↓
第6步：提交
        ↓
继续下一个任务
```

#### 创建新功能

```bash
# 1. 创建新规范
./scripts/create-spec.sh my-feature 004

# 2. 编辑 spec.md, design.md

# 3. 生成任务
# （使用 Cursor @planner 代理）

# 4. 逐个实现任务
# （使用 Cursor @backend/@frontend 代理）

# 5. 审查
# （使用 Cursor @reviewer 代理）
```

#### Cursor 提示词

项目包含即开即用的 Cursor 提示词：

```
@architect Design domain model for my-feature
@planner Create implementation tasks
@reviewer Review current implementation
```

查看 [Cursor 提示词指南](docs/guides/04-cursor-prompts.md) 获取所有提示词。

### 技术栈

#### 后端
- **运行时**: Node.js 18+
- **框架**: Express.js
- **语言**: TypeScript
- **数据库**: SQLite (Prisma ORM)
- **包管理器**: pnpm
- **测试**: Jest (计划中)

#### 前端
- **框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **HTTP 客户端**: Axios

#### 单体仓库
- **包管理器**: pnpm workspaces
- **结构**: apps/ + packages/

### 脚本

#### 辅助脚本

| 命令 | 描述 |
|------|------|
| `./scripts/dev.sh start` | 启动开发服务器 |
| `./scripts/dev.sh db:reset` | 重置数据库 |
| `./scripts/dev.sh test` | 运行测试 |
| `./scripts/dev.sh clean` | 清理 node_modules 和构建输出 |
| `./scripts/create-spec.sh name 004` | 创建新规范 |
| `./scripts/test-api.sh` | 测试 API 端点 |

#### pnpm 命令

| 命令 | 描述 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm dev` | 启动所有开发服务器 |
| `pnpm dev:server` | 仅启动后端 |
| `pnpm dev:web` | 仅启动前端 |
| `pnpm build` | 构建所有包 |
| `pnpm test` | 运行所有测试 |
| `pnpm lint` | 运行所有检查器 |
| `pnpm db:migrate` | 运行数据库迁移 |
| `pnpm db:studio` | 打开 Prisma Studio |

### 欢迎贡献

我们热忱欢迎开发者的加入！无论您是修复 bug、添加新功能，还是改进文档，您的贡献都将让 SchemaFlow 变得更好。

查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解：

- 开发环境搭建
- 编码标准
- 代码审查流程
- 社区规范

### 路线图

查看 [ROADMAP.md](ROADMAP.md) 了解：

- 当前里程碑 (MVP)
- 即将推出的功能
- 未来计划

### 许可证

MIT 许可证 - 查看 [LICENSE](LICENSE) 文件。

### 致谢

基于以下技术构建：
- [Cursor](https://cursor.sh/) - AI 优先的 IDE
- [规范驱动开发](docs/guides/03-spec-driven-development.md) 方法论
- [整洁架构](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) 原则

---

**SchemaFlow** - Schema 管理，本该如此。
