# BookIt — Experiences Booking Platform

A full-stack MERN application for discovering and booking travel experiences with real-time slot selection, promo code support, and safeguards against double-booking.

**Tech Stack:** React 18 + Vite | TailwindCSS | Express.js | MongoDB Atlas | Mongoose

---

## 🎯 Features

- 🌍 **Browse Experiences** – Explore travel experiences with descriptions and availability
- 📅 **Smart Slot Selection** – Select specific dates and time slots in real-time
- 🎟️ **Booking Management** – Complete bookings with user information capture
- 🏷️ **Promo Codes** – Apply discount codes for percentage and flat-rate discounts
- 🔒 **Prevent Double-Booking** – Real-time availability updates ensure slot integrity
- 📱 **Responsive Design** – Mobile-friendly UI with TailwindCSS and Vite hot-reload

---

## 📋 Prerequisites

- **Node.js** v18+ (v20+ recommended)
- **npm** (included with Node.js) or yarn
- **MongoDB** – Local instance or MongoDB Atlas (cloud) cluster

---

## ⚡ Quick Start

### Clone & Install (All Platforms)

```bash
git clone https://github.com/YOUR_USERNAME/BookIt.git
cd BookIt

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### Configure Environment

1. Create `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/BookIt
   NODE_ENV=development
   ```
   **Note:** URL-encode special characters in your password (e.g., `@` → `%40`)

2. For MongoDB Atlas:
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
│   ├── seed.js             # Seed entry point
│   └── .env.example
│
├── README.md               # This file
└── .gitignore
```

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

## 🐞 Troubleshooting

| Issue | Solution |
|-------|----------|
| `'vite' is not recognized` | Run `npm install` in `client/` directory |
| `'patch-package' not found` | Install globally: `npm install -g patch-package` |
| EBUSY/EPERM on Windows | Kill node: `taskkill /F /IM node.exe /T` (as Admin), then `npm install` |
| MongoDB connection error | Verify `.env` URI, check IP whitelist in Atlas, ensure password is URL-encoded |
| `querySrv ENOTFOUND` | URL-encode special characters: `@` → `%40`, `:` → `%3A` |

**For detailed debugging:** Check npm log at `%APPDATA%\npm-cache\_logs\` (Windows) or `~/.npm/_logs/` (Unix)

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

## 📝 Environment Variables Reference

| Variable | Example | Notes |
|----------|---------|-------|
| `PORT` | `5000` | Server port |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/BookIt` | MongoDB connection string |
| `NODE_ENV` | `development` | Set to `production` for deployment |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## 📞 Support

- Found a bug? Open an [Issue](https://github.com/YOUR_USERNAME/BookIt/issues)
- Have a question? Start a [Discussion](https://github.com/YOUR_USERNAME/BookIt/discussions)

---

**Last Updated:** November 2025  
**Author:** Your Name  
**Repository:** [GitHub Link](https://github.com/YOUR_USERNAME/BookIt)
