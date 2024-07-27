const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Foods = require("./models/foodsModel");
const Activities = require("./models/activitiesModel");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// ROOT ROUTES

// GETS
app.get("/", (req, res) => {
  res.send("Hello node API");
});

// USER ROUTES

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
    console.log(err.message);
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

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:admin@csc-318-project.ywpdsjw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=CSC-318-Project"
  )
  .then(() => {
    console.log("Connected to mongoDB");
    app.listen(3000, () => {
      console.log("Node API app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
