![banner for ev](https://github.com/user-attachments/assets/9a82fefb-bffd-42de-ae36-52cc8f683bd3)


# ⚡ EV Charging Station Management App

A full-stack web application to manage EV charging stations — including user authentication, charger CRUD functionality, and a map view. Built using Vue.js, Node.js, Express, and MongoDB.

---

## 🚀 Live Demo

- 🔗 **Frontend**: [https://ev-charger-app.vercel.app](https://ev-charger-app.vercel.app)
- 🔗 **Backend API**: [https://ev-charger-backend-jnt3.onrender.com](https://ev-charger-backend-jnt3.onrender.com)

> 📌 Note: API routes are protected by JWT. Use the frontend UI to register/login and access protected features.

---

## 🧩 Features

- ✅ User Registration & Login (JWT-based authentication)
- ✅ Add, Edit, and Delete Charging Stations
- ✅ Filter stations by:
  - Status (Active/Inactive)
  - Connector Type (dynamically loaded)
  - Power Output (Min kW)
- ✅ View all stations on an interactive map (Leaflet + OpenStreetMap)
- ✅ Responsive UI (mobile and desktop friendly)
- ✅ Environment-based API integration using `.env`
- ✅ Fully deployed on Vercel (frontend) and Render (backend)

---

## 🛠️ Tech Stack

| Layer     | Technology       |
|-----------|------------------|
| Frontend  | Vue.js           |
| Backend   | Node.js + Express|
| Database  | MongoDB (Atlas)  |
| Auth      | JWT              |
| Deployment| Vercel + Render  |

---

## 📁 Folder Structure

ev-charger-app/
├── backend/      # Node.js + Express REST API
└── frontend/     # Vue.js application


---

## ⚙️ Setup Instructions (for Local Development)

### 📦 Backend Setup

(```bash)   # do not include brackets while doing setup
cd backend
npm install

Create a .env file in /backend with the following:
PORT=5500
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key

Then run:
npm start



💻 Frontend Setup
cd frontend
npm install

Create a .env file in /frontend with:
VITE_API_BASE_URL=https://ev-charger-backend-jnt3.onrender.com



Then run:
npm run dev



<img width="498" alt="Screenshot 2025-06-01 at 11 40 37 PM" src="https://github.com/user-attachments/assets/b7dc68e0-e1ea-4906-b835-faf908fc9aed" />




🗺️ Map Integration
	•	Uses Leaflet.js with OpenStreetMap.
	•	Charger stations are displayed as map markers.
	•	Marker click reveals charger details (name, status, power, connector).
	•	Filtering updates map markers dynamically.



 👨‍💻 Developed By

Abhishek Singh Rajawat
Contact: as.rajawat2114@gmail.com


📄 License

This project is open-source and developed for demonstration and educational purposes.




