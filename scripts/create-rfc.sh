#!/bin/bash

# Create a new RFC
# Usage: ./scripts/create-rfc.sh <title> <number>

set -e

if [ $# -lt 2 ]; then
    echo "Usage: $0 <title> <number>"
    echo "Example: $0 'new-database' 0004"
    exit 1
fi

TITLE=$1
NUMBER=$2
FILENAME="rfcs/${NUMBER}-${TITLE}.md"

if [ -f "$FILENAME" ]; then
    echo "Error: $FILENAME already exists"
    exit 1
fi

cat > "$FILENAME" << EOF
# RFC ${NUMBER}: $(echo "$TITLE" | sed 's/-/ /g' | sed 's/.*/\u&/')

**Status**: Draft
**Date**: $(date +%Y-%m-%d)
**Author**: Your Name

## Summary

One paragraph explanation.

## Motivation

Why are we doing this?

## Design

Detailed explanation.

## Trade-offs

Options considered, decision made.

## Rejected Alternatives

Why other options were rejected.

## Future Considerations

What might change later.

## References

Links to related specs or PRs.
EOF

echo "✅ Created RFC at $FILENAME"
