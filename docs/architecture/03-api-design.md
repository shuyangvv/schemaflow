# API Design

## Base URL

```
http://localhost:3001/api
```

## Error Response Format

```json
{
  "error": {
    "code": "SCHEMA_NOT_FOUND",
    "message": "Schema with id 'xxx' not found",
    "details": { "schemaId": "xxx" }
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `SCHEMA_NOT_FOUND` | 404 | Schema doesn't exist |
| `VERSION_NOT_FOUND` | 404 | Version doesn't exist |
| `DUPLICATE_SCHEMA_NAME` | 409 | Name already used |
| `INVALID_JSON_SCHEMA` | 400 | Schema content invalid |
| `DIFF_VERSIONS_INCOMPATIBLE` | 400 | Can't diff different schemas |
| `RELEASE_ALREADY_EXISTS` | 409 | Release name used for version |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## Endpoints

### Schema Registry

#### Create Schema
```
POST /schemas
```

**Request:**
```json
{
  "name": "user-registration",
  "description": "User registration form",
  "content": {
    "type": "object",
    "properties": {
      "email": { "type": "string", "format": "email" },
      "password": { "type": "string", "minLength": 8 }
    },
    "required": ["email", "password"]
  }
}
```

**Response (201):**
```json
{
  "id": "sch_abc123",
  "name": "user-registration",
  "description": "User registration form",
  "isPublished": false,
  "currentVersion": {
    "id": "ver_xyz789",
    "versionNumber": 1,
    "content": { ... },
    "hash": "a1b2c3d4",
    "changeSummary": "Initial version",
    "createdAt": "2024-01-15T08:30:00Z"
  },
  "createdAt": "2024-01-15T08:30:00Z",
  "updatedAt": "2024-01-15T08:30:00Z"
}
```

#### List Schemas
```
GET /schemas?search=&page=1&limit=20
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "sch_abc123",
      "name": "user-registration",
      "description": "User registration form",
      "isPublished": true,
      "currentVersionNumber": 3,
      "versionCount": 5,
      "createdAt": "2024-01-15T08:30:00Z",
      "updatedAt": "2024-01-16T10:00:00Z"
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

#### Get Schema
```
GET /schemas/:id
```

**Response (200):** Same as Create Schema response

#### Update Schema
```
PUT /schemas/:id
```

**Request:**
```json
{
  "name": "user-signup",
  "description": "Updated description"
}
```

**Response (200):** Updated schema object

**Note:** Content changes create new versions, not updates.

#### Delete Schema
```
DELETE /schemas/:id
```

**Response (204):** No content

---

### Version Management

#### List Versions
```
GET /schemas/:schemaId/versions
```

**Response (200):**
```json
{
  "schema": {
    "id": "sch_abc123",
    "name": "user-registration"
  },
  "data": [
    {
      "id": "ver_v2",
      "schemaId": "sch_abc123",
      "versionNumber": 2,
      "content": { ... },
      "hash": "e5f6g7h8",
      "changeSummary": "Added age field",
      "createdAt": "2024-01-16T10:00:00Z"
    },
    {
      "id": "ver_v1",
      "versionNumber": 1,
      ...
    }
  ]
}
```

#### Create Version
```
POST /schemas/:schemaId/versions
```

**Request:**
```json
{
  "content": {
    "type": "object",
    "properties": {
      "email": { "type": "string" },
      "password": { "type": "string" },
      "age": { "type": "integer", "minimum": 18 }
    },
    "required": ["email", "password", "age"]
  },
  "changeSummary": "Added age field with minimum 18"
}
```

**Response (201):** Version object with auto-incremented versionNumber

#### Get Version
```
GET /versions/:id
```

**Response (200):** Version object

---

### Diff Engine

#### Compare by Version Numbers
```
GET /schemas/:schemaId/diff?from=1&to=2
```

**Response (200):**
```json
{
  "fromVersion": {
    "id": "ver_v1",
    "versionNumber": 1
  },
  "toVersion": {
    "id": "ver_v2",
    "versionNumber": 2
  },
  "hasBreakingChanges": false,
  "changes": [
    {
      "path": "properties.age",
      "type": "added",
      "newValue": { "type": "integer", "minimum": 18 }
    },
    {
      "path": "required",
      "type": "modified",
      "oldValue": ["email", "password"],
      "newValue": ["email", "password", "age"]
    }
  ],
  "summary": {
    "added": 1,
    "removed": 0,
    "modified": 1
  }
}
```

#### Compare by Version IDs
```
POST /diff
```

**Request:**
```json
{
  "fromVersionId": "ver_v1",
  "toVersionId": "ver_v2"
}
```

**Response (200):** Same format as GET diff

---

### Release Management

#### Create Release
```
POST /versions/:versionId/releases
```

**Request:**
```json
{
  "name": "production",
  "description": "Production stable release"
}
```

**Response (201):**
```json
{
  "id": "rel_123",
  "versionId": "ver_v2",
  "name": "production",
  "description": "Production stable release",
  "isActive": true,
  "releasedAt": "2024-01-16T12:00:00Z"
}
```

#### List Releases
```
GET /releases
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "rel_123",
      "name": "production",
      "description": "Production stable release",
      "isActive": true,
      "releasedAt": "2024-01-16T12:00:00Z",
      "version": {
        "id": "ver_v2",
        "versionNumber": 2,
        "schema": {
          "id": "sch_abc123",
          "name": "user-registration"
        }
      }
    }
  ]
}
```

#### Update Release
```
PUT /releases/:id
```

**Request:**
```json
{
  "name": "v1.0",
  "description": "Updated description",
  "isActive": false
}
```

**Response (200):** Updated release object

#### Delete Release
```
DELETE /releases/:id
```

**Response (204):** No content

---

### Rollback

#### Rollback to Version
```
POST /schemas/:schemaId/rollback
```

**Request:**
```json
{
  "targetVersionId": "ver_v1",
  "reason": "Age validation too strict"
}
```

**Response (201):** New version object (v3 with v1's content)

---

## OpenAPI Specification

Full OpenAPI spec available at: `/api/docs` (when implemented)

```yaml
openapi: 3.0.0
info:
  title: SchemaFlow API
  version: 0.1.0
paths:
  /schemas:
    get:
      summary: List schemas
      parameters:
        - name: search
          in: query
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: List of schemas
    post:
      summary: Create schema
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [name, content]
              properties:
                name:
                  type: string
                  pattern: '^[a-z0-9-]+$'
                description:
                  type: string
                content:
                  type: object
      responses:
        '201':
          description: Created schema
        '409':
          description: Duplicate name
```
