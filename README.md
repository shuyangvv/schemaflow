# SchemaFlow

Dynamic Form Schema Lifecycle Platform

> **Built with Spec-Driven Development** - See our [Specs](#specifications) and [RFCs](#architecture-decisions)

## What is SchemaFlow?

SchemaFlow is NOT a low-code form builder. It is a platform for managing JSON Schema through its entire lifecycle:

- **Schema Registry**: Centralized storage for form schemas
- **Version Management**: Immutable history with full traceability
- **Diff Engine**: Compare versions and detect breaking changes
- **Release Management**: Tag stable versions for production
- **Rollback**: Revert to any previous version when needed

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm >= 8.0.0 (install via `npm install -g pnpm`)

### Setup

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

## Documentation

### Getting Started

- [Getting Started](docs/guides/01-getting-started.md) - Setup and first steps
- [Development Workflow](docs/guides/02-development-workflow.md) - How we work
- [Spec-Driven Development](docs/guides/03-spec-driven-development.md) - Our methodology
- [Cursor Prompts](docs/guides/04-cursor-prompts.md) - AI-assisted development

### Architecture

- [Overview](docs/architecture/01-overview.md) - System architecture
- [Domain Model](docs/architecture/02-domain-model.md) - Entities and relationships
- [API Design](docs/architecture/03-api-design.md) - REST API specification
- [Sequence Diagrams](docs/architecture/04-sequence-diagrams.md) - Data flows
- [Commit Conventions](docs/architecture/05-commit-conventions.md) - Git workflow

### Contributing

- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Roadmap](ROADMAP.md) - Future plans
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community standards

## Project Structure

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

## Specifications

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

## Architecture Decisions

| RFC | Topic | Status |
|-----|-------|--------|
| [0001](rfcs/0001-domain-model.md) | Domain Model | Accepted |
| [0002](rfcs/0002-version-strategy.md) | Version Strategy | Accepted |
| [0003](rfcs/0003-diff-algorithm.md) | Diff Algorithm | Accepted |

## API

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

## Development Workflow

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

### Creating New Features

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

### Cursor Prompts

The project includes ready-to-use Cursor prompts:

```
@architect Design domain model for my-feature
@planner Create implementation tasks
@reviewer Review current implementation
```

See [Cursor Prompts Guide](docs/guides/04-cursor-prompts.md) for all prompts.

## Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (Prisma ORM)
- **Package Manager**: pnpm
- **Testing**: Jest (planned)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Monorepo
- **Package Manager**: pnpm workspaces
- **Structure**: apps/ + packages/

## Scripts

### Helper Scripts

| Command | Description |
|---------|-------------|
| `./scripts/dev.sh start` | Start development servers |
| `./scripts/dev.sh db:reset` | Reset database |
| `./scripts/dev.sh test` | Run tests |
| `./scripts/dev.sh clean` | Clean node_modules and build outputs |
| `./scripts/create-spec.sh name 004` | Create new spec |
| `./scripts/test-api.sh` | Test API endpoints |

### pnpm Commands

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

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Development setup
- Coding standards
- Pull request process
- Community guidelines

## Roadmap

See [ROADMAP.md](ROADMAP.md) for:

- Current milestone (MVP)
- Upcoming features
- Future plans

## License

MIT License - see [LICENSE](LICENSE) file.

## Acknowledgments

Built with:
- [Cursor](https://cursor.sh/) - AI-first IDE
- [Spec-Driven Development](docs/guides/03-spec-driven-development.md) methodology
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) principles

---

**SchemaFlow** - Schema management done right.
