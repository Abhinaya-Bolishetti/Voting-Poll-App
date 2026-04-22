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
- One Vote Per User
- Live Vote Count
- Percentage Progress Bars
- Better Charts / Visual Results
- Delete Polls (Creator Only)

### 📈 Dashboard Features
- Polls Created
- Polls Voted
- Remaining Polls

---

## 🔒 Security & Control Features

- Only the poll creator can delete their poll
- Each user can vote only once per poll
- JWT-based authentication for users
  
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
  <img width="1133" height="672" alt="image" src="https://github.com/user-attachments/assets/6e17ae94-e8d9-470c-8f77-e02600165644" />

* Poll Results
  <img width="1034" height="673" alt="image" src="https://github.com/user-attachments/assets/16811ddf-64c5-4435-8149-9bbb142945d3" />

* Login/Register
  <img width="922" height="333" alt="image" src="https://github.com/user-attachments/assets/5670088e-3a72-49f0-b711-547b179df163" />
  
* Dashboard
  <img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/8ec05c52-6649-4e9b-9f97-e7b57d655fca" />


---

## 💡 Future Improvements

* Poll Expiry Date
* Search Polls
* Deploy Online

---

## 👨‍💻 Author

**Abhinaya Bolishetti**

GitHub: [https://github.com/Abhinaya-Bolishetti](https://github.com/Abhinaya-Bolishetti)
