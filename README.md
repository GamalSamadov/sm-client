# Student Management System

A Next.js application for managing student information with keyboard shortcuts, built with Next.js, TanStack Query, Tailwind CSS, and shadcn/ui.

## Features

- Add new students with their personal information and enrolled lessons
- Delete students from the system
- Update student information
- View detailed student information including enrolled lessons
- Keyboard shortcuts for quick actions
  - `a` - Add a new student
  - `d` - Delete a student
  - `u` - Update student information
  - `s` - View student information

## API Integration

This application connects to a backend API at `https://sm-api-962561856383.europe-west1.run.app` that provides the following endpoints:

### Students

- `GET /students` - Get all students
- `GET /students/:id` - Get a student by ID
- `POST /students` - Add a new student
- `PUT /students` - Update a student
- `DELETE /students/:id` - Delete a student

### Lessons

- `GET /lessons` - Get all lessons
- `GET /lessons/:id` - Get a lesson by ID
- `POST /lessons` - Add a new lesson
- `PUT /lessons` - Update a lesson
- `DELETE /lessons/:id` - Delete a lesson

## Technologies Used

- Next.js (App Router)
- React 19
- TanStack Query for data fetching and management
- Axios for API requests
- Tailwind CSS for styling
- shadcn/ui for UI components
- TypeScript for type safety

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=https://sm-api-962561856383.europe-west1.run.app
```

## Usage

Once the application is running, you can use keyboard shortcuts to perform various operations:

1. Press `a` to add a new student
2. Press `d` to delete a student
3. Press `u` to update student information
4. Press `s` to view student information

Each operation will open a modal with the corresponding form or display.
