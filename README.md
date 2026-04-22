# 🗳️ Voting Poll App

A lightweight, full-stack application for real-time polling. Users can create custom polls with image support, cast instant votes, and track live analytics through visual charts and progress bars.

**Built with:** React.js, Node.js, Express.js, and MySQL.

-----

## 🚀 Core Features

### 👤 User Experience

  * **Authentication:** Secure registration and login using JWT.
  * **Personal Dashboard:** Overview of created polls, voting history, and activity.
  * **Instant Feedback:** Real-time vote counts and dynamic percentage bars.
  * **Visual Analytics:** Interactive charts for detailed result breakdowns.

### 📊 Poll Management

  * **Flexibility:** Create polls with multiple choices and optional image URLs for each option.
  * **Security:** Enforced one-vote-per-user logic and creator-only deletion rights.
  * **Discovery:** Browse all active polls from a centralized list.

-----

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, React Router DOM, Axios, CSS |
| **Backend** | Node.js, Express.js, JWT, bcryptjs |
| **Database** | MySQL |

-----

## 📂 Project Structure

```text
Voting-Poll-App/
├── backend/            # Express server & DB configuration
│   ├── server.js
│   └── db.js
├── src/                # Frontend source files
│   ├── components/     # Reusable UI elements (PollCard, etc.)
│   ├── pages/          # Application views (Dashboard, Login, List)
│   ├── App.js          # Routing & Logic
│   └── App.css         # Custom styling
```

-----

## ⚙️ Setup & Installation

### 1\. Database Configuration

Create a MySQL database named `pollapp` and run the following schema:

```sql
CREATE DATABASE pollapp;
USE pollapp;

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

### 2\. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3\. Frontend Setup

```bash
# In the root directory
npm install
npm start
```

*App will be live at `http://localhost:3000`*

-----

## 📸 Preview

\<p align="center"\>
\<b\>Home Page\</b\><br>
\<img src="[https://github.com/user-attachments/assets/51404f51-c810-4885-8f55-22765ccd198e](https://github.com/user-attachments/assets/51404f51-c810-4885-8f55-22765ccd198e)" width="700"\>
\</p\>

\<p align="center"\>
\<b\>Create Poll\</b\><br>
\<img src="[https://github.com/user-attachments/assets/6e17ae94-e8d9-470c-8f77-e02600165644](https://github.com/user-attachments/assets/6e17ae94-e8d9-470c-8f77-e02600165644)" width="700"\>
\</p\>

\<p align="center"\>
\<b\>Live Results\</b\><br>
\<img src="[https://github.com/user-attachments/assets/16811ddf-64c5-4435-8149-9bbb142945d3](https://github.com/user-attachments/assets/16811ddf-64c5-4435-8149-9bbb142945d3)" width="700"\>
\</p\>

\<p align="center"\>
\<b\>Dashboard\</b\><br>
\<img src="[https://github.com/user-attachments/assets/8ec05c52-6649-4e9b-9f97-e7b57d655fca](https://github.com/user-attachments/assets/8ec05c52-6649-4e9b-9f97-e7b57d655fca)" width="700"\>
\</p\>

-----

## 👨‍💻 Developer

**Abhinaya Bolishetti**

  * GitHub: [@Abhinaya-Bolishetti](https://github.com/Abhinaya-Bolishetti)
