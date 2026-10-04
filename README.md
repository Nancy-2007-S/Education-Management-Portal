# Education Management Portal

![Status](https://img.shields.io/badge/Status-Completed-emerald?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Admin-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**Education Management Portal (EduPortal)** is an autonomous, full-stack academic administration platform. It unifies student progress tracking, faculty class management, institutional metrics, and intelligent academic assistance into a single, cohesive web application.

## The Problem
Modern educational institutions often rely on fragmented software tools for attendance, grading, assignment distribution, and student risk tracking. This fragmentation leads to:
- Disconnected student progress records and delayed academic interventions.
- High administrative overhead for teachers managing multiple spreadsheets.
- Lack of real-time institutional telemetry for university administrators.

## The Solution
EduPortal consolidates academic management into a unified system by:
1. **Role-Based Portals**: Providing tailored workflows for Students, Teachers, and Administrators.
2. **Automated Progress Tracking**: Real-time calculation of GPAs, course progress, and assessment ledgers.
3. **Attendance & Absence Logs**: Subject-wise attendance tracking and monthly calendar ledgers with automated excuse workflows.
4. **Early Academic Risk Alerts**: Intelligent student risk monitoring highlighting students needing academic support.
5. **EduAI Assistant**: An integrated academic assistant providing instant guidance, study planning, and navigation assistance.

## Architecture & Tech Stack

This project follows a client-server architecture with role-based access control and integrated AI service fallbacks:

- **Frontend:** React 18, Vite, React Router v6, Lucide Icons, Custom CSS with Paper Buddy Design Tokens.
- **Backend:** Node.js, Express.js, Firebase Admin SDK (Realtime Database & Authentication).
- **Security:** Role-Based Access Control (RBAC) middleware for Student, Teacher, and Admin routes.

```mermaid
graph TD;
    User[User Client - Student / Teacher / Admin] --> Router[React Router v6]
    Router --> Views[Portal Views & Dashboards]
    
    Views --> API[Axios / REST API Gateway]
    API --> Auth[Firebase Auth & RBAC Middleware]
    
    Auth --> Controllers[Express Route Controllers]
    Controllers --> Services[Academic Data & AI Services]
    
    Services --> FirebaseDB[(Firebase Realtime Database)]
    Services --> EduAI[EduAI Assistant Engine]
```

## Repository Structure

```text
Education-Management-Portal/
├── client/                  # React SPA frontend application
│   ├── public/              # Static assets and vector icons
│   └── src/
│       ├── components/      # Reusable UI components and EduAI Bot
│       ├── pages/           # Admin, Student, and Teacher portal pages
│       ├── services/        # Client API services and mock handlers
│       └── index.css        # Paper Buddy design system tokens
└── server/                  # Node.js + Express backend service
    └── src/
        ├── config/          # Firebase Admin SDK initialization
        ├── controllers/     # Route handler logic
        ├── middleware/      # Authentication & RBAC protection
        └── services/        # Core business logic services
```

## Security & Data Safeguards

- **Role-Based Isolation**: Access control enforced at both route guard and Express middleware levels.
- **Secret Protection**: Firebase credentials and private environment keys are excluded via `.gitignore`.
- **Defensive Error Handling**: Optional chaining and fallback data initializations prevent unexpected rendering exceptions.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Client Setup (Frontend)
```bash
cd client
npm install
npm run dev
```

### 2. Server Setup (Backend)
```bash
cd ../server
npm install
npm run dev
```

## Demo Account Access

You can test the application instantly using the 1-Click Demo Login on the sign-in page:
- **Student Demo**: Access full student dashboard, GPA transcript, attendance logs, and EduAI tasks.
- **Teacher Demo**: Access faculty command center, assignment grading ledger, and student risk insights.
- **Admin Demo**: Access institutional analytics, user management, and system activity logs.


