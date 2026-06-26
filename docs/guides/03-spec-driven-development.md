# Spec-Driven Development (SDD)

## What is SDD?

Spec-Driven Development means **every feature starts with a specification**.

No code is written before the spec exists and is reviewed.

## Why SDD?

### Without SDD

```
"Build a form builder"
    ↓
[Write lots of code]
    ↓
"This isn't what I wanted"
    ↓
[Rewrite everything]
```

### With SDD

```
"Build a form builder"
    ↓
[Write 500 words of spec]
    ↓
"This is what I want"
    ↓
[Write focused code]
    ↓
[Ship it]
```

## The SDD Mindset

### Before SDD
- Jump into coding
- Figure out requirements as you go
- Discover edge cases late
- Rewrite frequently

### After SDD
- Understand requirements first
- Design architecture next
- Break into small tasks
- Implement with confidence

## Spec Documents

### Spec Structure

```
specs/
  004-feature-name/
    ├── spec.md     ← Requirements
    ├── design.md   ← Architecture
    ├── tasks.md    ← Implementation plan
    └── review.md   ← Code review
```

### spec.md - Requirements

**Purpose**: Define WHAT we are building

**Sections**:
- Background - Why we need this
- Goal - What we want to achieve
- Requirements - Specific features
- Out of Scope - What's NOT included
- Acceptance Criteria - How to verify

**Example**:

```markdown
# Spec: Schema Registry

## Background
We need to store and manage JSON Schema definitions.

## Goal
Centralized storage with CRUD operations.

## Requirements

### Functional
1. **Create Schema**
   - Accept name, description, content
   - Validate name format
   - Auto-create version 1

2. **List Schemas**
   - Paginated results
   - Search by name/description
   - Show version count

### Non-Functional
- Response time < 100ms
- Support 10,000+ schemas

## Out of Scope
- Schema templates
- Import/export
- Multi-tenancy

## Acceptance Criteria
- [ ] Can create schema with valid data
- [ ] Auto-creates version 1
- [ ] Can list with pagination
- [ ] Can search and filter
```

### design.md - Architecture

**Purpose**: Define HOW we build it

**Sections**:
- Domain Model - Entities and relationships
- Architecture - Layers and dependencies
- API Design - Endpoints and contracts
- Database - Schema and indexes
- Trade-offs - Decisions explained

**Example**:

```markdown
# Design: Schema Registry

## Domain Model

### Schema (Aggregate Root)
- id: UUID
- name: SchemaName (value object)
- description: string?
- currentVersion: Version?

### SchemaName (Value Object)
- Rules: lowercase, alphanumeric, hyphens
- Validation: regex `^[a-z0-9-]+$`

## Architecture

### Layers
Domain → Application → Infrastructure → Presentation

### API
| Method | Path | Description |
|--------|------|-------------|
| POST | /schemas | Create schema |

## Trade-offs

### SQLite vs PostgreSQL
Chose SQLite for MVP simplicity.
Can migrate via Prisma later.
```

### tasks.md - Implementation Plan

**Purpose**: Break work into actionable chunks

**Format**:

```markdown
# Tasks: Schema Registry

## Task 1: Domain Layer
**Size**: M (2-4 hours)
**Depends on**: None

### Description
Implement domain entities.

### Files
- `packages/domain/src/Schema.ts`
- `packages/domain/src/SchemaName.ts`

### Acceptance Criteria
- [ ] Schema entity with invariants
- [ ] SchemaName validation
- [ ] Unit tests pass

## Execution Order
Phase 1:
- Task 1

Phase 2:
- Task 2 (depends on Task 1)
```

### review.md - Code Review

**Purpose**: Document review findings

**Format**:

```markdown
# Review: Schema Registry

## Summary
- Status: ✅ Approved / ⚠️ Changes requested

## Ratings
Architecture: ★★★★☆
Code Quality: ★★★★★
Testing: ★★★☆☆

## Issues

### Issue 1
**File**: `Schema.ts:45`
**Problem**: Business logic in controller
**Suggestion**: Move to domain service

## Action Items
- [ ] Fix Issue 1
- [ ] Add test for edge case
```

