# 🎓 Student Management System

A modern, keyboard-driven Next.js application for efficiently managing student information with powerful features and a sleek interface. Built with cutting-edge technologies for the best user experience.

## ✨ Features

### 👤 Student Management

- ➕ Add new students with comprehensive personal information
- 🗑️ Delete students from the system with confirmation
- 📝 Update existing student information with real-time validation
- 🔍 View detailed student profiles including all enrolled lessons
- 📊 Browse students with an intuitive, responsive table interface

### 📚 Lesson Management

- 📋 Manage course lessons directly from the interface
- 🔄 Assign multiple lessons to students
- ⚡ Quick lesson creation and assignment workflow
- 📅 Track lesson enrollments across students

### ⌨️ Keyboard Superpower

- Work efficiently with intuitive keyboard shortcuts:
  - `a` - Add a new student
  - `d` - Delete a student
  - `u` - Update student information
  - `s` - View student details
  - `?` - Show help dialog with all shortcuts
  - `l` - Manage lessons

### 🧠 Smart UX Features

- 🌙 Responsive design that works on all devices
- 🔔 Toast notifications for action confirmations
- ❓ Interactive help dialog with keyboard shortcut reference
- 🛡️ Form validation to prevent data errors
- ⚡ Optimistic UI updates for a snappy feel

## 🔌 API Integration

This application seamlessly connects to a robust backend API at [server side app](https://github.com/GamalSamadov/sm-api) that provides the following endpoints:

### 👥 Students API

- `GET /students` - Fetch all students
- `GET /students/:id` - Retrieve a specific student by ID
- `POST /students` - Create a new student record
- `PUT /students` - Update an existing student's information
- `DELETE /students/:id` - Remove a student from the database

### 📚 Lessons API

- `GET /lessons` - Retrieve all available lessons
- `GET /lessons/:id` - Get detailed information about a specific lesson
- `POST /lessons` - Create a new lesson
- `PUT /lessons` - Update lesson information
- `DELETE /lessons/:id` - Remove a lesson from the system

## 🛠️ Technologies Used

- 🚀 **Next.js** (App Router) - The React framework for production
- ⚛️ **React 19** - The latest version with optimized rendering
- 🔄 **TanStack Query** - For efficient data fetching, caching, and state management
- 📡 **Axios** - For reliable API communication
- 🎨 **Tailwind CSS** - For utility-first styling with minimal CSS
- 🧩 **shadcn/ui** - Beautiful, accessible UI components
- 📝 **TypeScript** - For type safety and improved developer experience

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application in action!

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=https://sm-api-962561856383.europe-west1.run.app
```

## 📱 Usage Guide

Once the application is running, you'll be presented with an intuitive interface for managing students and lessons:

### ⌨️ Keyboard Shortcuts

The application is designed to be used primarily with keyboard shortcuts for maximum efficiency:

1. Press `a` to add a new student with personal details and lesson selections
2. Press `d` to delete a student (with confirmation dialog)
3. Press `u` to update student information including enrolled lessons
4. Press `s` to view detailed student information including all enrollments
5. Press `l` to manage lessons in the system
6. Press `?` at any time to view the help dialog with all available shortcuts

Each operation will open a modal with the corresponding form or display.

### 👆 Mouse Navigation

All functions are also accessible via the intuitive UI:

- Use the navigation buttons to move between different views

## 📝 Project Structure

```
src/
├── app/                # Next.js App Router structure
├── components/         # UI components
│   ├── student/        # Student-related components
│   └── ui/             # Core UI components (shadcn/ui)
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and constants
├── providers/          # Provider components
└── services/           # API services
```

## 🧪 Development

### Adding New Features

The modular architecture makes it easy to extend the application with new features:

1. Create new components in the appropriate directory
2. Add hooks for data fetching/manipulation
3. Update the keyboard shortcuts if needed
4. Connect to new API endpoints in the services directory

### Styling

The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the tailwind.config.js file
2. Extending component styles in the components/ui directory
3. Adding new CSS variables in the globals.css file

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [TanStack Query](https://tanstack.com/query) - For data fetching
- [shadcn/ui](https://ui.shadcn.com/) - For beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
