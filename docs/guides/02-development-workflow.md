# Development Workflow

We follow **Spec-Driven Development (SDD)** - every feature starts with a specification.

## The SDD Cycle

```
┌─────────────┐
│    Spec     │ ← Write requirements
└──────┬──────┘
       ↓
┌─────────────┐
│   Design    │ ← Architecture & API
└──────┬──────┘
       ↓
┌─────────────┐
│   Tasks     │ ← Break into actionable items
└──────┬──────┘
       ↓
┌─────────────┐
│  Implement  │ ← Code one task at a time
└──────┬──────┘
       ↓
┌─────────────┐
│   Review    │ ← Code review & validation
└──────┬──────┘
       ↓
┌─────────────┐
│   Commit    │ ← Git commit
└─────────────┘
```

## Phase 1: Specification

### 1.1 Create Spec

```bash
./scripts/create-spec.sh my-feature 004
```

This creates:
- `specs/004-my-feature/spec.md` - Requirements
- `specs/004-my-feature/design.md` - Architecture (empty)
- `specs/004-my-feature/tasks.md` - Tasks (empty)
- `specs/004-my-feature/review.md` - Review (empty)

### 1.2 Write Requirements

Edit `specs/004-my-feature/spec.md`:

```markdown
# Spec: My Feature

## Background
Why we need this feature.

## Goal
What we want to achieve.

## Requirements

### Functional Requirements
1. **Requirement 1**
   - Acceptance criteria
2. **Requirement 2**
   - Acceptance criteria

### Non-Functional Requirements
- Performance target
- Scale target

## Out of Scope
What's explicitly not included.

## Acceptance Criteria
- [ ] Can do X
- [ ] Can do Y
```

### 1.3 Review Spec

Before proceeding, review the spec:
- Does it align with MVP goals?
- Are requirements clear and testable?
- Are edge cases considered?

## Phase 2: Design

### 2.1 Architecture Design

Use Cursor Agent:

```
@architect Design the architecture for 004-my-feature based on specs/004-my-feature/spec.md
```

Output goes to `design.md`:

- Domain model changes
- API endpoints
- Database schema
- Trade-offs explained

### 2.2 Validate Design

Check against:
- Clean Architecture principles
- Existing patterns in codebase
- Future extensibility

## Phase 3: Planning

### 3.1 Create Tasks

Use Cursor Agent:

```
@planner Create implementation tasks for 004-my-feature in specs/004-my-feature/tasks.md
```

Task format:

```markdown
# Tasks: My Feature

## Task 1: Domain Layer
**Size**: M (2-4 hours)
**Depends on**: None

### Description
Implement domain entities and value objects.

### Files
- `packages/domain/src/entities/MyEntity.ts`
- `packages/domain/src/value-objects/MyValue.ts`

### Acceptance Criteria
- [ ] Entity has invariants
- [ ] Value object validates input
- [ ] Unit tests pass

---

## Task 2: Application Layer
**Size**: L (4-8 hours)
**Depends on**: Task 1

### Description
Implement use cases.

### Execution Order
Phase 1: Domain
- Task 1

Phase 2: Application
- Task 2
```

### 3.2 Estimate Tasks

| Size | Duration | Scope |
|------|----------|-------|
| S | < 2 hours | One function/class |
| M | 2-4 hours | One module |
| L | 4-8 hours | One layer |
| XL | > 8 hours | Break down further |

## Phase 4: Implementation

### 4.1 One Task at a Time

Focus on single task from `tasks.md`:

1. Read current task
2. Understand acceptance criteria
3. Implement
4. Test
5. Mark complete

### 4.2 Clean Architecture Order

Always implement in this order:

```
1. Domain Layer
   - Entities
   - Value Objects
   - Domain Services

2. Application Layer
   - Use Cases
   - DTOs
   - Ports (interfaces)

3. Infrastructure Layer
   - Repository implementations
   - Controllers
   - External adapters

4. Presentation Layer
   - React components
   - API clients
   - UI state
```

### 4.3 Coding Standards

Before writing code, check:
- ✅ No business logic in UI
- ✅ Repository interfaces defined
- ✅ DTOs for API boundaries
- ✅ Error handling planned

While coding:
- ✅ Max 30 lines per function
- ✅ Max 200 lines per file
- ✅ Early returns preferred
- ✅ No code duplication

After coding:
- ✅ Tests pass
- ✅ No TypeScript errors
- ✅ Linting passes
- ✅ Manual testing done

## Phase 5: Review

### 5.1 Self Review

Use Cursor Agent:

```
@reviewer Review specs/004-my-feature implementation
```

Or checklist:

- [ ] Follows Clean Architecture
- [ ] Business logic in domain
- [ ] No God classes
- [ ] Tests for domain logic
- [ ] Error handling at boundaries
- [ ] Naming consistent
- [ ] Documentation updated

### 5.2 Fix Issues

Address all review comments:

```markdown
# Review: My Feature

## Issues Found

### Issue 1
**File**: `MyService.ts:45`
**Problem**: Business logic in controller
**Fix**: Move to domain service

### Issue 2
**File**: `MyEntity.ts`
**Problem**: Missing validation
**Fix**: Add invariant check
```

## Phase 6: Commit

### 6.1 Prepare Commit

```bash
# Check what changed
git diff

# Stage selectively
git add -p

# Or stage specific files
git add packages/domain/src/entities/
```

### 6.2 Write Commit Message

Follow [Conventional Commits](../architecture/commit-conventions.md):

```
feat(schema): add schema validation

- Implement SchemaName value object
- Add format validation (lowercase, hyphens)
- Reject names > 100 characters

Closes: #45
```

Format: `<type>(<scope>): <subject>`

| Type | Meaning |
|------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `refactor` | Code restructuring |
| `test` | Tests only |
| `chore` | Build/config |

### 6.3 Push and PR

```bash
# Create feature branch
git checkout -b feat/my-feature

# Commit
git commit -m "feat(scope): description"

# Push
git push -u origin feat/my-feature

# Create PR with spec link
```

## Workflow Tips

### Small Batches
- Max 10 files per PR
- Max 300 lines changed
- One logical change at a time

### Frequent Commits
- Commit after each task
- Each commit leaves code working
- Clear commit messages

### Documentation First
- Spec before code
- Design before implementation
- Review before merge

### Ask When Unclear

If anything is unclear:
1. Re-read the spec
2. Check existing patterns
3. Ask in PR or issue

Never guess. Always clarify.
