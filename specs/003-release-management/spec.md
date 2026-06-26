# Spec: Release Management

## Background

Production systems need stable references to schema versions. Tags/labels allow marking versions as "production", "v1.0", etc.

## Goal

Provide release tagging for schema versions.

## Requirements

### Functional Requirements

1. **Create Release**
   - Tag a version with a name (e.g., "production", "v1.0")
   - Add optional description
   - Multiple releases per version allowed
   - Same version can't have duplicate release names

2. **List Releases**
   - Show all releases across all schemas
   - Include version number and schema name
   - Show active/inactive status

3. **Update Release**
   - Change name (if not duplicate)
   - Update description
   - Toggle active/inactive status

4. **Delete Release**
   - Remove tag from version

### Non-Functional Requirements

- Release names: lowercase, alphanumeric, hyphens, dots
- Max 100 releases per version

## Out of Scope

- Environment-based release promotion
- Release approval workflows
- Release notes generation

## Acceptance Criteria

- [ ] Can create release for version
- [ ] Duplicate release names rejected
- [ ] Can list all releases
- [ ] Can activate/deactivate release
- [ ] Can delete release

## UI Requirements

- Create release modal (name, description)
- Releases list with filter
- Activate/deactivate toggle
- Link to schema version
