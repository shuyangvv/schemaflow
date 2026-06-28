# SchemaFlow Spec Templates

Use these structures when creating or updating files under `specs/NNN-feature-name/`.

## spec.md

```markdown
# Spec: [Feature Name]

## Background

Why this feature is needed.

## Goal

What we want to achieve.

## Requirements

### Functional Requirements

1. **Requirement name**
   - Detail.
   - Expected behavior.

### Non-Functional Requirements

- Performance: [target]
- Scale: [target]

## Out of Scope

- [Explicit non-goal]

## Acceptance Criteria

- [ ] [Observable criterion]
- [ ] [Observable criterion]

## UI Requirements

If applicable.
```

## design.md

~~~markdown
# Design: [Feature Name]

## Domain Model

### Entities

**EntityName**
- Responsibility:
- Attributes:
- Invariants:

### Value Objects

**ValueObjectName**
- Validation rules:

### Domain Services

**ServiceName**
- Business rule:

## Architecture

### Layers

**Domain**
- What goes here.

**Application**
- Use cases, DTOs, ports.

**Infrastructure**
- Repositories, controllers, external APIs.

**Presentation**
- React components, hooks, API client calls.

### Dependencies

- Dependencies point inward.

## API Design

| Method | Path | Description |
| --- | --- | --- |
| POST | /api/example | Create example |

## Database

```prisma
// Prisma changes if needed.
```

## Trade-offs

### Option A vs Option B

- Chose:
- Rejected:
- Revisit if:

## Risks

1. Risk: mitigation.
~~~

## tasks.md

```markdown
# Tasks: [Feature Name]

Reference: [spec.md](./spec.md), [design.md](./design.md)

## Task 1: [Name]

**Size**: S/M/L
**Depends on**: None

### Description

What to implement.

### Files

- `path/to/file.ts`: what to add or change.

### Acceptance Criteria

- [ ] Criterion.

### Verification

- [ ] Focused test/build/manual check.

---

## Execution Order

Phase 1:
- Task 1
```

## review.md

```markdown
# Code Review: [Feature Name]

## Summary

- **Scope**:
- **Status**: Approved / Approved with issues / Needs changes

## Ratings

- Architecture:
- Code Quality:
- Testing:
- Security:

## Issues

### Issue 1

**File**: `path/to/file.ts:line`
**Problem**:
**Suggestion**:

## Action Items

- [ ] Item.

## Verification

- Command:
- Result:
```
