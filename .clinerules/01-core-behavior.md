# Core Cline Behavior

## Investigation
- Analyze the user's exact problem before changing anything.
- Start with the smallest relevant scope.
- Prefer files, functions, routes, services, hooks, schemas, and types directly related to the issue.
- Do not scan the entire repository unless the issue requires cross-module investigation.
- Expand the scope only when evidence shows it is necessary.

## Before Coding
- First explain:
  1. What is happening.
  2. Why it is happening.
  3. The specific code causing it.
  4. What should be changed.
- Clearly separate confirmed findings from assumptions.
- If information is insufficient, ask before implementing.

## Changes
- Never modify code immediately unless the user explicitly approves implementation.
- First provide a concrete step-by-step solution.
- Each step must state:
  - Action
  - Why it is needed
  - What problem it solves
- Prefer the smallest safe change.
- Do not rewrite unrelated code.

## Dependencies
- Never install, remove, upgrade, or replace packages without explicit approval.
- Prefer existing dependencies and project utilities.
- Do not introduce a library when the problem can be solved with the current stack.

## Implementation
- After approval, implement only the agreed solution.
- Preserve existing architecture, naming, patterns, and UI unless instructed otherwise.
- Do not make unrelated refactors.

## Verification
- After changes, verify the affected behavior.
- Report what was changed, what was verified, and any remaining risks.