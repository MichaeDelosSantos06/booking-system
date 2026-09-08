# Project Context

## Stack
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma
- Validation: Zod
- HTTP client: Axios
- Authentication: JWT + HTTP-only cookies
- File storage: Cloudinary

## Architecture
- Keep frontend and backend responsibilities separated.
- Follow existing project patterns before introducing new patterns.
- Reuse existing hooks, services, repositories, validators, components, and utilities.
- Do not introduce a new architectural pattern unless the existing architecture cannot reasonably support the requirement.

## Backend
Prefer the existing flow:

Route
→ Middleware
→ Controller
→ Service
→ Repository
→ Prisma

Keep validation close to the route/middleware layer.

## Frontend
Prefer the existing flow:

Page
→ Component
→ Hook
→ API
→ Backend

Reuse existing components and hooks before creating new ones.

## Dependencies
Use the existing package ecosystem.
Do not add dependencies without approval.