Here’s a clean, well-organized, and **verbose README.md** for your **Team Sync** project that you can use directly on GitHub:

---

# 🧠 Team Sync

**Team Sync** is a modern, collaborative project management tool designed to help teams plan, track, and manage work seamlessly across multiple workspaces. Whether you're managing a startup or organizing team tasks in a classroom, Team Sync makes collaboration intuitive, organized, and efficient.

---

## 🚀 Live Demo
👉 **[Live Site](https://team-sync-tnath.vercel.app/)**

---

## 📸 UI Preview

![Team Sync Screenshot](https://drive.google.com/uc?export=view&id=1lfKAWwceBhuCNYTqIRq1LCLgNWceQ-_s)


## 🧩 Database Schema

![TeamSync ERD](https://drive.google.com/uc?export=view&id=1MK8VbsTkySUQNvCQ_yQELK7neEmsvNOO)


## 🌟 Features

### 🔐 Authentication & Authorization
- Google Sign-In using OAuth 2.0
- Traditional Email/Password login
- Secure JWT-based session handling
- Role-based access control (Owner, Admin, Member)
- Authentication powered by **Passport.js**

### 🏢 Workspaces & Team Collaboration
- Create and manage **multiple workspaces**
- Invite members via email
- Assign roles to team members
- Manage workspace-specific projects and tasks

### 📊 Project & Task Management
- Create, update, delete **projects**
- Nested **tasks** with:
  - Status: Todo, In Progress, Done
  - Priority: Low, Medium, High
  - Assignee: Assign to workspace members
- Commenting and collaboration (coming soon!)

### 🔍 Advanced UI/UX
- Filters by status, priority, assignee
- Pagination + “Load More” for infinite scrolling
- URL as state manager using `nuqs`
- Real-time feedback using toast notifications

### 📈 Dashboard & Analytics
- Visual overview of task statuses
- Aggregated metrics using **MongoDB Aggregation Pipeline**

### 🧪 Developer Experience
- 🌱 **Seeding** for dummy test data
- 💾 **Mongoose Transactions** for atomic operations
- 🧰 Backend structured with **Service Object Pattern** for clean, maintainable code
- 🔐 Environment-specific configs via `.env`

---

## 🛠️ Tech Stack

### 🔙 Backend
- **Node.js + Express.js** – REST API development
- **MongoDB + Mongoose** – Document database with robust querying
- **Passport.js** – OAuth and local authentication strategies
- **Zod** – Input validation
- **TypeScript** – Static type checking

### 🔧 Backend Patterns
- **Service Object Model** – Modular and testable business logic
- **MongoDB Aggregation Pipelines** – Analytics and filtering
- **Mongoose Transactions** – Reliable and consistent data changes

### 🔜 Frontend
- **React.js** – Component-based UI
- **TypeScript** – Strict typing for maintainable code
- **Zustand + Context API** – Local state management
- **React Query** – API state & cache management
- **React Hook Form + Zod** – Beautiful and robust form handling
- **Nuqs** – State persistence via URL
- **Shadcn UI + Tailwind CSS** – Styled, reusable UI components
- **Vite** – Blazing fast frontend tooling
