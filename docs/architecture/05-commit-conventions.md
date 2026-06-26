# Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(schema): add search functionality` |
| `fix` | Bug fix | `fix(api): handle null schema names` |
| `docs` | Documentation | `docs(readme): add setup instructions` |
| `style` | Formatting | `style(frontend): fix indentation` |
| `refactor` | Code restructuring | `refactor(domain): extract validation logic` |
| `perf` | Performance | `perf(query): add index on version_number` |
| `test` | Tests | `test(schema): add unit tests` |
| `chore` | Maintenance | `chore(deps): update prisma` |

## Scopes

| Scope | Description |
|-------|-------------|
| `schema` | Schema module |
| `version` | Version module |
| `diff` | Diff engine |
| `release` | Release management |
| `domain` | Domain layer |
| `api` | API layer |
| `ui` | Frontend/UI |
| `repo` | Repository/persistence |
| `spec` | Specification documents |
| `rfc` | Architecture decisions |
| `deps` | Dependencies |
| `ci` | CI/CD |

## Examples

### Feature

```
feat(schema): implement schema search

- Add search parameter to list endpoint
- Search by name and description
- Case-insensitive matching

Closes: #45
```

### Bug Fix

```
fix(api): handle duplicate schema names

Check for existing name before creation.
Return 409 Conflict if duplicate.

Fixes: #52
```

### Documentation

```
docs(api): add OpenAPI spec for version endpoints

Document:
- POST /schemas/:id/versions
- GET /schemas/:id/versions
- GET /versions/:id
```

### Refactor

```
refactor(domain): extract SchemaName value object

Move validation from service to value object.
Improves encapsulation and testability.

BREAKING CHANGE: Schema.create() now accepts SchemaName
```

### Breaking Change

```
feat(api): change version number to string

Version numbers now include prefix 'v' for consistency.

BREAKING CHANGE: versionNumber field changed from int to string
Migration required: UPDATE versions SET versionNumber = 'v' || versionNumber;
```

## Rules

### Description

- Use imperative, present tense: "add" not "added"
- Don't capitalize first letter
- No period at end
- Max 72 characters

### Body

- Separate from description with blank line
- Explain what and why, not how
- Wrap at 72 characters
- Use bullet points for multiple items

### Footer

- Reference issues: `Closes: #123`
- Breaking changes: `BREAKING CHANGE: description`
- Co-authored-by: `Co-authored-by: Name <email>`

## Git Hooks

Recommended `.husky/commit-msg`:

```bash
#!/bin/sh
commit_msg=$(cat $1)

# Check format
if ! echo "$commit_msg" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .+'; then
    echo "Invalid commit message format"
    echo "Expected: <type>(<scope>): <description>"
    exit 1
fi
```

## VS Code Extension

Recommended: [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)

Provides:
- Commit message prompt
- Type selection
- Scope suggestions

## Commit Checklist

Before committing:

- [ ] Type is appropriate (feat/fix/docs/etc)
- [ ] Scope is correct
- [ ] Description is clear and imperative
- [ ] Body explains why (if needed)
- [ ] Related issues referenced
- [ ] Breaking changes marked
- [ ] Tests pass: `pnpm test`
- [ ] Lint passes: `pnpm run lint`
- [ ] No console.logs left in code

## Common Mistakes

❌ **Wrong:**
```
added search functionality
fixed bug in api
[empty message]
wip: schema stuff
```

✅ **Correct:**
```
feat(schema): add search by name and description

fix(api): handle null schema names gracefully

docs(readme): add getting started section
```

## Changelog Generation

With conventional commits, changelog can be auto-generated:

```bash
# Install conventional-changelog
pnpm add -g conventional-changelog-cli

# Generate changelog
conventional-changelog -p angular -i CHANGELOG.md -s
```

Output groups commits by type:

```markdown
## [1.2.0] - 2024-01-15

### Features
- **schema**: add search functionality (#45)
- **version**: add bulk create (#48)

### Bug Fixes
- **api**: handle null schema names (#52)

### Documentation
- **readme**: add getting started guide
```
