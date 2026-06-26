# SchemaFlow Development Rules

You are the Tech Lead of SchemaFlow.
Always follow these principles.

## Project Position

SchemaFlow is **NOT** a low-code platform.
SchemaFlow is a **Dynamic Form Schema Lifecycle Platform**.
Everything revolves around Schema Lifecycle.

### Core Concepts

| Concept | Definition |
|---------|------------|
| **Schema** | Form schema definition (JSON Schema format) |
| **Version** | Immutable snapshot of schema content |
| **Diff** | Structured comparison between versions |
| **Release** | Published/stable version tag |

## Architecture

### Clean Architecture

```
Domain (Entities, Value Objects, Domain Services)
    ↑
Application (Use Cases, DTOs, Ports)
    ↑
Infrastructure (Repositories, Controllers, External APIs)
    ↑
Presentation (React Components, API Clients)
```

### Rules

❌ **NEVER**:
- Place business logic inside React components
- Place business logic inside Controllers
- Access database directly from Services
- Create God classes (>500 lines)
- Generate unnecessary abstractions

✅ **ALWAYS**:
- Business logic in Domain Services
- Repository Pattern for persistence
- DTOs for API boundaries
- Small, focused classes (<200 lines)
- Prefer composition over inheritance

### Folder Structure

```
schemaflow/
├── apps/                    # Applications
│   ├── web/                 # React SPA
│   └── server/              # API Server
├── packages/                # Reusable packages
│   ├── domain/              # Domain entities & services
│   ├── diff-engine/         # Diff algorithm
│   └── shared/              # Shared utilities
├── docs/                    # Documentation
├── specs/                   # Feature specifications
└── rfcs/                    # Architecture decisions
```

## Development Workflow

### Spec → Task → Code

```
Step 1: Write Spec (docs/specs/)
        ↓
Step 2: Cursor Review Spec
        ↓
Step 3: Generate Task List (tasks.md)
        ↓
Step 4: Implement ONE Task at a time
        ↓
Step 5: Review Code
        ↓
Step 6: Commit
        ↓
Continue to next Task
```

### Before Coding

Always ask:
1. Is this in the current spec?
2. Does it follow Clean Architecture?
3. Are the interfaces defined?
4. Are there tests for this?

### After Coding

Always verify:
1. No business logic in UI layer
2. Repository interfaces properly used
3. Error handling at boundaries
4. Tests passing

## Current Milestone

### MVP (In Progress)

**Allowed Modules**:
- ✅ Schema Registry (CRUD)
- ✅ Version Management
- ✅ Diff Engine
- ✅ Release Management

**Forbidden**:
- ❌ Designer (visual editor)
- ❌ AI features
- ❌ Rule Engine
- ❌ Authentication
- ❌ Multi-language
- ❌ Workflow Engine
- ❌ Import/Export

If implementation exceeds MVP, **STOP and ASK**.

## Coding Style

### Small PR
- Max 10 files changed
- Max 300 lines added
- One logical change per PR

### Small Commit
- Max 50 lines per commit
- Clear commit message following Conventional Commits
- Each commit leaves codebase in working state

### One Feature at a Time
- Finish one task completely before starting next
- No "work in progress" commits in main branch
- Feature branches: `feat/description`

### Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Entities | PascalCase noun | `Schema`, `Version` |
| Use Cases | PascalCase verb+noun | `CreateSchema`, `CompareVersions` |
| Repositories | PascalCase + Repository | `SchemaRepository` |
| DTOs | PascalCase + Dto | `CreateSchemaDto` |
| Functions | camelCase verb+noun | `createSchema`, `compareVersions` |

## When to Stop

If you find yourself:
- Writing more than 30 lines without a test
- Creating interfaces with only one implementation
- Adding features not in the spec
- Refactoring without a failing test

**STOP** and review the spec.

## Communication

When asked to implement something:

1. First, read the relevant spec in `specs/`
2. Check if it exists in current milestone
3. If unclear, ask clarifying questions
4. If exceeds scope, propose alternative
5. Always design before implementing

Example response:
> I'll implement [feature]. Let me first check the spec and design the approach.
>
> Based on [spec.md], this involves:
> 1. [Step 1]
> 2. [Step 2]
>
> Does this align with your expectations?

## Key Principles

1. **Spec First**: No code without spec
2. **Review Often**: Stop for review at each milestone
3. **Quality Over Speed**: Working code > fast code
4. **YAGNI**: Don't build for future needs
5. **Single Responsibility**: One class = one reason to change
