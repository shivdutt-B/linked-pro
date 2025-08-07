# LinkedPro

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)](https://www.prisma.io/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646cff)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Overview

**LinkedPro** is a modern, full-featured social networking platform inspired by LinkedIn, built with a scalable architecture using React, Vite, TailwindCSS, Node.js, Express, and Prisma. It supports rich user profiles, posts, comments, connections, trending topics, and more—all with a beautiful, responsive UI.

---

## 🗂️ Project Structure

```
client/
  src/
    components/
      home/
      nav/
      profile/
      connections/
      saved/
      ui/
    hooks/
    pages/
    slice/
    store/
    layout/
    lib/
    ...
  public/
  package.json
  tailwind.config.ts
  vite.config.ts
  ...
server/
  src/
    controllers/
      auth/
      post/
      profile/
      connections/
    middlewares/
    routes/
    utils/
  prisma/
    schema.prisma
    migrations/
  package.json
  index.js
  ...
```

---

## ✨ Features

- **Section-based Profile Editing**: About, Experience, Education, Skills, Header
- **End-to-End Post System**: Create, view, delete, like/unlike, comment, save/unsave, pagination
- **Live Comments**: Minimal UI, avatars, live count update
- **Connection System**: Send, accept, reject, disconnect, notifications, network list
- **Trending Topics**: Filter feed by trending topics
- **Responsive Navigation**: Modern, mobile-friendly, with saved posts and notifications
- **Suggested Users**: Sidebar with suggested users and quick profile view
- **Saved Posts**: Save/unsave posts, view all saved posts in a dedicated section
- **Authentication**: JWT-based, secure routes and actions
- **Prisma ORM**: Robust, scalable database layer
- **Beautiful UI**: Built with TailwindCSS and Lucide icons

---

## ⚡ Project Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (or your preferred database, update `prisma/schema.prisma` accordingly)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/linkedpro.git
cd linkedpro
```

### 2. Install dependencies
```bash
cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` in both `client/` and `server/` folders and fill in the required values (database URL, JWT secret, etc).

### 4. Set up the database
```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development servers
- In one terminal:
```bash
cd server
npm run dev
```
- In another terminal:
```bash
cd client
npm run dev
```

### 6. Open in your browser
Visit [http://localhost:5173](http://localhost:5173) for the frontend and [http://localhost:8080](http://localhost:8080) for the backend API.

