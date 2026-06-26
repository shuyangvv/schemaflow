# Spec: Diff Engine

## Background

Understanding what changed between schema versions is critical for:
- Reviewing changes before deployment
- Detecting breaking changes
- Documentation and audit

## Goal

Provide structural diff between any two schema versions.

## Requirements

### Functional Requirements

1. **Compute Diff**
   - Compare two versions (same schema)
   - Detect: added, removed, modified, type_changed
   - Show path to each change
   - Show old and new values

2. **Breaking Change Detection**
   - Identify changes that break compatibility
   - Removing required fields
   - Changing field types
   - Adding new required fields

3. **Diff Summary**
   - Count of added/removed/modified
   - Breaking change warning flag

### Non-Functional Requirements

- Diff computation < 100ms
- Handle schemas up to 100KB
- Recursive comparison for nested objects

## Out of Scope

- Semantic diff (understanding meaning of changes)
- Migration generation
- Visual diff UI (this is API only)

## Acceptance Criteria

- [ ] Can diff any two versions of same schema
- [ ] Shows all change types correctly
- [ ] Detects breaking changes accurately
- [ ] Provides change summary counts
- [ ] Paths shown in dot notation

## UI Requirements

- Select two versions to compare
- Side-by-side or unified diff view
- Highlight breaking changes
- Show path navigation
