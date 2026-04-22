# 🗳️ Voting Poll App

A full-stack web application where users can create polls, vote instantly, and view live results.

Built using **React.js**, **Node.js**, **Express.js**, and **MySQL**.

---

## 🚀 Features

### 👤 User Features
- User Registration
- User Login with JWT Authentication
- Personal Dashboard
- Logout Functionality

### 📊 Poll Features
- Create Polls
- Add Multiple Options
- Optional Image URL for Poll Choices
- View All Polls
- Vote on Polls
- Live Vote Count
- Percentage Progress Bars
- Delete Polls

### 📈 Dashboard Features
- Polls Created
- Polls Voted
- Remaining Polls

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs

### Database
- MySQL

---

## 📂 Project Structure

```text id="t6p2cn"
Voting-Poll-App/
│── backend/
│   ├── server.js
│   ├── db.js
│
│── src/
│   ├── components/
│   │   └── PollCard.js
│   │
│   ├── pages/
│   │   ├── CreatePoll.js
│   │   ├── PollList.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Dashboard.js
│   │
│   ├── App.js
│   └── App.css
````

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash id="g9y4la"
git clone https://github.com/Abhinaya-Bolishetti/Voting-Poll-App.git
cd Voting-Poll-App
```

---

### 2️⃣ Install Frontend Dependencies

```bash id="m2a8pd"
npm install
```

---

### 3️⃣ Install Backend Dependencies

```bash id="n4s7qy"
cd backend
npm install
```

---

## 🗄️ MySQL Setup

Create database:

```sql id="f7r3uw"
CREATE DATABASE pollapp;
USE pollapp;
```

Create tables:

```sql id="c1v8ex"
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE polls (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  question TEXT
);

CREATE TABLE poll_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  poll_id INT,
  option_text VARCHAR(255),
  image_url TEXT,
  votes INT DEFAULT 0
);
```

---

## ▶️ Run Project

### Start Backend

```bash id="x7t5ne"
cd backend
node server.js
```

### Start Frontend

```bash id="h6m1zb"
npm start
```

Open:

```text id="r4p9ok"
http://localhost:3000
```

---

## 📸 Screenshots

Add screenshots here after uploading:

* Home Page
  <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/51404f51-c810-4885-8f55-22765ccd198e" />


* Create Poll
* Poll Results
* Login/Register
* Dashboard

---

## 💡 Future Improvements

* One Vote Per User
* Creator Only Delete
* Better Charts
* Poll Expiry Date
* Search Polls
* Dark Mode
* Deploy Online

---

## 👨‍💻 Author

**Abhinaya Bolishetti**

GitHub: [https://github.com/Abhinaya-Bolishetti](https://github.com/Abhinaya-Bolishetti)

---

## ⭐ If You Like This Project

Give this repository a star.

```
