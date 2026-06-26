# Getting Started

## Prerequisites

- Node.js >= 18
- pnpm >= 8.0.0
- Git

### Installing pnpm

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using corepack (Node.js >= 16.10)
corepack enable
corepack prepare pnpm@latest --activate
```

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/schemaflow.git
cd schemaflow

# 2. Install dependencies
pnpm install

# 3. Setup database
cd apps/server
pnpm db:migrate
pnpm db:generate
cd ../..

# 4. Start development
pnpm dev
```

Or use the helper script:

```bash
./scripts/dev.sh start
```

Services will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health

## Development Scripts

### pnpm Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start both frontend and backend |
| `pnpm dev:server` | Start only backend |
| `pnpm dev:web` | Start only frontend |
| `pnpm build` | Build for production |
| `pnpm test` | Run all tests |
| `pnpm lint` | Run all linters |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm clean` | Clean node_modules and build outputs |

### Helper Scripts

| Command | Description |
|---------|-------------|
| `./scripts/dev.sh start` | Alternative dev start |
| `./scripts/dev.sh db:reset` | Reset database |
| `./scripts/dev.sh clean` | Clean all artifacts |
| `./scripts/test-api.sh` | Run API integration tests |

## Project Structure

```
schemaflow/
├── apps/                    # Applications
│   ├── web/                 # React SPA
│   └── server/              # API Server
├── packages/                # Shared packages
│   └── shared/              # Common utilities
├── docs/                    # Documentation
├── specs/                   # Feature specifications
├── rfcs/                    # Architecture decisions
├── scripts/                 # Development helpers
└── cursor-rules.md          # Project rules
```

## Next Steps

1. Read [Architecture Overview](../architecture/01-overview.md)
2. Review [Domain Model](../architecture/02-domain-model.md)
3. Check [API Design](../architecture/03-api-design.md)
4. Learn [Development Workflow](./02-development-workflow.md)
5. Understand [Spec-Driven Development](./03-spec-driven-development.md)

## Troubleshooting

### Port already in use

If port 3000 or 3001 is already in use:

```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# Or use different ports in .env
```

### Database issues

```bash
# Reset database completely
./scripts/dev.sh db:reset

# Or manually
cd apps/server
rm dev.db dev.db-journal 2>/dev/null
pnpm db:migrate
```

### Node modules issues

```bash
# Clean install
pnpm clean
pnpm install
```

### pnpm issues

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Environment Variables

Create `.env.local` files if needed:

**apps/server/.env.local:**
```
DATABASE_URL="file:./dev.db"
PORT=3001
```

**apps/web/.env.local:**
```
VITE_API_URL=http://localhost:3001/api
```
