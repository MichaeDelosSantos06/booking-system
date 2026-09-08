# Architecture Rules

- Prefer simple solutions over complex abstractions.
- Follow existing project patterns.
- Do not duplicate logic when an existing utility or service already handles it.
- Keep business logic out of UI components when it belongs in hooks/services.
- Keep database logic inside repositories/services according to existing project conventions.
- Keep request validation explicit.
- Preserve type safety.
- Avoid premature optimization.
- Avoid unnecessary abstraction.
- Avoid unrelated refactoring while solving a specific issue.
- Prefer minimal, maintainable changes.