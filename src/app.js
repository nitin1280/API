const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Simulated in-memory data (replace with actual database calls)
const leaderboardData = [
    { userId: 1, username: "ROCK", score: 100 },
    { userId: 2, username: "JHON", score: 90 },
    // ... (add more data)
];

const userCountryData = [
    { userId: 1, country: "USA" },
    { userId: 2, country: "Canada" },
    // ... (add more data)
];

// Middleware to parse JSON requests
app.use(express.json());

// Display current week leaderboard (Top 200)
app.get("/leaderboard", (req, res) => {
    const top200Leaderboard = leaderboardData.slice(0, 200);
    res.json(top200Leaderboard);
});

// Display last week leaderboard given a country by the user (Top 200)
app.get("/lastWeekLeaderboard/:country", (req, res) => {
    const country = req.params.country;
    const countryLeaderboard = leaderboardData
        .filter(user => userCountryData.find(u => u.userId === user.userId && u.country === country))
        .slice(0, 200);

    res.json(countryLeaderboard);
});

// Fetch user rank, given the userId
app.get("/userRank/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = leaderboardData.find(user => user.userId === userId);

    if (user) {
        const userRank = leaderboardData.findIndex(u => u.userId === userId) + 1;
        res.json({ userId, userRank });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
