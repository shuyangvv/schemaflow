# SchemaFlow Codex Rules

Use the project skill at `.codex/skills/schemaflow-spec-workflow` for SchemaFlow spec-driven development.

Invoke it when a task involves creating, updating, planning, implementing, or reviewing features under `specs/`, or when the user mentions spec, design, tasks, review, SDD, architecture before coding, or Cursor-to-Codex workflow migration.

Core rules:

- Read the relevant `specs/NNN-feature-name/` documents before coding.
- Do not implement feature code before `spec.md` exists.
- Create or update `design.md` before implementation work.
- Create or update `tasks.md` before implementation work.
- Implement one task at a time and mark task checkboxes only after verification.
- Keep SchemaFlow focused on schema lifecycle: Schema Registry, Version Management, Diff Engine, and Release Management.
- Treat Designer, AI features, Rule Engine, Authentication, Multi-language, Workflow Engine, and Import/Export as out of MVP scope unless the user explicitly changes scope.
- Keep business logic out of React components and HTTP controllers.
- Prefer existing project patterns and small, reversible diffs.
- Run relevant lint, typecheck, build, or tests before claiming completion.
