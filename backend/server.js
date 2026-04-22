const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET = "poll_secret_key"; // In production, move to .env

/* --- AUTH MIDDLEWARE --- */
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Login required" });
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

/* --- AUTH ROUTES --- */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hash],
      (err) => {
        if (err)
          return res.status(400).json({ message: "Email already exists" });
        res.json({ message: "Registered successfully" });
      },
    );
  } catch {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email=?", [email], async (err, rows) => {
    if (err || !rows || rows.length === 0)
      return res.status(400).json({ message: "User not found" });
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET);
    res.json({ token, name: user.name, userId: user.id });
  });
});

/* --- POLL ROUTES --- */

// GET ALL POLLS
app.get("/polls", (req, res) => {
  db.query("SELECT * FROM polls ORDER BY id DESC", (err, polls) => {
    if (err || !polls || polls.length === 0) return res.json([]);
    const ids = polls.map((p) => p.id);
    db.query(
      `SELECT * FROM poll_options WHERE poll_id IN (${ids.join(",")})`,
      (err2, options) => {
        if (err2) return res.json([]);
        const finalPolls = polls.map((poll) => ({
          ...poll,
          options: options
            .filter((o) => o.poll_id === poll.id)
            .map((o) => ({
              id: o.id,
              text: o.option_text,
              image: o.image_url,
              votes: o.votes,
            })),
        }));
        res.json(finalPolls);
      },
    );
  });
});

// GET SPECIFIC POLL RESULTS (Requirement Met)
app.get("/polls/:id/results", (req, res) => {
  const pollId = req.params.id;
  db.query("SELECT question FROM polls WHERE id = ?", [pollId], (err, poll) => {
    if (err || poll.length === 0)
      return res.status(404).json({ message: "Poll not found" });
    db.query(
      "SELECT id, option_text as text, votes FROM poll_options WHERE poll_id = ?",
      [pollId],
      (err2, options) => {
        const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
        res.json({
          question: poll[0].question,
          results: options,
          totalVotes: totalVotes,
        });
      },
    );
  });
});

// CREATE POLL
app.post("/polls", (req, res) => {
  const { question, options } = req.body;
  let userId = null;
  const token = req.headers.authorization;
  if (token) {
    try {
      userId = jwt.verify(token, SECRET).id;
    } catch {}
  }
  db.query(
    "INSERT INTO polls(user_id,question) VALUES(?,?)",
    [userId, question],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Failed to create poll" });
      const pollId = result.insertId;
      const optionValues = options.map((opt) => [
        pollId,
        opt.text,
        opt.image || "",
        0,
      ]);
      db.query(
        "INSERT INTO poll_options(poll_id, option_text, image_url, votes) VALUES ?",
        [optionValues],
        (err2) => {
          if (err2)
            return res.status(500).json({ message: "Failed to save options" });
          res.json({ message: "Poll created" });
        },
      );
    },
  );
});

// VOTE ON POLL (Prevention of Double Voting Met)
app.post("/polls/:id/vote", (req, res) => {
  const pollId = req.params.id;
  const { optionId, guestId, userId } = req.body;
  db.query(
    "INSERT INTO votes (poll_id, user_id, guest_id) VALUES (?, ?, ?)",
    [pollId, userId || null, guestId || null],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(403).json({ message: "Already voted" });
        return res.status(500).json({ message: "Vote failed" });
      }
      db.query(
        "UPDATE poll_options SET votes=votes+1 WHERE id=?",
        [optionId],
        (err2) => {
          if (err2) return res.status(500).json({ message: "Update failed" });
          res.json({ message: "Vote counted" });
        },
      );
    },
  );
});

// DELETE POLL
app.delete("/polls/:id", (req, res) => {
  db.query("DELETE FROM polls WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "Deleted" });
  });
});

/* --- DASHBOARD ROUTE --- */
app.get("/dashboard", verifyToken, (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT COUNT(*) AS created FROM polls WHERE user_id=?",
    [userId],
    (err, rows) => {
      const created = rows?.[0]?.created || 0;
      db.query(
        "SELECT (SELECT COUNT(*) FROM polls) AS total, (SELECT COUNT(*) FROM votes WHERE user_id=?) AS voted",
        [userId],
        (err2, rows2) => {
          const stats = rows2?.[0];
          res.json({
            name: req.user.name,
            pollsCreated: created,
            pollsVoted: stats?.voted || 0,
            remaining: (stats?.total || 0) - created,
          });
        },
      );
    },
  );
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
