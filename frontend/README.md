# React TypeScript Vite Boilerplate

A reusable frontend starter template built with **React**, **TypeScript**, and **Vite**.

This boilerplate provides a clean and scalable project structure with common frontend configurations to help you start building modern web applications faster.

## Features

* React 19
* TypeScript
* Vite
* React Router
* Axios Configuration
* ESLint
* Prettier
* Environment Variable Setup
* Scalable Folder Structure

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS (Optional)
* React Router
* Axios

## Project Structure

```text
src/
│
├── api/
│   └── axios.ts
│
├── assets/
│
├── components/
│
├── hooks/
│
├── layouts/
│
├── pages/
│
├── routes/
│
├── services/
│
├── types/
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

## Running the Application

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Linting

Check code quality:

```bash
npm run lint
```

Automatically fix issues:

```bash
npm run lint:fix
```

## Folder Guidelines

### Components

Reusable UI components.

Example:

```
components/
├── Button.tsx
└── Modal.tsx
```

### Pages

Application pages connected to routes.

Example:

```
pages/
├── Home.tsx
└── Login.tsx
```

### Services

API-related functions.

Example:

```
services/
└── authService.ts
```

### Hooks

Reusable React hooks.

Example:

```
hooks/
└── useAuth.ts
```

### Types

Shared TypeScript interfaces and types.

Example:

```
types/
└── user.ts
```

## License

MIT
