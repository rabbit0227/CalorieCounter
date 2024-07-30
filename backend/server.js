require("dotenv").config(); // Load the environment variables

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const User = require("./models/userModel");
const Foods = require("./models/foodsModel");
const Activities = require("./models/activitiesModel");

const app = express();
//app.use(express.urlencoded({ extended: false }));

// app.use(express.json());

// Use CORS middleware
app.use(
  cors({
    origin: "https://calorie-counter-weld.vercel.app", // Allow only this origin
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../src")));
//app.use(express.static(path.join(__dirname, '../scripts')));
app.use("/scripts", express.static(path.join(__dirname, "../scripts")));
console.log(path.join(__dirname, "../src"));
console.log(path.join(__dirname, "../scripts/homepage.js"));
console.log(path.join(__dirname, "../index.html"));
// ROOT ROUTES

// GETS
app.get("/", (req, res) => {
  //res.send("Hello node API");
  res.sendFile(path.join(__dirname, "../src/index.html"));
  //res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get("/aboutus", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/aboutus.html"));
});
app.get("/calorieCalculator", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/calorieCalculator.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/signin.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/signup.html"));
});

// USER ROUTES

// User Authentication
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// User Registration
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .send("Username already exists. Please choose a different username.");
    }

    // Create new user
    const user = await User.create({ username, password, email });

    //res.status(201).json(user);
    //goes to the calculator
    res.redirect("/calorieCalculator.html");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    console.log(username);
    if (!user) {
      return res.status(400).send("Username is incorrect.");
    }

    console.log(password);
    console.log(user.password);

    if (password !== user.password) {
      return res.status(400).send("Password is incorrect.");
    }

    // Successful sign-in
    res.redirect("/calorieCalculator.html");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    // we cannot find any user in database
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// FOODS ROUTES

// GET ALL

app.get("/foods", async (req, res) => {
  try {
    const foods = await Foods.find({});
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID

app.get("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Foods.findById(id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST

app.post("/foods", async (req, res) => {
  try {
    const food = await Foods.create(req.body);
    res.status(200).json(food);
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT

app.put("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Foods.findByIdAndUpdate(id, req.body);
    // we cannot find any user in database
    if (!food) {
      return res
        .status(404)
        .json({ message: `cannot find any food with ID ${id}` });
    }
    const updatedFoods = await Foods.findById(id);
    res.status(200).json(updatedFoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Foods.findByIdAndDelete(id);
    if (!food) {
      return res
        .status(404)
        .json({ message: `cannot find any user with ID ${id}` });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ACTIVITIES ROUTES

// GET ALL

app.get("/activities", async (req, res) => {
  try {
    const activities = await Activities.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID

app.get("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findById(id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST

app.post("/activities", async (req, res) => {
  try {
    const activity = await Activities.create(req.body);
    res.status(200).json(activity);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT

app.put("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findByIdAndUpdate(id, req.body);
    // we cannot find any user in database
    if (!activity) {
      return res
        .status(404)
        .json({ message: `cannot find any activity with ID ${id}` });
    }
    const updatedActivities = await Activities.findById(id);
    res.status(200).json(updatedActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete("/activities/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activities.findByIdAndDelete(id);
    if (!activity) {
      return res
        .status(404)
        .json({ message: `cannot find any activity with ID ${id}` });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB using the environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
