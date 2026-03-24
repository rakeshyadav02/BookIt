# BookIt — Experiences Booking Platform

A full-stack MERN application for discovering and booking travel experiences with real-time slot selection, promo code support, and safeguards against double-booking.

---

## 🌟 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Assumptions & Bonus Features](#assumptions--bonus-features)
4. [Project Structure](#project-structure)
5. [Screenshots](#screenshots)
6. [Setup & Installation](#setup--installation)
7. [Database Seeding](#database-seeding)
8. [API Endpoints](#api-endpoints)
9. [Deployment](#deployment)
10. [Deployment Links](#deployment-links)
11. [Environment Variables](#environment-variables)
12. [Security Best Practices](#security-best-practices)
13. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## 🎯 Features

- 🌍 **Browse Experiences** – Explore travel experiences with descriptions and availability
- 📅 **Smart Slot Selection** – Select specific dates and time slots in real-time
- 🎟️ **Booking Management** – Complete bookings with user information capture
- 🏷️ **Promo Codes** – Apply discount codes for percentage and flat-rate discounts
- 🔒 **Prevent Double-Booking** – Real-time availability updates ensure slot integrity
- 📱 **Responsive Design** – Mobile-friendly UI with TailwindCSS and Vite hot-reload

---

## 🛠️ Tech Stack

- React 18 + Vite
- TailwindCSS
- Express.js
- MongoDB Atlas
- Mongoose

---

## 🧩 Assumptions & Bonus Features

**Assumptions:**
- No user authentication (all bookings are anonymous for demo purposes)
- All promo codes are hardcoded and validated server-side
- MongoDB Atlas cluster is secured and credentials are not exposed
- Only public API endpoints are accessible; no admin or sensitive endpoints are exposed
- Frontend and backend are deployed on separate platforms (Vercel/Render)

**Bonus Features:**
- Real-time slot availability updates to prevent double-booking
- Responsive UI with TailwindCSS
- Promo code system supporting both percentage and flat discounts
- Database seeding script for quick demo setup
- CORS configured to allow only trusted frontend domains
- Error handling middleware for clean API responses

---

## 📂 Project Structure

```
BookIt/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Details, Checkout, Result)
│   │   ├── context/        # React Context (BookingContext)
│   │   ├── hooks/          # Custom hooks (useFetch)
│   │   └── services/       # API client (Axios)
│   └── tailwind.config.js
│
├── server/                 # Node.js + Express backend
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── server.js       # Server entry point
│   │   ├── config/         # Database config
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Error handling
│   │   ├── utils/          # Utilities (promo codes)
│   │   └── scripts/        # Database seeding
│   └── .env.example
│
├── README.md               # This file
└── .gitignore
```

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)

### Checkout
![Checkout Page](./screenshots/checkout.png)

### Booking Confirmation
![Confirmation](./screenshots/booking.png)

---

## ⚡ Setup & Installation

### Prerequisites

- **Node.js** v18+ (v20+ recommended)
- **npm** (included with Node.js) or yarn
- **MongoDB** – Local instance or MongoDB Atlas (cloud) cluster

### Clone & Install

```bash
git clone https://github.com/rakeshyadav02/BookIt.git
cd BookIt

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Configure Environment

Create `server/.env` file in the server directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000
```

Create `client/.env` file in the client directory:
```
VITE_API_BASE_URL=http://localhost:5000
```

For MongoDB Atlas:
- Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Add your IP to Network Access
- Get the connection string from "Connect" button

### Start Development Servers

**Option 1: Separate Terminals**
```bash
# Terminal 1 - Backend (from BookIt/server)
npm run dev

# Terminal 2 - Frontend (from BookIt/client)
npm run dev
```

**Option 2: Single Command (Windows PowerShell)**
```powershell
.\start.ps1
```

**Option 3: Single Command (Linux/macOS)**
```bash
chmod +x start.sh
./start.sh
```

The app will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

---

## 🗄️ Database Seeding

Populate the database with sample experiences and time slots:

```bash
cd server
npm run seed
```

**What it creates:**
- 5 sample experiences (e.g., Scuba Diving, Hot Air Ballooning)
- 175 time slots across various dates
- Clears previous seed data (idempotent)

---

## 🔗 API Endpoints

### Experiences
- `GET /api/experiences` – List all experiences
- `GET /api/experiences/:id` – Get experience details with slots

### Bookings
- `POST /api/bookings` – Create a new booking
- `GET /api/bookings/:id` – Retrieve booking confirmation

### Promo Codes
- `POST /api/promo/validate` – Validate and apply promo code

---

## 🚀 Deployment

### Frontend
Deploy to Vercel, Netlify, or GitHub Pages:
```bash
npm run build
# Output in dist/
```

### Backend
Deploy to Heroku, Railway, or Azure:
- Set environment variables on hosting platform
- Ensure MongoDB URI points to Atlas cluster
- Run `npm install && npm start`

---

## 📝 Environment Variables

| Variable      | Example Value                                      | Description                        |
|---------------|----------------------------------------------------|------------------------------------|
| `PORT`        | `5000`                                             | Server port                        |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/BookIt` | MongoDB connection string (private)|
| `NODE_ENV`    | `development`                                      | Set to `production` for deployment |
| `CORS_ORIGINS` | `http://localhost:3000,https://your-frontend.vercel.app` | Allowed frontend origins (comma separated) |
| `VITE_API_BASE_URL` | `http://localhost:5000`                      | Frontend API base URL              |
| `PROMO_CODES_JSON` | `{"SAVE10":{"type":"percentage","value":10}}` | Optional promo code override JSON |
| `SEED_TIME_SLOTS` | `09:00,10:00,11:00,14:00` | Optional slot times override for seed script |

---

## 🔒 Security Best Practices

- **Never commit `.env`** – It's in `.gitignore` for a reason
- **Rotate credentials** if exposed accidentally
- **Use environment variables** for all sensitive data in production
- **URL-encode special characters** in MongoDB passwords (e.g., `@` → `%40`, `#` → `%23`)
- **Use strong passwords** for database access
- **Whitelist IPs** in MongoDB Atlas for production environments

---

## ❓ Troubleshooting & FAQ

**Q: I get a CORS error when accessing the API from the frontend.**  
A: Ensure your frontend domain is included in `CORS_ORIGINS` in `server/.env`, then restart the backend.

**Q: MongoDB connection fails.**  
A: Double-check your `MONGODB_URI` in the `.env` file. Make sure your IP is whitelisted in MongoDB Atlas and credentials are correct.

**Q: API requests return 404 or 500 errors.**  
A: Confirm the backend is running and accessible. Check logs on Render for errors. Ensure the API base URL in the frontend matches the deployed backend URL.

**Q: Booking fails or slots are unavailable.**  
A: Slots may be fully booked or the database may need reseeding. Run `npm run seed` in the server directory to reset demo data.

**Q: How do I keep my data secure?**  
A: Never commit `.env` files or credentials. Use environment variables for all secrets. Only share public endpoints and restrict access to sensitive routes.

---

## 🚀 Live Demo

- **Frontend Demo:** [https://book-it-navy.vercel.app/](https://book-it-navy.vercel.app/)
- **Backend API:** [https://bookit-gbne.onrender.com/](https://bookit-gbne.onrender.com/)

*Visit the frontend link to interact with the app. The backend API is public for demo/testing purposes only and exposes only non-sensitive endpoints.*

---




