//Example adapted from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
import express from "express";
import session from "express-session";
import { config } from "dotenv";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import argon2 from "argon2";

config();

const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`

//Connect to redis cloud
const redisClient = createClient({
  url: redisURL,
});
redisClient.on('ready', () => console.log('Connected to Redis Cloud'));
redisClient.on('error', (err) => console.error('Redis connection error:', err));
await redisClient.connect();

//Set up session store
const sessionStore = new RedisStore({
  client: redisClient,
  name: "redis_session",
  ttl: 86400, //One day expiration
});

const userCollection = "users";
const sessionCollection = "sessions";

const app = express(),
  port = process.env.PORT || 8080;

app.use(
  session({
    store: sessionStore,
    prefix: sessionCollection,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 10, //10 minutes
      httpOnly: true,
    }, //One hour expiration
    resave: false,
    saveUninitialized: false,
  })
);

// Check auth middleware
const checkAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  }
  res.status(401).send("Not logged in or session expired");
  // res.redirect("/login.html"); // Redirect to login page
};

// parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve the HTML files
app.use(express.static("views"));

//Landing page
app.get("/profile", checkAuth, (req, res) => {
  if (req.session.userid) {
    res.send(`<h1>Profile Page</h1>
      <p>Welcome ${req.session.userid}</p>
      <a href='/logout'>Logout</a>`);
  }
});

const updateSession = (req, user) => {
  req.session.isLoggedIn = true;
  req.session.userid = user.username;
  req.session.save();
};

//Sign Up
app.post("/signup", async (req, res) => {
  const newUser = {
    username: req.body.username,
    password: await argon2.hash(req.body.password),
  }
  if (await redisClient.hGet(`${userCollection}:${req.body.username}`, "user")) {
    return res.status(400).send("User already exists");
  }
  try {
    await redisClient.hSet(`${userCollection}:${req.body.username}`, "user", JSON.stringify(newUser));
    updateSession(req, newUser);
    console.log(`User ${newUser.username} created`);
    return res.json({username: newUser.username});
  } catch (error) {
    console.error(error);
    return res.send("Error creating user");
  }
});

//Login
app.post("/login", async (req, res) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/profile");
  }
  const data = await redisClient.hGet(`${userCollection}:${req.body.username}`, "user");
  if (!data) {
    return res.status(400).send("User does not exist");
  }
  const user = JSON.parse(data);
  if (req.body.username == user.username && await argon2.verify(user.password, req.body.password)) {
    updateSession(req, user);
    res.redirect("/profile");
  } else {
    res.redirect("failed_login_redirect.html");
  }
});

//Delete session
app.get("/logout", checkAuth, (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