## SDD in Practice

### Example: Adding User Authentication

**❌ Without SDD:**

```
"Add login to the app"
→ Write Login component
→ Write auth API
→ Write user model
→ Realize we need sessions
→ Rewrite everything
→ Add JWT
→ Rewrite again with cookies
```

**✅ With SDD:**

```
"Add login to the app"
    ↓
[Write spec.md]
"Actually, authentication is out of MVP scope"
    ↓
[Close issue or defer to v2]
```

Saved 3 days of wasted work!

### Example: Implementing Diff

**✅ With SDD:**

```
"Add diff between versions"
    ↓
1. spec.md
   - Compare two versions
   - Show added/removed/modified
   - Detect breaking changes

2. design.md
   - DiffEngine domain service
   - Recursive comparison algorithm
   - Breaking change detection rules

3. tasks.md
   - Task 1: DiffEngine service
   - Task 2: API endpoint
   - Task 3: UI component

4. Implement Task 1
   ↓
5. Implement Task 2
   ↓
6. Implement Task 3
   ↓
7. Review
   ↓
8. Commit
```

## SDD Checklist

### Before Starting
- [ ] Spec exists in `specs/`
- [ ] Requirements are clear
- [ ] Out of scope is defined
- [ ] Acceptance criteria are testable

### During Design
- [ ] Domain model documented
- [ ] API contracts defined
- [ ] Trade-offs explained
- [ ] Design reviewed

### During Implementation
- [ ] Working from tasks.md
- [ ] One task at a time
- [ ] Tests for each task
- [ ] Commit after each task

### Before Merge
- [ ] Review completed
- [ ] Issues addressed
- [ ] Documentation updated
- [ ] Acceptance criteria met

## Common Mistakes

### ❌ "The spec is in my head"
**Problem**: No shared understanding
**Fix**: Write it down, review with team

### ❌ "I'll write the spec after coding"
**Problem**: Spec becomes documentation, not design
**Fix**: Spec first, code second

### ❌ "The spec is 50 pages"
**Problem**: Too long to review, details change
**Fix**: Keep specs focused (< 2 pages)

### ❌ "One spec for everything"
**Problem**: Unclear scope, hard to review
**Fix**: One spec per feature

## SDD vs Other Approaches

| Approach | When to Use | SDD Difference |
|----------|-------------|----------------|
| TDD | Algorithmic code | SDD adds architecture before tests |
| BDD | Business workflows | SDD adds technical design |
| DDD | Complex domains | SDD adds lightweight process |
| Agile Stories | Quick iterations | SDD adds documentation |

**SDD combines best of all:**
- Documentation (like Agile)
- Domain focus (like DDD)
- Testable (like TDD)
- Collaborative (like BDD)

## Getting Started with SDD

1. **Create first spec**
   ```bash
   ./scripts/create-spec.sh my-feature 001
   ```

2. **Write requirements**
   - What problem does it solve?
   - What are the requirements?
   - How do we know it's done?

3. **Get review**
   - Ask teammate to read spec
   - Clarify anything confusing
   - Confirm scope is right

4. **Start coding**
   - Follow tasks.md
   - One task at a time
   - Commit frequently

5. **Iterate**
   - Update spec if needed
   - Mark tasks complete
   - Review and merge

## SDD Success Metrics

- **Fewer rewrites**: < 10% of features need major rework
- **Faster reviews**: PR reviews take < 30 minutes
- **Clear ownership**: Each feature has clear owner
- **Living documentation**: Specs stay current

## Further Reading

- [Architecture Decision Records](../rfcs/) - Why we chose this approach
- [Development Workflow](./02-development-workflow.md) - Step-by-step guide
- [Commit Conventions](../architecture/commit-conventions.md) - How to commit
