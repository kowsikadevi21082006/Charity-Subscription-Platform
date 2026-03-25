# 🏌️ Golf Charity Subscription Platform

## 🎯 Live Demo Links

* 🌐 **Frontend (Client-side)**
  https://charity-subscription-platform-o2eu.vercel.app

* ⚙️ **Backend (Server-side API)**
  https://charity-subscription-platform-3.onrender.com

## 📌 Overview

The Golf Charity Subscription Platform is a full-stack web application that allows users to:

* Subscribe to a monthly/yearly plan
* Enter their golf performance scores
* Participate in a monthly lucky draw
* Win prizes based on score matching
* Contribute a portion of their subscription to charity

This platform combines **gamification, subscription systems, and charity contributions** into a single modern web experience.

---

## 🎯 Problem Statement

Build a subscription-based platform where:

* Users enter their last 5 golf scores
* A monthly draw generates random numbers
* Users win rewards based on matching scores
* A portion of subscription revenue is donated to selected charities
* Admin manages users, draws, and payouts

---

## 🧠 How It Works

### 1. User Registration & Subscription

* Users sign up and log in
* Choose monthly or yearly subscription

---

### 2. Score Entry System

* Users enter golf scores (range: 1–45)
* Only the **latest 5 scores** are stored
* New score replaces the oldest automatically

---

### 3. Monthly Draw System

* System generates 5 random numbers
* These are compared with user scores

---

### 4. Winner Selection

| Match Count | Reward Type        |
| ----------- | ------------------ |
| 5 Matches   | Jackpot (40%)      |
| 4 Matches   | Medium Prize (35%) |
| 3 Matches   | Small Prize (25%)  |

* Jackpot rolls over if no winner

---

### 5. Charity Contribution

* User selects a charity
* Minimum 10% of subscription goes to charity
* Users can increase contribution percentage

---

### 6. Admin Panel

Admin can:

* Manage users
* Run monthly draws
* Verify winners
* Manage charities
* Track payouts

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* Supabase (PostgreSQL)

### Authentication

* JWT (JSON Web Token)

### Deployment

* Vercel (Frontend)
* Supabase (Database)


## 🔌 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Scores

* POST `/api/scores`
* GET `/api/scores`

### Subscription

* POST `/api/subscription`
* GET `/api/subscription`

### Draw

* POST `/api/draw/run` (Admin)
* GET `/api/draw/results`

### Charity

* GET `/api/charities`
* POST `/api/charity/select`

---

## 🧪 Testing Checklist

* ✅ User signup & login
* ✅ Score entry (only 5 stored)
* ✅ Subscription flow
* ✅ Draw system execution
* ✅ Winner calculation
* ✅ Charity selection
* ✅ Admin functionalities
* ✅ Responsive UI

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```
git clone <your-repo-url>
cd golf-charity-platform
```

---

### 2. Install Dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```

---

### 3. Run the Application

#### Backend

```
npm run dev
```

#### Frontend

```
npm run dev
```

---

## 🔐 Key Features

* Secure authentication (JWT)
* Rolling 5-score logic
* Random draw engine
* Prize distribution system
* Charity contribution integration
* Admin dashboard
* Fully responsive UI

---

## 🏆 Final Outcome

This project demonstrates:

* Full-stack development skills
* System design & architecture
* Real-world feature implementation
* Clean UI/UX design
* Problem-solving ability

---

## 👨‍💻 Author

**Kowsika Devi**

---
