# Spec: Schema Registry

## Background

SchemaFlow needs a central registry to store and manage JSON Schema definitions. Each schema represents a form structure with validation rules.

## Goal

Provide CRUD operations for managing form schemas in a centralized registry.

## Requirements

### Functional Requirements

1. **Create Schema**
   - Accept name, description, and JSON Schema content
   - Validate name format (lowercase, alphanumeric, hyphens)
   - Validate JSON Schema structure
   - Auto-generate version 1 on creation
   - Reject duplicate names

2. **Read Schema**
   - Get schema by ID with current version
   - List schemas with pagination
   - Search by name or description
   - Include version count and current version number

3. **Update Schema**
   - Update name (if not duplicate)
   - Update description
   - Note: Content changes create new versions, not updates

4. **Delete Schema**
   - Soft delete consideration: hard delete for MVP
   - Cascade delete all versions and releases

### Non-Functional Requirements

- Response time < 100ms for list operations
- Support 10,000+ schemas
- Atomic operations for create (schema + v1)

## Out of Scope

- Schema templates
- Import/export from external formats
- Schema validation against external registries
- Multi-tenancy
- Soft delete / trash bin

## Acceptance Criteria

- [ ] Can create schema with valid data
- [ ] Auto-creates version 1 with content
- [ ] Rejects duplicate names
- [ ] Can list schemas with pagination
- [ ] Can search schemas
- [ ] Can update metadata (name, description)
- [ ] Can delete schema (cascade)
- [ ] API returns proper error codes

## UI Requirements

- List view with search
- Create form with JSON editor
- Detail view showing current version
- Edit form for metadata
- Delete confirmation
