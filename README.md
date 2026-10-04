# Education Management Portal

A full-stack, role-based education management web application designed for students, teachers, and administrators. Built with React, Vite, Express, and Firebase.

## Overview

Education Management Portal is a comprehensive platform that simplifies academic workflows for educational institutions. The application provides dedicated dashboards and tools customized for three distinct user roles: Students, Teachers, and Administrators, supported by an intelligent academic assistant.

## Key Features

### Student Portal
- **Interactive Dashboard**: View cumulative GPA, active course count, overall attendance percentage, and current study streak.
- **Course Progress Tracking**: Access enrolled courses with visual progress indicators and syllabus completion status.
- **Grades & GPA Ledger**: Course GPA directory with weighted assessment breakdowns (quizzes, labs, exams), score percentages, and provisional grade notices.
- **Attendance Management**: Subject-wise attendance breakdown and an interactive monthly calendar view with excuse request options.
- **AI Study Recommendations**: Automated study task checklist prioritizing daily assignments and review topics.

### Teacher Dashboard
- **Faculty Command Center**: Real-time metrics covering total enrolled students, active courses, pending assignment grading, and average class attendance.
- **Quick Action Bar**: Shortcuts for creating assignments, marking attendance, entering marks, and opening class analytics.
- **Assignment Submissions Ledger**: Filterable assignment directory and submission ledger with online grading capability.
- **Class Rosters & Attendance**: Real-time class attendance logging and historical logs.
- **Performance Risk Alerts**: Automated indicators highlighting students who need additional academic assistance.

### Admin Portal
- **Institutional Telemetry**: Executive metrics covering active students, faculty count, department distribution, and system health.
- **Administrative Control**: User management tools for adding students and teachers, system audit logs, and data backups.
- **Department Analytics**: Department enrollment breakdowns and system activity logs.

### EduAI Assistant
- **Floating AI Assistant**: Contextual academic bot offering course guidance, study schedule advice, and portal navigation assistance.

## Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Custom CSS with Paper Buddy Design System

### Backend
- **Server**: Node.js with Express.js
- **Database & Auth**: Firebase Realtime Database and Firebase Authentication
- **Security**: Role-Based Access Control (RBAC) middleware

## Repository Structure

```
Education-Management-Portal/
├── client/                  # React + Vite frontend application
│   ├── public/              # Static assets and icons
│   ├── src/
│   │   ├── assets/          # Application branding assets
│   │   ├── components/      # Reusable UI components
│   │   ├── config/          # Client-side configuration
│   │   ├── pages/           # Admin, Student, and Teacher page views
│   │   ├── services/        # API and data services
│   │   ├── App.jsx          # Router & layout entry point
│   │   └── index.css        # Core design system and styles
│   ├── package.json
│   └── vite.config.js
│
└── server/                  # Express.js backend application
    ├── src/
    │   ├── config/          # Firebase Admin SDK setup
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Auth and role protection middleware
    │   ├── services/        # Business logic services
    │   └── app.js           # Server application entry point
    ├── package.json
    └── .env.example         # Environment template
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Nancy-2007-S/Education-Management-Portal.git
   cd Education-Management-Portal
   ```

2. Start the Frontend (Client):
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Start the Backend (Server):
   ```bash
   cd ../server
   npm install
   npm run dev
   ```

---

Designed and developed by **Nancy S.**
