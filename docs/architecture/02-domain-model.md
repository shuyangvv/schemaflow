# Domain Model

## Entities

### Schema (Aggregate Root)

**Responsibility**: Central form definition with metadata

**Attributes**:
- `id: UUID` - Unique identifier
- `name: SchemaName` - URL-friendly identifier (unique)
- `description: string?` - Human-readable description
- `currentVersion: Version?` - Pointer to current version
- `isPublished: boolean` - Published status
- `createdAt: DateTime`
- `updatedAt: DateTime`

**Invariants**:
- Name must be unique across system
- Name must follow format: lowercase, alphanumeric + hyphens
- When deleted, all versions cascade deleted

**Behaviors**:
```typescript
class Schema {
  static create(name: SchemaName, description?: string): Schema
  updateMetadata(name: SchemaName, description?: string): void
  setCurrentVersion(version: Version): void
  publish(): void
  unpublish(): void
}
```

---

### Version (Child Entity)

**Responsibility**: Immutable snapshot of schema content

**Attributes**:
- `id: UUID` - Unique identifier
- `schemaId: UUID` - Parent schema reference
- `versionNumber: integer` - Sequential (1, 2, 3...)
- `content: SchemaContent` - Full JSON Schema
- `hash: string` - Content hash for deduplication
- `changeSummary: string?` - Human description of changes
- `createdAt: DateTime`

**Invariants**:
- Content is immutable after creation
- versionNumber is unique per schema
- Hash is computed on creation

**Behaviors**:
```typescript
class Version {
  static create(
    schemaId: UUID,
    content: SchemaContent,
    versionNumber: integer,
    changeSummary?: string
  ): Version

  // No update methods - immutable
}
```

---

### Release (Standalone Entity)

**Responsibility**: Tag a version with a semantic name

**Attributes**:
- `id: UUID` - Unique identifier
- `versionId: UUID` - Referenced version
- `name: string` - Tag name (e.g., "production", "v1.0")
- `description: string?` - Release notes
- `isActive: boolean` - Currently active tag
- `releasedAt: DateTime`

**Invariants**:
- Name must be unique per version
- Can have multiple releases per version (different names)
- Deleting release doesn't affect version

**Behaviors**:
```typescript
class Release {
  static create(
    versionId: UUID,
    name: string,
    description?: string
  ): Release

  activate(): void
  deactivate(): void
  rename(name: string): void
}
```

---

## Value Objects

### SchemaName

**Responsibility**: Validate and encapsulate schema naming rules

**Rules**:
- 1-100 characters
- Lowercase letters, numbers, hyphens
- Regex: `^[a-z0-9-]+$`

```typescript
class SchemaName {
  private constructor(readonly value: string) {}

  static create(value: string): SchemaName {
    if (!/^[a-z0-9-]+$/.test(value)) {
      throw new InvalidNameError(value);
    }
    if (value.length < 1 || value.length > 100) {
      throw new InvalidNameError(value);
    }
    return new SchemaName(value);
  }
}
```

---

### SchemaContent

**Responsibility**: Validate and encapsulate JSON Schema content

**Rules**:
- Must be valid JSON
- Must have at least one of: type, properties, $schema

```typescript
class SchemaContent {
  private constructor(
    readonly value: object,
    readonly hash: string
  ) {}

  static create(value: object): SchemaContent {
    if (!this.isValidSchema(value)) {
      throw new InvalidSchemaError();
    }
    const hash = computeHash(JSON.stringify(value));
    return new SchemaContent(value, hash);
  }

  private static isValidSchema(value: object): boolean {
    return value && (
      'type' in value ||
      'properties' in value ||
      '$schema' in value
    );
  }
}
```

---

## Domain Services

### SchemaCreationService

**Responsibility**: Coordinate schema + initial version creation

```typescript
class SchemaCreationService {
  constructor(
    private schemaRepo: SchemaRepository,
    private versionRepo: VersionRepository
  ) {}

  async create(
    name: SchemaName,
    content: SchemaContent,
    description?: string
  ): Promise<Schema> {
    // Check uniqueness
    const existing = await this.schemaRepo.findByName(name);
    if (existing) {
      throw new DuplicateNameError(name.value);
    }

    // Create aggregate
    const schema = Schema.create(name, description);
    const version = Version.create(schema.id, content, 1, "Initial version");
    schema.setCurrentVersion(version);

    // Persist
    await this.schemaRepo.save(schema);
    await this.versionRepo.save(version);

    return schema;
  }
}
```

---

### DiffEngine

**Responsibility**: Compare two schema contents structurally

```typescript
class DiffEngine {
  compare(from: SchemaContent, to: SchemaContent): DiffResult {
    const changes = this.computeDiff(from.value, to.value);
    const hasBreaking = this.detectBreakingChanges(changes);

    return {
      changes,
      hasBreaking,
      summary: this.summarize(changes)
    };
  }

  private computeDiff(from: any, to: any, path = ''): Change[] {
    // Recursive comparison
    // Returns array of { path, type, oldValue?, newValue? }
  }

  private detectBreakingChanges(changes: Change[]): boolean {
    // Breaking: removing required, type change, adding required
  }
}
```

---

## Relationships

```
Schema (1) ───(*) Version
  │              │
  │              └──(*) Release
  │
  └──(1) currentVersion → Version
```

### Rules

1. **Schema → Versions**
   - One schema has many versions
   - Versions cannot exist without schema
   - Deleting schema deletes all versions (cascade)

2. **Schema → Current Version**
   - Schema has zero or one current version
   - Current version is the "working" version
   - Updated when new version created

3. **Version → Releases**
   - One version can have many releases
   - Releases are independent (can delete without affecting version)
   - Multiple releases can point to same version (different environments)

---

## Lifecycle

### Schema Lifecycle

```
[Draft] → [Published]
   ↓
[Deleted] (cascades to versions)
```

### Version Lifecycle

```
[Created] → Immutable
   ↓
Can be referenced by:
- Schema.currentVersion
- Release.versionId
```

### Release Lifecycle

```
[Created] → [Active/Inactive] → [Deleted]
```
