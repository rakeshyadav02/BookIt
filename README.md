# BookIt: Experiences & Slots

A full-stack MERN application for booking travel experiences with time slot selection, promo code support, and real-time availability management.

## 🚀 Features

- **Experience Browsing**: Browse and explore various travel experiences
- **Slot Selection**: Select available dates and time slots for experiences
- **Booking System**: Complete booking with user information
- **Promo Codes**: Apply discount codes (SAVE10, FLAT100, etc.)
- **Real-time Availability**: Prevent double-booking with real-time slot availability
- **Responsive Design**: Modern, mobile-friendly UI built with TailwindCSS

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

### Quick Setup (Linux/macOS)

1. Clone the repository:
```bash
git clone <repository-url>
cd bookit
```

2. Run setup script:
```bash
chmod +x setup.sh
./setup.sh
```

3. Start the application:
```bash
chmod +x start.sh
./start.sh
```

### Manual Setup

#### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

# BookIt — Experiences Booking Platform

BookIt is a full-stack application for browsing and booking travel experiences with selectable dates and time slots, promo code support, and safeguards against double-booking.

This README gives a concise, actionable developer guide (Windows and Unix), seeding instructions, troubleshooting tips and the most important commands to get the app running locally.

Contents
- Features
- Requirements
- Quick start (Windows & Linux/macOS)
- Manual setup (server & client)
- Environment variables and MongoDB notes
- Database seeding
- Troubleshooting
- Contributing & License

---

## 🚀 Features

- Browse experiences with images, descriptions and available dates
- Select specific date/time slots and complete a booking
- Promo codes with percentage and flat discounts
- Real-time slot availability to avoid double bookings
- Responsive UI built with TailwindCSS and Vite (fast dev server)

## 📋 Requirements

- Node.js v16+ (v18+ or v20 recommended)
- npm (comes with Node) or yarn
- MongoDB (local) OR MongoDB Atlas (cloud)

## ⚡ Quick start (Windows PowerShell)

Open an elevated PowerShell (recommended) and run:

```powershell
# Setup backend and frontend dependencies and create .env from example
cd D:\BookIt
# Run server setup (installs packages and creates .env)
cd server
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }

# In a new terminal: start the server (dev)
cd D:\BookIt\server
npm run dev

# In another terminal: start the client
cd D:\BookIt\client
npm install
npm run dev
```

If you prefer Unix/macOS, use the `setup.sh` from the repo root:

```bash
./setup.sh
./start.sh
```

## Manual setup (detailed)

### Server (backend)

1. Install dependencies:

```bash
cd server
npm install
```

2. Create `.env` from the example and edit the values:

```bash
cp .env.example .env
# then edit .env to set MONGODB_URI and PORT
```

3. Start the server (dev):

```bash
npm run dev    # uses nodemon
# or: npm run server (start without nodemon)
```

### Client (frontend)

1. Install dependencies:

```bash
cd client
npm install
```

2. Start the Vite dev server:

```bash
npm run dev
```

If you want to run the client commands without changing directories you can use npm's `--prefix`:

```powershell
npm --prefix D:\BookIt\client run dev
```

## 🔐 Environment variables

Edit `server/.env` (example values shown):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<encoded-password>@cluster0.example.mongodb.net/BookIt?retryWrites=true&w=majority
NODE_ENV=development
```

- Important: URL-encode special characters in the password. Example: `rakesh@123` -> `rakesh%40123` (encode `@` as `%40`).
- For local MongoDB you can use `mongodb://127.0.0.1:27017/bookit`.

## 🗄️ Database seeding

Two ways to seed sample data (both insert experiences and slots):

From repo root (recommended):

```powershell
cd D:\BookIt\server
node seed.js
# or via npm script
npm run seed
```

The seed script is idempotent for development: it clears existing sample data and re-inserts examples.

## 🐞 Troubleshooting (common issues & fixes)

- Vite: "'vite' is not recognized" — run `npm install` in `client` or use `npx vite`.
- Postinstall error: `patch-package` not recognized — install it globally or as a devDependency and retry:

```powershell
npm install -g patch-package
# or from project: npm install -D patch-package
```

- Locked files / EPERM / EBUSY on Windows when removing `node_modules`:

	- Close editors or terminals that may hold files.
	- Kill node processes: `taskkill /F /IM node.exe /T` (PowerShell as Admin).
	- Remove node_modules in cmd: `rd /s /q node_modules` and delete `package-lock.json`.
	- Clear npm cache: `npm cache clean --force`.

- MongoDB connection refused (ECONNREFUSED): make sure a local `mongod` is running or use Atlas with the correct connection string and IP whitelist.

- SRV DNS error or malformed host (e.g., `querySrv ENOTFOUND _mongodb._tcp.123`): caused by unencoded `@` or other special chars in the password — URL-encode them.

If you hit an error during `npm install`, copy the npm log path reported (e.g. `%USERPROFILE%\AppData\Local\npm-cache\_logs\...`) and include it when asking for help.

## 🧪 Testing

- You can run the seed script to generate sample data and then use the UI to create bookings.
- API endpoints are under `/api` (see list below). Use Postman or curl for direct testing.

### Important API endpoints

- Experiences
	- `GET /api/experiences`
	- `GET /api/experiences/:id`
- Bookings
	- `POST /api/bookings`
	- `GET /api/bookings/:id`
- Promo
	- `POST /api/promo/validate`

## ♻️ Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit & push
4. Open a pull request

Please include a short description and steps to reproduce when opening issues or PRs.

## 📄 License

This project is licensed under the ISC License.

---


