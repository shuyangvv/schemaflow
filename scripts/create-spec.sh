#!/bin/bash

# Create a new feature spec
# Usage: ./scripts/create-spec.sh <feature-name> <number>

set -e

if [ $# -lt 2 ]; then
    echo "Usage: $0 <feature-name> <number>"
    echo "Example: $0 user-auth 004"
    exit 1
fi

FEATURE_NAME=$1
NUMBER=$2
SPEC_DIR="specs/${NUMBER}-${FEATURE_NAME}"

if [ -d "$SPEC_DIR" ]; then
    echo "Error: $SPEC_DIR already exists"
    exit 1
fi

mkdir -p "$SPEC_DIR"

cat > "$SPEC_DIR/spec.md" << 'EOF'
# Spec: [Feature Name]

## Background

Why this feature is needed.

## Goal

What we want to achieve.

## Requirements

### Functional Requirements

1. **Requirement 1**
   - Detail 1
   - Detail 2

2. **Requirement 2**
   - Detail

### Non-Functional Requirements

- Performance: < Xms
- Scale: Y records

## Out of Scope

What's explicitly not included.

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## UI Requirements

If applicable.
EOF

cat > "$SPEC_DIR/design.md" << 'EOF'
# Design: [Feature Name]

## Domain Model

### Entities

**EntityName**
- Attribute: type (description)
- Invariant: rules

### Value Objects

**ValueObjectName**
- Validation rules

## Architecture

### Layers

**Domain**
- What goes here

**Application**
- What goes here

**Infrastructure**
- What goes here

## API Design

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/xxx | ... |

### Request/Response

```json
{
  "example": "schema"
}
```

## Database

### Schema

```prisma
// definitions
```

## Trade-offs

### Option A vs Option B
- Chose A because...
EOF

cat > "$SPEC_DIR/tasks.md" << 'EOF'
# Tasks: [Feature Name]

Reference: [spec.md](./spec.md), [design.md](./design.md)

## Task 1: [Name]
**Size**: S/M/L
**Depends on**: None/Task X

### Description
What to implement.

### Files
- `path/to/file.ts`: what to add

### Acceptance Criteria
- [ ] Criterion 1

---

## Execution Order

```
Phase 1
├── Task 1
└── Task 2
```

## Verification

### Manual Testing
1. Step 1
2. Step 2
EOF

cat > "$SPEC_DIR/review.md" << 'EOF'
# Code Review: [Feature Name]

## Summary
- **Scope**: 
- **Status**: ⏳ Pending

## Ratings

TBD after implementation.
EOF

echo "✅ Created spec at $SPEC_DIR"
echo ""
echo "Next steps:"
echo "1. Edit $SPEC_DIR/spec.md"
echo "2. Create design with Architect Agent"
echo "3. Create tasks with Planner Agent"
