# Request for Comments (RFCs)

This directory contains Architecture Decision Records (ADRs) following the RFC process.

## What is an RFC?

An RFC (Request for Comments) is a document that:
- Proposes a significant change or design
- Explains the motivation and trade-offs
- Seeks feedback before implementation
- Becomes documentation of decisions

## When to Write an RFC

Write an RFC for:
- ✅ Major architectural changes
- ✅ New dependencies or technologies
- ✅ Breaking API changes
- ✅ Security-related changes
- ✅ Design patterns that affect multiple features

Don't write an RFC for:
- ❌ Bug fixes
- ❌ Minor refactorings
- ❌ Adding a single endpoint
- ❌ UI-only changes

## RFC Lifecycle

```
Draft → Review → Accepted/Rejected → Implemented/Abandoned
```

### Draft
Author writes RFC, seeks early feedback.

### Review
Community reviews, discusses, suggests changes.

### Accepted
RFC approved, implementation can begin.

### Rejected
RFC not approved, document why.

### Implemented
Code merged, RFC serves as documentation.

### Superseded
New RFC replaces this one.

## RFC Structure

```markdown
# RFC XXXX: Title

**Status**: Draft | Review | Accepted | Rejected | Implemented | Superseded
**Date**: YYYY-MM-DD
**Author**: Name <email>
**Supersedes**: RFC YYYY (if applicable)
**Superseded by**: RFC ZZZZ (if applicable)

## Summary

One paragraph explaining the proposal.

## Motivation

Why are we doing this? What problem does it solve?

## Design

Detailed explanation of the proposed solution.

## Trade-offs

### Option A: [Chosen]
Pros:
- Benefit 1
Cons:
- Drawback 1

### Option B: [Alternative]
Pros:
- Benefit 1
Cons:
- Drawback 1

Decision: Chose Option A because...

## Rejected Alternatives

Other approaches considered and why rejected.

## Implementation

Rough plan for implementation.

## Future Considerations

What might change or be added later.

## References

Links to related specs, issues, PRs.
```

## Creating an RFC

```bash
./scripts/create-rfc.sh my-proposal 0004
```

Edit `rfcs/0004-my-proposal.md` following the template.

## Current RFCs

| Number | Title | Status | Date |
|--------|-------|--------|------|
| 0001 | Domain Model | ✅ Accepted | 2024-06-26 |
| 0002 | Version Strategy | ✅ Accepted | 2024-06-26 |
| 0003 | Diff Algorithm | ✅ Accepted | 2024-06-26 |

## Status Definitions

| Status | Meaning | Next Step |
|--------|---------|-----------|
| **Draft** | Author writing, early feedback | Submit for review |
| **Review** | Open for community feedback | Address comments |
| **Accepted** | Approved for implementation | Start coding |
| **Rejected** | Not approved | Document why |
| **Implemented** | Code merged | Reference in docs |
| **Superseded** | Replaced by newer RFC | Link to successor |

## Review Process

1. **Author** creates RFC as Draft
2. **Author** seeks feedback (PR, issue, discussion)
3. **Maintainers** review within 1 week
4. **Discussion** continues until consensus
5. **Decision**: Accept, Request Changes, or Reject
6. **Implementation** begins (if accepted)

## Review Checklist

Reviewers should check:

- [ ] Problem is clearly stated
- [ ] Solution is well-explained
- [ ] Trade-offs are considered
- [ ] Alternatives are documented
- [ ] Breaking changes are marked
- [ ] Implementation plan is feasible
- [ ] Future considerations noted

## Integration with Specs

RFCs and Specs work together:

```
RFC (Architecture) → Spec (Feature) → Tasks (Implementation)
     ↓                      ↓                ↓
  "Why SQLite?"       "How schema CRUD?"   "Implement repo"
```

RFCs answer strategic questions.
Specs answer tactical questions.

## Example: Version Strategy

See [0002-version-strategy.md](0002-version-strategy.md):

- Problem: How to version schemas?
- Options: Sequential integers, semantic versioning, git hashes
- Decision: Sequential integers for MVP
- Reasoning: Human-friendly, simple, sufficient

This RFC guides all version-related specs.

## Questions?

- Read existing RFCs for examples
- See [Spec-Driven Development](../docs/guides/03-spec-driven-development.md)
- Open a GitHub Discussion for questions
