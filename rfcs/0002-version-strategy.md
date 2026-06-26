# RFC 0002: Version Strategy

**Status**: Accepted  
**Date**: 2024-06-26  
**Author**: SchemaFlow Team

## Summary

Define versioning strategy: sequential integers vs semantic versioning vs git hashes.

## Options Considered

### Option A: Sequential Integers (1, 2, 3...)

**Pros:**
- Simple and intuitive
- Easy to order and compare
- Short for communication ("v5")
- Maps directly to creation order

**Cons:**
- No semantic meaning
- Can't tell if change is breaking from number alone

### Option B: Semantic Versioning (1.0.0, 1.1.0, 2.0.0)

**Pros:**
- Indicates breaking changes
- Industry standard

**Cons:**
- Requires manual classification
- Harder to auto-generate
- May conflict with user intent

### Option C: Git-style Hashes

**Pros:**
- Content-addressable
- No collision possible

**Cons:**
- Not human-friendly
- Hard to communicate ("version abc1234")
- No ordering

## Decision

**Chose**: Option A - Sequential Integers

**Primary reason**: Human-friendly for communication

**Additional design:**
- Use Release tags for semantic meaning ("v1.0", "stable")
- Diff engine detects breaking changes automatically
- User can document intent in changeSummary

## Implementation

```prisma
model Version {
  versionNumber Int    // Sequential: 1, 2, 3...
  content       String // Full JSON content
  hash          String // Content hash for dedup
}
```

## Migration Path

If semantic versioning needed later:
- Add `semanticVersion` field to Version
- Let users set it via Release tags
- Keep `versionNumber` for internal ordering
