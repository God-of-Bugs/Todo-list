# React Todo List

A modern, responsive Todo List application built with React and Vite. Converted from a vanilla JavaScript implementation into a component-based single-page application with complete CRUD functionality, filter views, due-date tracking, and local storage persistence.

## Live Demo

- **GitHub Pages**: [https://god-of-bugs.github.io/Todo-list/](https://god-of-bugs.github.io/Todo-list/)

## Features

- **Add tasks**: Create new tasks with optional due dates and Enter key submission.
- **Edit tasks**: Seamless inline editing with keyboard shortcuts (Enter to save, Escape to cancel).
- **Delete tasks**: Remove tasks by their stable unique identifier.
- **Complete/pending status**: Toggle task completion with clear visual indicators (strike-through and dimmed styling).
- **All / Pending / Completed filters**: Filter views with live count badges and active states.
- **Due dates**: Optional due-date tracking with human-readable formatting and overdue indicators for pending tasks.
- **Task statistics & cleanup**: Real-time counter of total, pending, and completed tasks with a "Clear Completed" action.
- **localStorage persistence**: Automatic data persistence under the `todos` key with backward-compatible migration for legacy data and error recovery.
- **Responsive & accessible design**: Mobile-first layout adaptable from 320px to desktop screens with accessible keyboard navigation and semantic HTML.

## Tech Stack

- **React** (Functional components & hooks)
- **JavaScript** (ES6+)
- **CSS** (Custom modern styles with responsive layout)
- **Vite** (Build tool and development server)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone or navigate into the repository:
   ```bash
   cd Todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```

### Production Build

Create an optimized production bundle:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```
