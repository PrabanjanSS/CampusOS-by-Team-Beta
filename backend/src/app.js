require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const blogRoutes = require("./routes/blogRoutes");
const projectRoutes =
require("./routes/projectRoutes");
const announcementRoutes =
require("./routes/announcementRoutes");
const galleryRoutes =
require("./routes/galleryRoutes");
const leaderboardRoutes =
require("./routes/leaderboardRoutes");
const memberRoutes =
require("./routes/memberRoutes");
const reportRoutes =
require("./routes/reportRoutes");
const pollRoutes =
require("./routes/pollRoutes");


const app = express();


// Middlewares

app.use(cors());

app.use(express.json());


// Routes

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/events",
    eventRoutes
);


app.use(
    "/api/blogs",
    blogRoutes
);

app.use(

    "/api/projects",

    projectRoutes

);

app.use(

    "/api/announcements",

    announcementRoutes

);

app.use(

    "/api/gallery",

    galleryRoutes

);

app.use(

    "/api/leaderboard",

    leaderboardRoutes

);
app.use(

    "/api/members",

    memberRoutes

);



app.use(

    "/api/reports",

    reportRoutes

);

app.use(

    "/api/polls",

    pollRoutes

);

// Default Route

app.get("/", (req, res) => {

    res.send("CampusOS Backend is Running.");

});




module.exports = app;
