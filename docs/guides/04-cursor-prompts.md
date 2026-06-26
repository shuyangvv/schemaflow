# Cursor Prompts Guide

This guide contains ready-to-use prompts for working with SchemaFlow using Cursor Agent mode.

## Quick Reference

| Goal | Prompt |
|------|--------|
| Initialize project | [Prompt 0](#prompt-0-initialize-project) |
| Create new spec | `./scripts/create-spec.sh name 004` |
| Design feature | [Prompt 2](#prompt-2-design-domain) |
| Design API | [Prompt 3](#prompt-3-design-api) |
| Implement task | [Prompt 4-7](#prompt-4-implement-mvp) |
| Review code | [Prompt 8](#prompt-8-cursor-review) |
| Refactor | [Prompt 9](#prompt-9-refactor) |

## Prompt 0: Initialize Project

Use this once at project start.

```
You are a senior Staff Software Engineer.

We are building an open source project called SchemaFlow.

SchemaFlow is NOT a low-code form builder.
It is a Dynamic Form Schema Lifecycle Platform.

The goal is to manage JSON Schema through its entire lifecycle:
- Schema Registry
- Version Management
- Diff
- Release
- Rollback

The first milestone is MVP.
MVP ONLY includes:
1. Schema CRUD
2. Version Management
3. Schema Diff
4. Release Management

Do NOT generate unnecessary abstractions.
Do NOT implement Designer.
Do NOT implement AI.
Do NOT implement Rule Engine.
Do NOT implement Authentication.

Please think like an architect first.
Before generating any code:
1. Design project architecture.
2. Design folder structure.
3. Design domain model.
4. Design API.
5. Explain every design decision.

Wait for confirmation before generating implementation.
```

## Prompt 1: Initialize Repository

```
Now initialize the repository.

Requirements:
Use Monorepo.

Structure:
apps/
packages/
docs/
examples/

Frontend:
- React
- Vite
- TypeScript
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express
- TypeScript
- SQLite (via Prisma)

Please generate:
- folder structure
- README
- .gitignore
- LICENSE
- ROADMAP
- CONTRIBUTING

Do not generate business code yet.
```

## Prompt 2: Design Domain

Use this before implementing any feature.

```
Let's design the domain model for [feature-name].

Do NOT write database tables first.
Please design Domain Entities first.

We currently have:
- Schema
- Version
- Release

For each entity provide:
- responsibility
- attributes
- relationship
- lifecycle

Then explain whether additional entities are needed.

Output UML using Mermaid.
No implementation.
```

## Prompt 3: Design API

```
Now design REST APIs for [feature-name].

Requirements:
[List specific requirements]

Return OpenAPI style API definition.
No implementation.
Only API design.
```

## Prompt 4: Implement MVP

Use for incremental feature development.

```
Implement [feature-name] incrementally.

Today's goal is ONLY: [specific task]
Features:
- [List specific features]

Storage:
Use SQLite via Prisma.

Focus on clean architecture:
- Use Repository Pattern
- Domain logic in services
- DTOs for API boundaries

Generate backend first.
Then frontend.
```

## Prompt 5: Develop Version

```
Next milestone: Implement [feature].

Requirements:
[List requirements]

Storage uses Prisma/SQLite.
Design for future database migration.

Please implement backend first.
Then frontend.
```

## Prompt 6: Implement Diff Engine

```
Implement Schema Diff Engine.

Requirements:
Compare two versions.
Detect:
- Added field
- Deleted field
- Modified field
- Type changed

Output should NOT be raw JSON diff.
Instead generate structured diff:

Example:
ADD
  phone
MODIFY
  age.type
  number -> string
DELETE
  fax

Design reusable Diff Engine.
Separate algorithm from UI.
```

## Prompt 7: Release Management

```
Implement Release Management.

Requirements:
- Tag versions as "Draft" or "Released"
- Release Version
- Rollback
- History Timeline

Only backend business logic first.
Then UI.
No workflow engine.
```

## Prompt 8: Cursor Review

Run after completing each module.

```
Please review the current codebase.

Focus on:
- Architecture
- Naming
- Folder structure
- DDD principles
- SOLID principles
- Scalability

Do NOT modify code.
Generate architecture review report.

List:
Good
Problems
Suggestions
```

## Prompt 9: Refactor

```
Refactor current codebase.

Goals:
- Reduce coupling
- Improve readability
- Separate UI from business
- Extract reusable packages
- Avoid over engineering

Generate refactor plan before coding.
```

## Prompt 10: Generate Documentation

```
Generate project documentation.

Include:
- Architecture
- Folder structure
- Domain model
- Sequence Diagrams
- API
- Development Guide
- Roadmap

Use Markdown.
Store inside docs/.
```

## Custom Prompts

### Start New Feature

```
I want to implement [feature-name].

First, read the spec at specs/[number]-[name]/spec.md.

Then:
1. Review if spec is complete
2. Design domain model
3. Create design.md
4. Generate tasks.md
5. Wait for my confirmation before implementing
```

### Implement Single Task

```
Implement Task [number]: [task-name]

From specs/[feature]/tasks.md

Requirements:
- [ ] [Acceptance criteria 1]
- [ ] [Acceptance criteria 2]

Follow clean architecture.
Write tests.
Commit when done.
```

### Fix Issue

```
Fix the following issue:

File: [file-path]:[line]
Problem: [description]

Requirements:
- Don't break existing functionality
- Add/update tests
- Follow existing patterns
```

## Working with Cursor Rules

The project has `cursor-rules.md` at root. Cursor should:

1. **Always read it first** when starting a session
2. **Follow the rules** in all responses
3. **Ask if unclear** about constraints
4. **Stop and confirm** when exceeding MVP scope

## Tips for Best Results

### Be Specific

❌ "Build a form"
✅ "Build a schema registry with CRUD operations, storing JSON Schema content"

### Define Scope

❌ "Add all features"
✅ "Today implement only schema list and create. No edit/delete yet."

### Request Design First

❌ "Write the code for version management"
✅ "Design the domain model for versions first, then implement"

### Review Incrementally

Don't wait until end to review. Review after each:
- Domain layer
- Application layer
- Infrastructure layer
- UI layer

### Use Task References

Always reference specific tasks from `tasks.md`:

```
Implement Task 3 from specs/004-feature/tasks.md
```

## Common Patterns

### Pattern: Spec → Design → Tasks → Code

```
Read specs/004-feature/spec.md
Design the domain model and API
Create specs/004-feature/design.md
Break into tasks in specs/004-feature/tasks.md
Implement Task 1
```

### Pattern: Review → Fix → Commit

```
Review the implementation of [feature]
List issues found
Fix issue 1
Fix issue 2
Commit with message "feat(feature): description"
```

### Pattern: Refactor → Verify

```
Refactor [component] to improve [aspect]
Generate refactor plan
Implement changes
Verify all tests still pass
Commit
```

## Troubleshooting

### Cursor Generates Too Much

Add to prompt:
```
Focus only on [specific task].
Do not implement anything else.
```

### Cursor Misses Architecture

Add to prompt:
```
Follow Clean Architecture.
Business logic in domain layer.
No logic in controllers or UI.
```

### Cursor Over-Engineers

Add to prompt:
```
MVP only. No abstraction for future needs.
Simplest solution that works.
No interfaces with single implementation.
```

## Advanced: Custom Agent Mode

For complex features, define temporary rules:

```
For this feature only:
- Use Strategy Pattern for diff algorithms
- Support both JSON Patch and custom diff
- Keep algorithms in separate files

Generate:
1. Interface definitions
2. Algorithm implementations
3. Tests
```

## Resources

- [Architecture Overview](../architecture/01-overview.md)
- [Development Workflow](./02-development-workflow.md)
- [Spec-Driven Development](./03-spec-driven-development.md)
