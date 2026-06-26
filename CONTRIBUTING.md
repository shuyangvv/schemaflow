# Contributing to SchemaFlow

Thank you for your interest in contributing to SchemaFlow! This guide will help you get started.

## Development Philosophy

SchemaFlow follows **Spec-Driven Development (SDD)**. Every feature starts with a specification.

### Core Principles

1. **Spec First**: No code without specification
2. **Clean Architecture**: Business logic in domain layer
3. **Small Commits**: One logical change at a time
4. **Test Coverage**: Domain logic must be tested
5. **Documentation**: Specs live on as documentation

## Quick Start

### Prerequisites

- **Node.js**: >= 22.0.0 (LTS recommended)
- **pnpm**: >= 11.9.0
- **Git**

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:

```bash
# Install and use Node.js 22
nvm install 22
nvm use 22

# Enable corepack for pnpm
corepack enable
corepack prepare pnpm@11.9.0 --activate
```

### Setup

```bash
# 1. Fork and clone
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

Visit:
- Frontend: http://localhost:3000
- API: http://localhost:3001

## Development Workflow

### 1. Find or Create Issue

- Check [existing issues](https://github.com/schemaflow/schemaflow/issues)
- Create new issue with clear description
- Wait for maintainer to tag with `good first issue`, `help wanted`, etc.

### 2. Create Spec

Every contribution needs a spec:

```bash
./scripts/create-spec.sh my-feature 004
```

Edit `specs/004-my-feature/spec.md`:

```markdown
# Spec: My Feature

## Background
Why we need this.

## Goal
What we want.

## Requirements
...

## Acceptance Criteria
- [ ] Can do X
```

### 3. Get Approval

Before coding:

- Post spec in issue for review
- Address feedback
- Wait for maintainer approval

### 4. Design

Create `specs/004-my-feature/design.md`:

- Domain model
- API design
- Trade-offs explained

### 5. Break Into Tasks

Create `specs/004-my-feature/tasks.md`:

```markdown
# Tasks

## Task 1: Domain Layer
**Size**: M
**Depends on**: None

### Description
Implement entities.

### Files
- `packages/domain/src/Entity.ts`

### Acceptance Criteria
- [ ] Tests pass
```

### 6. Implement

Work through tasks one by one:

```bash
# Create feature branch
git checkout -b feat/my-feature

# Implement Task 1
git add .
git commit -m "feat(domain): add my-feature entities"

# Implement Task 2
git add .
git commit -m "feat(api): add my-feature endpoints"

# ... continue
```

### 7. Test

```bash
# Run all tests
pnpm test

# Run specific tests
pnpm test -- --grep "MyFeature"

# Check coverage
pnpm run test:coverage
```

### 8. Document

Update:
- `docs/architecture/` if design changed
- `docs/api/` if API changed
- `README.md` if usage changed

### 9. Submit PR

```bash
# Push branch
git push -u origin feat/my-feature

# Create PR
gh pr create --title "feat(scope): description" --body ""
```

PR template:

```markdown
## Summary
Brief description of changes.

## Spec
Closes: #[issue-number]

## Changes
- Change 1
- Change 2

## Testing
- [ ] Unit tests added
- [ ] Integration tests pass
- [ ] Manual testing done

## Checklist
- [ ] Spec reviewed
- [ ] Design reviewed
- [ ] Tests pass
- [ ] Documentation updated
```

## Code Standards

### Architecture

Follow Clean Architecture:

```
Domain ← Application ← Infrastructure ← Presentation
```

❌ Never put business logic in:
- React components
- Controllers
- Database queries

✅ Always put business logic in:
- Domain entities
- Domain services
- Use cases

### TypeScript

```typescript
// ✅ Good: Explicit types
function createSchema(input: CreateSchemaInput): Promise<Schema> {
  // implementation
}

// ❌ Bad: Implicit any
function createSchema(input) {
  // implementation
}
```

### Testing

```typescript
// Domain tests - pure logic
describe('Schema', () => {
  it('should reject invalid names', () => {
    expect(() => SchemaName.create('')).toThrow();
  });
});

// Use case tests - with mocks
describe('CreateSchemaUseCase', () => {
  it('should create schema with version', async () => {
    const mockRepo = { save: jest.fn() };
    const useCase = new CreateSchemaUseCase(mockRepo);
    // ...
  });
});
```

### Commit Messages

Follow [Conventional Commits](docs/architecture/05-commit-conventions.md):

```
feat(schema): add search functionality

- Search by name and description
- Case-insensitive matching
- Pagination support

Closes: #45
```

## Project Structure

```
schemaflow/
├── apps/
│   ├── web/              # React SPA
│   └── server/           # API server
├── packages/
│   └── shared/           # Shared utilities
├── specs/                # Feature specifications
├── rfcs/                 # Architecture decisions
├── docs/                 # Documentation
└── scripts/              # Development helpers
```

## Architecture Decisions

For significant changes, write an RFC:

```bash
./scripts/create-rfc.sh my-decision 0004
```

Example RFC:

```markdown
# RFC 0004: Use PostgreSQL for Production

**Status**: Draft

## Summary
Replace SQLite with PostgreSQL for production deployments.

## Motivation
SQLite doesn't support concurrent writes well.

## Design
- Keep SQLite for development
- Add PostgreSQL adapter
- Use Prisma for both

## Trade-offs
- More complex setup vs better concurrency
```

## Code Review

All code is reviewed before merge.

### What Reviewers Check

- [ ] Spec followed
- [ ] Architecture rules respected
- [ ] Tests included
- [ ] No breaking changes (or properly marked)
- [ ] Documentation updated

### Review Process

1. Automated checks (CI)
2. Maintainer review
3. Address feedback
4. Final approval
5. Merge

## Development Tips

### Use Cursor Agent Mode

The project includes Cursor prompts in `docs/guides/04-cursor-prompts.md`.

Example:

```
@architect Design the domain model for my-feature
        based on specs/004-my-feature/spec.md
```

### Small Changes

- Max 10 files per PR
- Max 300 lines changed
- One logical change at a time

### Ask Questions

Not sure about something?

- Comment on issue
- Ask in PR
- Start discussion

Better to ask than guess!

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Added as co-authors on commits (when applicable)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement

Violations can be reported to maintainers.
Consequences range from warning to permanent ban.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

- Read [docs/guides/](docs/guides/)
- Check [rfcs/](rfcs/)
- Open [GitHub Discussion](https://github.com/schemaflow/schemaflow/discussions)

Thank you for contributing!
