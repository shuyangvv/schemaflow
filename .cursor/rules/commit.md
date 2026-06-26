# Commit Standards

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (no code change)
- `refactor`: Code change (no fix/feature)
- `test`: Tests only
- `chore`: Build/config changes

## Scopes

- `schema`: Schema module
- `version`: Version module
- `diff`: Diff module
- `release`: Release module
- `api`: API layer
- `ui`: Frontend components
- `spec`: Specification files
- `agent`: Agent definitions

## Examples

```
feat(schema): add schema creation API

- Implement CreateSchema use case
- Add validation for schema content
- Generate initial version on create

Closes: #123
```

```
refactor(version): split version service into use cases

- Extract CreateVersion use case
- Extract CompareVersions use case
- Remove VersionService god class
```

## Commit Flow

1. Write code for ONE task only
2. Run tests: `npm test`
3. Run lint: `npm run lint`
4. Stage changes: `git add -p`
5. Write commit message following format
6. Push after review

## Rules

- One logical change per commit
- No WIP commits in main branch
- Reference spec/PR in body
- Breaking changes marked with `BREAKING CHANGE:`
