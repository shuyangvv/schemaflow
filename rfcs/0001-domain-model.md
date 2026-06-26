# RFC 0001: Domain Model

**Status**: Accepted  
**Date**: 2024-06-26  
**Author**: SchemaFlow Team

## Summary

Define the core domain model for SchemaFlow MVP: Schema, Version, and Release entities.

## Motivation

Need a clear domain model to guide implementation and communicate architecture to contributors.

## Design

### Entities

1. **Schema** (Aggregate Root)
   - Identity: UUID
   - Invariant: Name uniqueness
   - Behavior: Create with initial version

2. **Version** (Child of Schema)
   - Identity: UUID
   - Invariant: Immutable content, unique versionNumber per schema
   - Behavior: Store snapshot, compute hash

3. **Release** (Standalone)
   - Identity: UUID
   - Invariant: Unique (versionId, name) pair
   - Behavior: Tag version with semantic name

### Relationships

```
Schema 1---* Version 1---* Release
```

## Trade-offs

### Version as Child vs Separate Aggregate

**Options:**
- A) Version as child aggregate of Schema
- B) Version as separate aggregate

**Decision**: A) Child aggregate

**Reasons:**
- Versions don't exist without Schema
- Easier to enforce versionNumber uniqueness
- Deletion cascade is natural

### Content Storage

**Options:**
- A) Store as JSON text
- B) Store as binary/blob
- C) Normalize into tables

**Decision**: A) JSON text

**Reasons:**
- JSON Schema is semi-structured
- Query requirements are simple
- SQLite has good JSON support

## Rejected Alternatives

### Event Sourcing
- **Why rejected**: Overkill for MVP
- **May revisit**: If audit trail becomes critical

### Separate Version Service
- **Why rejected**: Adds unnecessary distributed complexity
- **May revisit**: If scale requires independent scaling

## Future Considerations

- Schema template library
- Version content compression
- Schema relationships (imports)

## References

- [Spec: Schema Registry](../specs/000-schema-registry/spec.md)
- [Spec: Version Management](../specs/001-version-management/spec.md)
