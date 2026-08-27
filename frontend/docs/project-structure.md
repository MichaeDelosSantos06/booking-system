# Project / Folder Structure

The project follows a **hybrid feature-based architecture**. Feature-specific code is grouped together, while reusable UI components, utilities, and shared infrastructure remain in shared directories.

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers/
│
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Pagination.tsx
│       └── Toast.tsx
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   │
│   ├── classes/
│   │   ├── components/
│   │   │   ├── ClassTable.tsx
│   │   │   ├── ClassModal.tsx
│   │   │   ├── CreateClassForm.tsx
│   │   │   └── EditClassForm.tsx
│   │   ├── hooks/
│   │   │   └── useFetchClasses.ts
│   │   ├── services/
│   │   │   └── class.service.ts
│   │   └── types.ts
│   │
│   ├── members/
│   │   ├── components/
│   │   │   └── MembersTable.tsx
│   │   ├── hooks/
│   │   │   └── useFetchMembers.ts
│   │   ├── services/
│   │   │   └── member.service.ts
│   │   └── types.ts
│   │
│   ├── bookings/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   │
│   └── dashboard/
│       ├── components/
│       │   ├── StatsCard.tsx
│       │   ├── BookingActivity.tsx
│       │   └── UpcomingClasses.tsx
│       ├── hooks/
│       │   └── useDashboard.ts
│       ├── services/
│       │   └── dashboard.service.ts
│       └── types.ts
│
├── layouts/
│   └── AdminLayout.tsx
│
├── pages/
│   ├── LoginPage.tsx
│   ├── RegistrationPage.tsx
│   └── NotFoundPage.tsx
│
├── hooks/
│   └── useAuth.ts
│
├── services/
│   └── api.ts
│
├── types/
│   └── common.types.ts
│
├── utils/
│   ├── formatDate.ts
│   └── formatCurrency.ts
│
└── main.tsx
```
