# 🎓 EduPortal — Next-Gen Education Management Portal

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Admin%20SDK-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

> A unified, modern, role-based education management system featuring full-stack portals for **Students**, **Teachers**, and **Administrators**, powered by **EduAI Insights**, dynamic performance analytics, and a standardized Paper Buddy design system.

---

## 🌟 Highlights & Key Features

### 🎓 1. Student Portal
* **Dynamic Student Dashboard**: StatCards for Cumulative GPA (`3.78`), Enrolled Courses (`4`), Attendance Rate (`94.2%`), and Study Streak (`14 Days`).
* **Course Directory & Active Progress**: Visual progress tracking for `CS201: Data Structures & Algorithms`, `MATH302: Calculus III`, `PHYS202: General Physics II`, and `CS204: DBMS`.
* **Grades & GPA Transcript**:
  * Interactive **Course GPA Directory** with instant course selection.
  * **Assessment Ledger Breakdown**: Detailed component weights (Quizzes 15%, Labs 35%, Midterm 25%, Final 25%), numerical scores, and visual performance progress indicators.
  * **Provisional Grade Alerts**: Verified university board verification notices.
* **Attendance & Log Directory**:
  * **Subject-wise Attendance Logs**: Formatted table with percentage progress indicators and status badges (`Good Standing`, `Satisfactory`, `Needs Attention`).
  * **Monthly Calendar Grid**: Day-by-day attendance status ledger with interactive excuse request modal.
* **EduAI Recommended Tasks**: Interactive study task checklist with priority chips and one-click completion.

---

### 👨‍🏫 2. Teacher & Faculty Dashboard
* **Faculty Command Center**: StatCards tracking Total Enrolled Students (`142`), Classes Taught (`4`), Active Assignments (`6`), Average Attendance (`92.4%`), and Pending Grading (`18`).
* **Quick Action Bar**: One-click launchers for `+ New Assignment`, `Mark Attendance`, `Enter Marks`, and `AI Insights`.
* **Assignment Management Ledger**:
  * Directory of all class assignments with submission counting, search, and category filters (`All`, `Pending`, `Graded`).
  * **Submissions Ledger**: Detailed student submission breakdown with file attachments, status tags (`Submitted`, `Late`, `Graded`), score input, and grading actions.
* **Attendance & Roster Tracking**: Mark daily class attendance with present/absent toggles and instant history logs.
* **AI Student Performance Insights**: Automated risk detection alerts highlighting students needing academic assistance.

---

### 🏛️ 3. Administrator Dashboard
* **Institutional Metrics**: High-level telemetry covering Total Students (`1,240`), Active Faculty (`86`), Departments (`12`), System Uptime (`99.8%`), and Revenue/Grants.
* **Administrative Actions**: Instant modal tools for `Add Student`, `Add Teacher`, `System Audit Logs`, and `Data Backup`.
* **Department Distribution & Logs**: Department performance breakdowns and live system activity logs.

---

### 🤖 4. EduAI Floating Assistant
* **Smart Academic Bot**: Floating AI assistant available across all pages offering course advice, GPA calculation assistance, study schedule optimizations, and portal navigation help.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** + **Vite** | Fast, reactive SPA architecture with Instant HMR |
| **Styling & UI** | **Custom CSS & Tailwind** | EduPortal Paper Buddy Theme (`#FF6B00` primary), glassmorphism, HSL color tokens |
| **Icons & Media** | **Lucide Icons** | Clean, accessible vector icons throughout the interface |
| **Backend API** | **Node.js** + **Express** | RESTful endpoints for courses, grades, attendance, and user authentication |
| **Database & Auth** | **Firebase Admin SDK** | Realtime Database & Firebase Authentication with RBAC middleware |
| **Routing** | **React Router v6** | Declarative client-side routing with `ProtectedRoute` guards |

---

## 📁 Project Architecture

```
education-management-portal/
├── client/                      # Frontend Application (React + Vite)
│   ├── public/                  # Public assets, favicon, icons
│   ├── src/
│   │   ├── assets/              # Logos, brand imagery
│   │   ├── components/          # Reusable UI components (Navbar, Modals, AI Bot)
│   │   ├── config/              # Firebase & API client configurations
│   │   ├── pages/
│   │   │   ├── admin/           # Admin Dashboard & Management views
│   │   │   ├── student/         # Student Dashboard, Attendance, Grades, Courses
│   │   │   ├── teacher/         # Teacher Dashboard, Assignments, Attendance, AI Insights
│   │   │   └── Login.jsx        # Role-based 1-Click Authentication page
│   │   ├── services/            # API services & mock database fallback handlers
│   │   ├── App.jsx              # Main router & theme provider
│   │   └── index.css            # Global EduPortal design system & CSS tokens
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend Service (Node.js + Express)
│   ├── src/
│   │   ├── config/              # Firebase Admin SDK initialization & environment fallbacks
│   │   ├── controllers/         # Student, Teacher, Admin, and Auth controllers
│   │   ├── middleware/          # JWT / Firebase Auth & Role-Based Access Control (RBAC)
│   │   ├── services/            # Academic data, attendance, and exam services
│   │   └── app.js               # Express application entry point
│   ├── package.json
│   └── .env.example             # Safe environment variable template
│
├── .gitignore                   # Comprehensive security isolation rules
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 1. Clone Repository
```bash
git clone https://github.com/Nancy-2007-S/Education-Management-Portal.git
cd Education-Management-Portal
```

### 2. Launch Client (Frontend)
```bash
cd client
npm install
npm run dev
```
> Client runs locally at `http://localhost:5173`

### 3. Launch Server (Backend)
```bash
cd ../server
npm install
npm run dev
```
> Server runs locally at `http://localhost:5000`

---

## 🔒 Security & Privacy Features

- **Strict Environment Isolation**: Sensitive keys (such as `serviceAccountKey.json`, `.env.local`, and private tokens) are excluded via `.gitignore`.
- **Role-Based Access Control (RBAC)**: Enforced via Express middleware (`authMiddleware` & `roleMiddleware`) to restrict access to Student, Teacher, and Admin endpoints.
- **Defensive Data Handling**: Safe optional chaining and fallback initializations prevent runtime errors when rendering missing data fields.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Developed with ❤️ for the **Buildathon Education Portal Challenge**.
