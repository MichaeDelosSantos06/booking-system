---
name: debug-and-fix
description: Carefully investigate and fix bugs in the existing codebase. Use when debugging incorrect behavior, API issues, data mismatches, frontend/backend inconsistencies, or unexpected results.
---

# Debug and Fix

## Phase 1 — Understand
Identify:
- Expected behavior
- Actual behavior
- User's specific scenario

Do not modify code.

## Phase 2 — Investigate
Start from the smallest relevant scope.

Trace only the necessary data flow.

Inspect:
- Relevant caller
- Relevant function
- Relevant API
- Relevant validation
- Relevant service
- Relevant database query
- Relevant state/update logic

Expand scope only when evidence requires it.

## Phase 3 — Findings
Report:

### Root Cause
What specifically causes the problem.

### Evidence
Which code/data flow proves it.

### Why It Happens
Explain the behavior clearly.

### Scope
List the files/functions that actually need changes.

## Phase 4 — Solution
Before editing, provide numbered steps.

For every step explain:
- Action
- Reason
- Problem solved

Use the existing architecture and dependencies.

## Phase 5 — Approval
Do not edit files or install dependencies until the user approves the proposed solution.

## Phase 6 — Implementation
Implement only the approved changes.

Avoid unrelated refactoring.

## Phase 7 — Verification
Verify the affected behavior and report:
- Changes made
- Verification performed
- Remaining concerns