# Release Process

## Version Numbering

Semantic Versioning: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking API changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes only

## Release Checklist

Before releasing:

- [ ] All specs in `specs/` are complete (spec.md, design.md, tasks.md)
- [ ] All tasks marked complete in `tasks.md`
- [ ] All tests passing (`npm test`)
- [ ] CHANGELOG.md updated
- [ ] Version bumped in `package.json`
- [ ] Git tag created: `git tag -a v1.2.3 -m "Release v1.2.3"`
- [ ] GitHub release created with notes

## Branches

- `main`: Stable, production-ready
- `develop`: Integration branch for next release
- `spec/xxx`: Feature specification branches
- `feat/xxx`: Feature implementation branches

## Release Flow

```
develop
   │
   ├── spec/version-api    → PR → develop
   │   ├── spec.md
   │   ├── design.md
   │   └── tasks.md
   │
   ├── feat/version-api    → PR → develop
   │   └── (implementation)
   │
   │ (when ready to release)
   ↓
v1.2.0 tag → main
```

## Changelog

Format:

```markdown
## [1.2.0] - 2024-01-15

### Added
- Version management API (#45)
- Schema diff visualization (#46)

### Fixed
- Error handling in schema creation (#44)

### Changed
- Improved diff algorithm performance
```

## Automation

- CI runs on every PR
- Auto-publish on tag push
- Docker images built for releases
