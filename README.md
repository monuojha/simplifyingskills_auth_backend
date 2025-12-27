# Student Registration Backend

Simple Node.js + Express + MongoDB API for registering students with validation.

## Features
- REST API with Express
- Mongoose schema + validation
- Password hashing (bcrypt)
- Auto timestamps
- OTP & refresh token fields (future use)

## Tech Stack
- Node.js, Express, Mongoose, MongoDB
- bcrypt, nodemon, nodemailer

## Project Structure
auth-backend/
├── src/
│   ├── config/     (db.js, mailer.js)
│   ├── controllers/(authController.js)
│   ├── middleware/ (auth & error)
│   ├── models/     (User.js)
│   ├── routes/     (authRoutes.js)
│   └── index.js
├── .env
├── .gitignore
└── package.json

## Installation
1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd auth-backend

Install dependencies:Bashnpm install
Create .env:envPORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/student-registration
Run the server:Bash# Development
npm run dev

# Production
npm start

Server runs at http://localhost:3000.
Scripts (package.json)
JSON"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
Usage
POST /register
Example body:
JSON{
  "studentName": "John Doe",
  "class": "10",
  "school": "Greenwood High",
  "address": "123 Main St",
  "mobile": "9876543210",
  "email": "john@example.com",
  "gender": "Male",
  "password": "securepass123"
}
Security

Passwords hashed with bcrypt
Unique mobile & email
