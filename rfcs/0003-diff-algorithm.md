# RFC 0003: Diff Algorithm

**Status**: Accepted  
**Date**: 2024-06-26  
**Author**: SchemaFlow Team

## Summary

Algorithm for computing structural differences between JSON Schema versions.

## Requirements

- Detect added, removed, modified properties
- Show path to each change (dot notation)
- Identify breaking changes
- Handle nested objects and arrays

## Algorithm

### Recursive Comparison

```typescript
function diff(from: any, to: any, path = ''): Change[] {
  if (typeof from !== typeof to) {
    return [{ path, type: 'type_changed', oldValue: from, newValue: to }];
  }
  
  if (typeof from !== 'object' || from === null) {
    if (from !== to) {
      return [{ path, type: 'modified', oldValue: from, newValue: to }];
    }
    return [];
  }
  
  // Compare object keys recursively
  // Compare array items by index
}
```

### Breaking Change Detection

A change is **breaking** if:
1. Required field removed from `required` array
2. Field type changed
3. New required field added

### Path Notation

- Root: empty string or "root"
- Property: "properties.email"
- Array item: "required[2]"
- Nested: "properties.address.properties.street"

## Implementation

Located in: `packages/server/src/modules/diff/diff.service.ts`

```typescript
interface Change {
  path: string;
  type: 'added' | 'removed' | 'modified' | 'type_changed';
  oldValue?: any;
  newValue?: any;
}

interface DiffResult {
  fromVersion: { id: string; versionNumber: number };
  toVersion: { id: string; versionNumber: number };
  hasBreakingChanges: boolean;
  changes: Change[];
  summary: { added: number; removed: number; modified: number };
}
```

## Limitations

1. **Structural only**: Doesn't understand semantic meaning
   - Changing `minimum: 0` to `minimum: 18` is "modified"
   - We don't know it's "stricter validation"

2. **Array handling**: Compares by index
   - Reordering items shows as many changes
   - Alternative (by value) would miss true reordering

## Future Improvements

- Semantic diff (understand validation intent)
- Array item identification (not just index)
- Custom rule detection (e.g., "added regex pattern")
