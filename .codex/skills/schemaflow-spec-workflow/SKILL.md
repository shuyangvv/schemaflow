---
name: schemaflow-spec-workflow
description: SchemaFlow spec-driven development workflow for Codex. Use when creating, updating, reviewing, planning, or implementing SchemaFlow features from specs directories; when a request mentions spec, design, tasks, review, SDD, feature planning, architecture before coding, or adapting Cursor rules/prompts for Codex; and before coding any SchemaFlow feature that should follow the repository's Spec to Design to Tasks to Implement to Review lifecycle.
---

# SchemaFlow Spec Workflow

## Overview

Use this skill to run SchemaFlow's spec-driven development workflow inside Codex. It adapts the repository's Cursor rules, agent prompts, templates, and SDD documentation into a Codex-native procedure.

## Load Order

1. Read `references/schemaflow-rules.md` before making architecture, scope, implementation, or review decisions.
2. Read `references/spec-templates.md` when creating or updating `spec.md`, `design.md`, `tasks.md`, or `review.md`.
3. Inspect the relevant existing `specs/NNN-feature-name/` directory before editing code.
4. Inspect nearby implementation patterns in `apps/server`, `apps/web`, and `packages` before changing code.

## Workflow

### 1. Locate or Create the Spec

- Find the matching feature directory under `specs/`.
- If no matching spec exists, create the next `specs/NNN-feature-name/` directory using `./scripts/create-spec.sh <feature-name> <NNN>` when possible.
- Keep feature names lowercase hyphen-case and numbers zero-padded to three digits.
- Do not implement feature code before a usable `spec.md` exists.

### 2. Requirements Gate

Review `spec.md` for:

- Background and goal.
- Functional and non-functional requirements.
- Explicit out-of-scope boundaries.
- Testable acceptance criteria.
- MVP scope alignment.

If the request exceeds the current MVP boundaries in `references/schemaflow-rules.md`, stop implementation work and propose a smaller in-scope alternative.

### 3. Design Gate

Create or update `design.md` before implementation. Cover:

- Domain model: entities, value objects, invariants, domain services.
- Architecture boundaries and dependency direction.
- API contracts and error handling.
- Database or Prisma schema changes, if any.
- Trade-offs, rejected alternatives, and risks.

Start from domain concepts, then application/use-case boundaries, then infrastructure and UI.

### 4. Task Gate

Create or update `tasks.md` from the design. Each task must include:

- Size: `S`, `M`, or `L` where `L` is still no more than one focused session.
- Dependencies.
- Files to modify.
- Acceptance criteria.
- Verification steps.

Implement one task at a time. Keep code and tests for the same behavior in the same task unless the spec says otherwise.

### 5. Implementation

- Follow the existing codebase shape over idealized Clean Architecture examples when they differ.
- Keep business rules out of React components and HTTP controllers.
- Validate API boundaries and preserve typed DTOs.
- Avoid new dependencies unless the user explicitly asks for them.
- Keep diffs small and scoped to the current task.
- Mark completed task checkboxes only after verification passes.

### 6. Review and Verification

After implementation:

- Run the relevant lightweight verification first; broaden to `pnpm -r build`, `pnpm -r test`, or focused package scripts as risk requires.
- Create or update `review.md` with summary, status, findings, action items, and verification evidence.
- Do not claim completion while task checkboxes, acceptance criteria, or obvious verification remain unresolved.

## Codex Invocation Patterns

Use this skill for requests such as:

- "Use SchemaFlow SDD to add schema validation."
- "Create the spec/design/tasks for release rollback."
- "Implement Task 2 from specs/003-release-management."
- "Review this feature against the SchemaFlow spec."
- "Convert the Cursor spec workflow into Codex rules."

## Completion Contract

Before final response, report:

- Spec directory touched.
- Files changed.
- Simplifications or scope protections applied.
- Verification run and result.
- Remaining risks or gaps.
