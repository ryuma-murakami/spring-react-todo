# Spring React TODO App

A full-stack TODO application built with **Spring Boot (Java)** for the backend and **React + TypeScript + Vite + Tailwind CSS** for the frontend.

---

## Features

- Add, edit, and delete tasks  
- Soft delete (move tasks to trash)  
- Restore tasks from trash  
- Permanently delete trashed tasks  
- Mark tasks as completed  
- Responsive UI with Tailwind CSS  
- REST API built with Spring Boot  
- Database persistence (PostgreSQL)

## Backend Setup (Spring Boot + Gradle)

```bash
cd backend

# Run the backend
./gradlew bootRun

# Build the backend
./gradlew build
```

## Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run ESLint and Prettier checks
npm run lint
npm run format
```
