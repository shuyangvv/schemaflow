# Tasks: Schema Registry

Reference: [spec.md](./spec.md), [design.md](./design.md)

## Task 1: Domain Layer
**Size**: M
**Depends on**: None

### Description
Implement domain entities and value objects for Schema.

### Files to Create/Modify
- `apps/server/src/modules/schema/schema.types.ts`
- `apps/server/src/modules/schema/schema.validator.ts`
- `apps/server/src/shared/errors.ts`
- `apps/server/src/modules/schema/schema.repository.ts`

### Acceptance Criteria
- [ ] `Schema` entity with invariants
- [ ] `SchemaName` validation (regex, length)
- [ ] Domain errors: `DuplicateNameError`, `InvalidNameError`
- [ ] Repository interface defined
- [ ] Unit tests for domain logic

---

## Task 2: Database & Repository
**Size**: M
**Depends on**: Task 1

### Description
Implement Prisma schema and repository.

### Files to Create/Modify
- `apps/server/prisma/schema.prisma` - Add Schema model
- `apps/server/src/modules/schema/schema.repository.ts`
- Migration file

### Acceptance Criteria
- [ ] Prisma Schema model matches design
- [ ] Repository implements all interface methods
- [ ] Migration creates proper indexes
- [ ] Integration tests for repository

---

## Task 3: Application Use Cases
**Size**: L
**Depends on**: Task 2

### Description
Implement all use cases.

### Files to Create
- `apps/server/src/modules/schema/schema.service.ts`
- `apps/server/src/modules/schema/schema.types.ts`

### Acceptance Criteria
- [ ] CreateSchema creates schema + v1 atomically
- [ ] GetSchema returns with current version
- [ ] ListSchemas with pagination and search
- [ ] UpdateSchema validates name uniqueness
- [ ] DeleteSchema cascade deletes versions
- [ ] Unit tests for all use cases (mocked repos)

---

## Task 4: API Layer
**Size**: M
**Depends on**: Task 3

### Description
Implement HTTP controllers and routes.

### Files to Create
- `apps/server/src/modules/schema/schema.controller.ts`
- `apps/server/src/modules/schema/schema.routes.ts`
- `apps/server/src/shared/middleware.ts`
- `apps/server/src/modules/schema/schema.validator.ts`

### Acceptance Criteria
- [ ] All 5 endpoints working
- [ ] Proper HTTP status codes
- [ ] Request validation
- [ ] Error responses follow standard format
- [ ] API tests

---

## Task 5: Frontend - List View
**Size**: M
**Depends on**: Task 4

### Description
Implement schema list UI.

### Files to Create
- `apps/web/src/modules/schemas/SchemaList.tsx`
- `apps/web/src/shared/api/client.ts`

### Acceptance Criteria
- [ ] Display list of schemas
- [ ] Search functionality
- [ ] Pagination
- [ ] Delete with confirmation
- [ ] Link to detail page

---

## Task 6: Frontend - Create & Detail
**Size**: M
**Depends on**: Task 5

### Description
Implement create form and detail view.

### Files to Create
- `apps/web/src/modules/schemas/SchemaCreate.tsx`
- `apps/web/src/modules/schemas/SchemaDetail.tsx`
- `apps/web/src/modules/schemas/SchemaEdit.tsx`

### Acceptance Criteria
- [ ] Create form with validation
- [ ] JSON editor for schema content
- [ ] Detail view shows current version
- [ ] Edit metadata form

---

## Execution Order

```
Phase 1: Domain
├── Task 1: Domain Layer
└── Task 2: Database & Repository

Phase 2: Backend
└── Task 3: Application Use Cases
    └── Task 4: API Layer

Phase 3: Frontend
├── Task 5: Frontend - List View
└── Task 6: Frontend - Create & Detail
```

## Verification

### Manual Testing
1. Create schema "test-form" with simple JSON content
2. Verify v1 auto-created
3. List schemas, see "test-form"
4. Search for "test", see result
5. Update description
6. Delete schema, verify gone

### Expected Outcome
- All API endpoints respond correctly
- Frontend displays and manages schemas
- Data persists in SQLite
