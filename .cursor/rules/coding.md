# Coding Standards

## TypeScript Rules

1. **Strict Mode**: All code must pass strict TypeScript checking
2. **No Any**: `any` type is forbidden except in test mocks
3. **Explicit Returns**: Always declare function return types
4. **Immutable Data**: Prefer `readonly`, never mutate parameters

## Code Quality

### Function Size
- Max 30 lines per function
- Max 3 parameters per function (use object for more)
- Single Responsibility: One function = One thing

### File Size
- Max 200 lines per file
- Max 10 exports per file
- One concept per file

### Nesting
- Max 3 levels of nesting (if/for/while)
- Early returns preferred
- Guard clauses at top

## Error Handling

```typescript
// ✅ Correct: Domain errors
try {
  const schema = await createSchema.execute(input);
} catch (error) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }
  throw error; // Unexpected errors bubble up
}
```

## Testing

- Unit tests for domain logic
- Integration tests for repositories
- E2E tests for critical paths
- Coverage > 80% for domain layer

## Documentation

- JSDoc for public APIs
- README for each module
- Spec files (.md) for each feature
