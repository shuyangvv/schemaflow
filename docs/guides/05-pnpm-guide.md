# pnpm 使用指南

SchemaFlow 使用 [pnpm](https://pnpm.io/) 作为包管理器。

## 为什么选择 pnpm？

| 特性 | pnpm | npm | yarn |
|------|------|-----|------|
| 磁盘效率 | ⭐⭐⭐ (内容寻址存储) | ⭐ (每个项目复制) | ⭐⭐ (缓存) |
| 安装速度 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| 严格依赖 | ⭐⭐⭐ (默认) | ⭐ (平坦) | ⭐⭐ |
| Monorepo | ⭐⭐⭐ (原生) | ⭐ (7+) | ⭐⭐ |
| 兼容性 | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

## 安装 pnpm

### 通过 npm (推荐)

```bash
npm install -g pnpm
```

### 通过 Homebrew (macOS)

```bash
brew install pnpm
```

### 通过 Corepack (Node.js >= 16.10)

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 通过脚本 (Linux/macOS)

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 验证安装

```bash
pnpm --version
# 应输出 >= 8.0.0
```

## 常用命令对照

| npm 命令 | pnpm 等效命令 | 说明 |
|----------|---------------|------|
| `npm install` | `pnpm install` | 安装所有依赖 |
| `npm install pkg` | `pnpm add pkg` | 添加生产依赖 |
| `npm install -D pkg` | `pnpm add -D pkg` | 添加开发依赖 |
| `npm run dev` | `pnpm dev` | 运行脚本 (可省略 `run`) |
| `npm test` | `pnpm test` | 运行测试 |
| `npx cmd` | `pnpm cmd` | 执行包内命令 |
| `npm uninstall pkg` | `pnpm remove pkg` | 移除依赖 |
| `npm update` | `pnpm update` | 更新依赖 |
| `npm ci` | `pnpm install --frozen-lockfile` | CI 安装 |

## Monorepo 命令

### 运行所有包的脚本

```bash
# 在所有包中运行 build
pnpm -r build

# 并行运行 (更快)
pnpm --parallel dev
```

### 运行特定包的脚本

```bash
# 在 server 包中运行 dev
pnpm --filter @schemaflow/server dev

# 在 web 包中运行 build
pnpm --filter @schemaflow/web build
```

### 添加依赖到特定包

```bash
# 添加依赖到 server
pnpm --filter @schemaflow/server add express

# 添加开发依赖到 web
pnpm --filter @schemaflow/web add -D @types/react
```

## 工作区配置

SchemaFlow 使用 pnpm workspaces，配置在 `pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 工作区命令

```bash
# 列出工作区包
pnpm recursive list

# 在工作区中添加依赖
pnpm add lodash -w  # -w = workspace root

# 在所有包中添加依赖
pnpm add typescript -r  # -r = recursive
```

## 别名 (Shortcuts)

pnpm 会自动创建以下快捷方式:

```bash
# 不需要指定包名，pnpm 知道在哪里运行
pnpm dev          # 在所有包中运行 dev (并行)
pnpm dev:server   # 仅运行 server 的 dev
pnpm dev:web      # 仅运行 web 的 dev
pnpm build        # 在所有包中运行 build
```

根目录 `package.json` 中定义的 scripts:

```json
{
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "dev:server": "pnpm --filter @schemaflow/server dev",
    "dev:web": "pnpm --filter @schemaflow/web dev",
    "build": "pnpm -r build"
  }
}
```

## 故障排除

### 安装失败

```bash
# 清除缓存
pnpm store prune

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 权限问题

```bash
# 如果全局安装失败
pnpm config set store-dir ~/.pnpm-store
```

### 包找不到

```bash
# 重新生成 lock 文件
rm pnpm-lock.yaml
pnpm install
```

### 与 npm 混合使用

❌ 不要混用 npm 和 pnpm:
```bash
# 不要这样做！
npm install    # 创建 package-lock.json
pnpm install   # 会报错
```

✅ 统一使用 pnpm:
```bash
# 正确做法
pnpm install
```

## 从 npm 迁移到 pnpm

```bash
# 1. 删除 npm 相关文件
rm -rf node_modules package-lock.json

# 2. 安装 pnpm (如果还没安装)
npm install -g pnpm

# 3. 安装依赖
pnpm install

# 4. 验证
pnpm dev
```

## 高级特性

### 内容寻址存储

pnpm 将所有包存储在全局内容寻址仓库中 (~/.pnpm-store):

- 同一包的不同版本只存储差异
- 不同项目共享相同的包内容
- 节省大量磁盘空间

### 严格的 node_modules

pnpm 创建非扁平的 node_modules:

```
node_modules/
├── .pnpm/           # 实际存储位置
│   └── ...
├── express -> .pnpm/express@4.18.2/node_modules/express
└── lodash -> .pnpm/lodash@4.17.21/node_modules/lodash
```

优点:
- 只能访问显式声明的依赖
- 避免 "幽灵依赖" 问题
- 更严格的依赖管理

### 钩子

`.npmrc` 中的 pnpm 配置:

```
# 严格引擎检查
engine-strict=true

# hoisting 模式
shamefully-hoist=true
```

## 资源

- [pnpm 文档](https://pnpm.io/motivation)
- [pnpm vs npm](https://pnpm.io/npm)
- [pnpm 工作区](https://pnpm.io/workspaces)

## 快速参考卡

```bash
# 基础
pnpm install                    # 安装所有
pnpm add pkg                    # 添加依赖
pnpm add -D pkg                 # 添加开发依赖
pnpm remove pkg                 # 移除依赖
pnpm update                     # 更新所有

# 脚本
pnpm dev                        # 运行 dev (所有包并行)
pnpm build                      # 运行 build (所有包)
pnpm test                       # 运行测试

# 特定包
pnpm --filter @schemaflow/server dev
pnpm --filter @schemaflow/web build

# 工作区
pnpm -r build                   # 递归执行
pnpm --parallel dev            # 并行执行

# 其他
pnpm store prune                # 清理缓存
pnpm list                       # 列出已安装
pnpm why pkg                    # 为什么需要某包
```
