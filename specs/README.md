# Specifications

This directory contains feature specifications following **Spec-Driven Development (SDD)**.

## Directory Structure

```
specs/
├── README.md              # This file
├── 000-schema-registry/   # Schema CRUD feature
├── 001-version-management/
├── 002-diff-engine/
└── 003-release-management/
```

Each feature directory contains:

| File | Purpose | When Created |
|------|---------|--------------|
| `spec.md` | Requirements and acceptance criteria | First, always |
| `design.md` | Architecture and API design | After spec review |
| `tasks.md` | Implementation tasks | After design |
| `review.md` | Code review findings | After implementation |

## Workflow

### 1. Create Spec

```bash
./scripts/create-spec.sh feature-name 004
```

Edit `specs/004-feature-name/spec.md`:

```markdown
# Spec: Feature Name

## Background
Why we need this feature.

## Goal
What we want to achieve.

## Requirements
### Functional
1. **Requirement 1**
   - Acceptance criteria

### Non-Functional
- Performance: < 100ms

## Out of Scope
What's NOT included.

## Acceptance Criteria
- [ ] Can do X
- [ ] Can do Y
```

### 2. Review Spec

Before proceeding, the spec must be reviewed:

- Does it align with project goals?
- Are requirements clear and testable?
- Is scope appropriate for current milestone?

### 3. Design Architecture

Create `design.md`:

```markdown
# Design: Feature Name

## Domain Model
### Entities
- Entity: attributes, behaviors, invariants

## Architecture
### Layers
- Domain: entities and services
- Application: use cases
- Infrastructure: repositories and controllers

## API Design
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/x | Create X |

## Trade-offs
- Chose A because...
- Alternative B rejected because...
```

### 4. Plan Tasks

Create `tasks.md`:

```markdown
# Tasks: Feature Name

## Task 1: Domain Layer
**Size**: M (2-4 hours)
**Depends on**: None

### Description
Implement domain entities.

### Files
- `packages/domain/src/X.ts`

### Acceptance Criteria
- [ ] Entity created
- [ ] Tests pass

## Execution Order
Phase 1:
- Task 1
- Task 2

Phase 2:
- Task 3 (depends on Task 1)
```

### 5. Implement

Work through tasks one by one:

```bash
# Start with Task 1
# Implement domain layer
# Commit: "feat(feature): add domain entities"

# Continue to Task 2
# Implement application layer
# Commit: "feat(feature): add use cases"

# Continue until all tasks complete
```

### 6. Review

Create `review.md`:

```markdown
# Review: Feature Name

## Summary
- Status: ✅ Approved

## Ratings
Architecture: ★★★★☆
Code Quality: ★★★★★
Testing: ★★★★☆

## Issues
None found.
```

## Naming Conventions

### Spec Numbers

Use zero-padded 3-digit numbers:
- `000-` for core infrastructure
- `001-099` for MVP features
- `100-999` for post-MVP features

### Feature Names

Use lowercase with hyphens:
- ✅ `user-authentication`
- ✅ `schema-validation`
- ❌ `UserAuthentication`
- ❌ `user_authentication`

## Status Indicators

Use these emojis in documents:

| Emoji | Meaning |
|-------|---------|
| ⏳ | Draft / In progress |
| ✅ | Complete / Approved |
| ⚠️ | Approved with issues |
| ❌ | Rejected |
| 🔄 | Needs revision |

## Example: Schema Registry

Complete example in `000-schema-registry/`:

```
000-schema-registry/
├── spec.md      ← Start here
├── design.md    ← Architecture
├── tasks.md     ← Implementation plan
└── review.md    ← Code review
```

Read these files to understand the SDD workflow.

## Current Specs

| Number | Feature | Status | Spec | Design | Tasks | Review |
|--------|---------|--------|------|--------|-------|--------|
| 000 | Schema Registry | ✅ | ✅ | ✅ | ✅ | ✅ |
| 001 | Version Management | ✅ | ✅ | - | - | - |
| 002 | Diff Engine | ✅ | ✅ | - | - | - |
| 003 | Release Management | ✅ | ✅ | - | - | - |

## Tips

### Keep Specs Focused

- One feature per spec
- Clear scope boundaries
- Measurable acceptance criteria
- < 500 words for spec.md

### Design Before Coding

Never skip design.md. Even if simple, documenting the approach:
- Catches issues early
- Creates shared understanding
- Becomes documentation

### Small Tasks

- Max 8 hours per task
- One deliverable per task
- Testable acceptance criteria
- Clear dependencies

### Review Honestly

review.md should list real issues:
- Missing tests
- Architecture concerns
- Code quality problems
- Documentation gaps

## Tooling

### Create Spec

```bash
./scripts/create-spec.sh my-feature 004
```

Creates all four files with templates.

### Cursor Agent

Use the `@planner` agent to generate tasks:

```
@planner Create tasks for 004-my-feature in specs/004-my-feature/tasks.md
```

Use the `@reviewer` agent to review implementation:

```
@reviewer Review specs/004-my-feature implementation
```

## Integration with Code

Specs are not just planning documents. They live alongside code:

```
When implementing:  Refer to tasks.md
When reviewing:     Refer to spec.md acceptance criteria
When debugging:    Refer to design.md architecture
When onboarding:    Refer to spec.md for feature overview
```

Specs are living documents. Update them when:
- Requirements change
- New edge cases discovered
- Architecture evolves
- Lessons learned

## Questions?

See:
- [Spec-Driven Development Guide](../docs/guides/03-spec-driven-development.md)
- [Development Workflow](../docs/guides/02-development-workflow.md)
- Example: `000-schema-registry/`
