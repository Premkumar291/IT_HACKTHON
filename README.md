# Hackathon Registration Platform

Full-stack web app for hackathon registrations with an admin dashboard.

## Features

- **Frontend**: React + Vite + Tailwind + Framer Motion
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Uploads**:
  - Payment proof: image/PDF
  - PPT submission: **PDF only**
- **Admin dashboard**:
  - List/search registrations
  - View PPT PDF + payment proof
  - Delete registration

## Setup

### Server

```bash
cd server
npm install
```

Create `server/.env` (see `server/.env.example`):

```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
ADMIN_API_KEY=your_admin_key_here
```

Start:

```bash
npm start
```

### Client

```bash
cd client
npm install
npm run dev
```

## Admin

Open `http://localhost:5173/admin` and enter `ADMIN_API_KEY`.
