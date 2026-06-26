# Design: Schema Registry

## Domain Model

### Entities

**Schema** (Aggregate Root)
- `id: string` (UUID) - Unique identifier
- `name: SchemaName` - URL-friendly identifier
- `description: string?` - Human-readable description
- `currentVersionId: string?` - Pointer to current version
- `isPublished: boolean` - Published status
- `createdAt: DateTime`
- `updatedAt: DateTime`

**SchemaName** (Value Object)
- Rules: lowercase, alphanumeric + hyphens, 1-100 chars
- Validation: regex `^[a-z0-9-]+$`
- Invariant: unique across system

### Domain Services

**SchemaCreationService**
- Ensures name uniqueness
- Creates initial version
- Coordinates persistence

## Architecture

### Layers

**Domain** (`src/domain/`)
- `Schema.ts` - Entity with invariants
- `SchemaName.ts` - Value object
- `SchemaRepository.ts` - Interface

**Application** (`src/application/`)
- `CreateSchemaUseCase.ts`
- `GetSchemaUseCase.ts`
- `ListSchemasUseCase.ts`
- `UpdateSchemaUseCase.ts`
- `DeleteSchemaUseCase.ts`
- `SchemaDto.ts` - Input/output DTOs

**Infrastructure** (`src/infrastructure/`)
- `PrismaSchemaRepository.ts`
- `SchemaController.ts` - HTTP handlers
- `SchemaRoutes.ts` - Route definitions

### Dependencies

```
Domain ← Application ← Infrastructure
  ↑                    ↑
  └────── Uses ────────┘
```

## API Design

### Endpoints

| Method | Path | Use Case |
|--------|------|----------|
| POST | `/api/schemas` | CreateSchema |
| GET | `/api/schemas` | ListSchemas |
| GET | `/api/schemas/:id` | GetSchema |
| PUT | `/api/schemas/:id` | UpdateSchema |
| DELETE | `/api/schemas/:id` | DeleteSchema |

### Request/Response

**Create Schema**
```json
// POST /api/schemas
{
  "name": "user-registration",
  "description": "User registration form",
  "content": {
    "type": "object",
    "properties": { ... }
  }
}

// 201 Created
{
  "id": "sch_abc123",
  "name": "user-registration",
  "description": "User registration form",
  "currentVersion": {
    "id": "ver_xyz789",
    "versionNumber": 1,
    "content": { ... },
    "hash": "abc123...",
    "createdAt": "2024-01-15T08:30:00Z"
  },
  "createdAt": "2024-01-15T08:30:00Z"
}
```

**List Schemas**
```json
// GET /api/schemas?search=user&page=1&limit=20
{
  "data": [
    {
      "id": "sch_abc123",
      "name": "user-registration",
      "currentVersionNumber": 3,
      "versionCount": 3,
      "updatedAt": "..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```

### Error Responses

```json
{
  "error": {
    "code": "DUPLICATE_SCHEMA_NAME",
    "message": "Schema with name 'user' already exists",
    "details": { "name": "user" }
  }
}
```

## Database Schema

```prisma
model Schema {
  id               String   @id @default(uuid())
  name             String   @unique
  description      String?
  currentVersionId String?  @unique
  isPublished      Boolean  @default(false)
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  versions         Version[]
  currentVersion   Version? @relation("CurrentVersion", fields: [currentVersionId], references: [id])
  
  @@index([isPublished])
}
```

### Indexes

- `name` - Unique lookup
- `isPublished` - Filter queries
- `updatedAt` - Sort by recency

## Trade-offs

### UUID vs Auto-increment

**Chose UUID:**
- Pros: Distributed-safe, no ID guessing
- Cons: Larger, not sortable by creation time
- **Decision**: UUID for ID, but have `name` for URL-friendly identifier

### Soft Delete vs Hard Delete

**Chose Hard Delete:**
- Pros: Simpler, cascade handled by DB
- Cons: No recovery
- **Decision**: Hard delete for MVP, add soft delete later if needed

### Transaction Strategy

**Chose Database Transaction:**
- Create schema + create v1 + update currentVersionId must be atomic
- Prisma `$transaction` handles this

## Risks

1. **Name Uniqueness Race Condition**
   - Mitigation: DB unique constraint + application check

2. **Large JSON Content**
   - Mitigation: Store as TEXT, consider size limits later
