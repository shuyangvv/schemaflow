# SchemaFlow Rules for Codex

## Product Position

SchemaFlow is a Dynamic Form Schema Lifecycle Platform, not a low-code platform. Everything should center on schema lifecycle management.

Core concepts:

| Concept | Meaning |
| --- | --- |
| Schema | JSON Schema definition for a dynamic form |
| Version | Immutable snapshot of schema content |
| Diff | Structured comparison between versions |
| Release | Published or stable version tag |

## MVP Scope

Allowed modules:

- Schema Registry.
- Version Management.
- Diff Engine.
- Release Management.

Forbidden unless the user explicitly changes scope:

- Visual designer.
- AI features.
- Rule engine.
- Authentication.
- Multi-language support.
- Workflow engine.
- Import/export.

If requested work exceeds MVP scope, propose a smaller in-scope alternative before implementing.

## Architecture Rules

- Prefer the repository's existing module structure over introducing a new architecture tree.
- Keep business logic out of React components and HTTP controllers.
- Keep persistence access inside repositories or repository-like infrastructure modules.
- Validate inputs at API boundaries and enforce invariants in services or domain helpers.
- Use DTOs/types at API boundaries.
- Extract algorithms into focused modules when they are reusable or complex.
- Avoid interfaces with one implementation unless they match an existing local pattern or reduce real coupling.

## Code Quality Rules

- TypeScript must remain strict.
- Avoid `any` except in tightly scoped test mocks.
- Prefer explicit return types on public functions.
- Prefer immutable inputs and outputs.
- Keep functions small and use guard clauses to reduce nesting.
- Keep files focused; split only when it improves clarity.
- No new dependencies unless explicitly requested.

## Testing Rules

- Add or update tests when changing behavior.
- Prefer unit tests for domain logic and integration tests for repository/API behavior.
- Cover error paths for validation, not-found, duplicate, and invalid-state cases.
- Run focused tests first, then broader build/test commands when the change touches shared contracts.

## Git and Commit Notes

- The repository's Cursor docs describe Conventional Commits, but this workspace also uses the Lore Commit Protocol from AGENTS.md when commits are requested.
- Do not commit unless the user asks.
- Keep one logical change per commit if committing.
