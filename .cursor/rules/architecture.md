# Architecture Rules

## Core Principles

1. **Clean Architecture**: Business logic must be independent of frameworks, UI, and database
2. **Domain-Driven Design (DDD)**: Model business concepts directly in code
3. **Layered Architecture**:
   - Domain Layer: Entities, Value Objects, Domain Services (no dependencies)
   - Application Layer: Use Cases, DTOs (depends only on Domain)
   - Infrastructure Layer: Repositories, Controllers, External APIs (depends on Domain + Application)
   - Presentation Layer: React Components, API Clients (depends on Application)

## Folder Structure Rules

```
packages/
  server/
    src/
      domain/          # Domain Layer - Pure business logic
        entities/
        value-objects/
        services/
        repositories/  # Repository interfaces only
      application/     # Application Layer - Use cases
        ports/
        services/
        dto/
      infrastructure/  # Infrastructure Layer
        persistence/
        web/
        config/
      interface/       # Interface Adapters
        http/
        cli/
  web/
    src/
      application/     # Application hooks/services
      presentation/    # React components
      infrastructure/ # API clients
```

## Forbidden Patterns

❌ NEVER put business logic in:
- React Components
- Controllers
- Database queries

❌ NEVER create God classes:
- Services with > 500 lines
- Functions with > 50 lines
- Classes with > 10 methods

## Required Patterns

✅ ALWAYS:
- Define repository interfaces in domain, implement in infrastructure
- Use dependency injection
- Validate at boundary (API input, DB output)
- Write tests for domain logic

## Naming Conventions

- **Entities**: PascalCase, noun (Schema, Version, Release)
- **Use Cases**: PascalCase, verb + noun (CreateSchema, CompareVersions)
- **Repositories**: PascalCase, entity + Repository (SchemaRepository)
- **DTOs**: PascalCase + Dto (CreateSchemaDto, SchemaResponseDto)
- **Functions**: camelCase, verb + noun (createSchema, compareVersions)
