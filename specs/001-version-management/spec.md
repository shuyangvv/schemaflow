# Spec: Version Management

## Background

JSON Schemas evolve over time. Each change needs to be tracked as an immutable version for auditability and rollback capability.

## Goal

Provide version history tracking for schemas with immutable snapshots.

## Requirements

### Functional Requirements

1. **Create Version**
   - Save new schema content as next version number
   - Auto-increment version number (1, 2, 3...)
   - Compute content hash for deduplication
   - Store change summary (optional)
   - Update schema's current version pointer

2. **List Versions**
   - Show all versions for a schema
   - Order by version number descending
   - Include content preview, hash, timestamp

3. **Get Version**
   - Retrieve specific version by ID
   - Include full content

4. **Rollback**
   - Create new version with content from target version
   - Record rollback reason
   - Increments version number (doesn't revert)

### Non-Functional Requirements

- Version creation < 50ms
- Store up to 1000 versions per schema
- Content deduplication via hash

## Out of Scope

- Version comparison (see Diff Engine spec)
- Version tagging (see Release Management spec)
- Version branching/merging
- Content compression

## Acceptance Criteria

- [ ] Creating schema auto-creates v1
- [ ] New versions increment number
- [ ] Can list version history
- [ ] Content hash computed and stored
- [ ] Rollback creates new version with old content
- [ ] Current version pointer updated on new version

## UI Requirements

- Version history timeline
- Show version number, timestamp, summary
- Rollback button with reason input
- Link to diff viewer
