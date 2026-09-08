# Debugging Workflow

When debugging:

1. Reproduce and understand the reported behavior.
2. Identify the expected result.
3. Identify the actual result.
4. Trace the smallest relevant data flow.
5. Inspect the relevant frontend/backend/database boundaries.
6. Find the first point where actual behavior diverges from expected behavior.
7. Explain the root cause before proposing a fix.

Always distinguish:

- Root cause
- Contributing factor
- Symptom

Do not fix only the symptom when the root cause can be identified.

For API issues, inspect only the relevant:
- Route
- Validator
- Controller
- Service
- Repository
- Prisma query
- Frontend API call
- Frontend state/update logic

Do not inspect unrelated modules unless required by evidence.