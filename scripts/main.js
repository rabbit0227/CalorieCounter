// Define global variables for food and activity data
let foods = [];
let activities = [];
let isLoggedIn = false; // Track login status

const apiUrl = "https://calorie-counter-weld.vercel.app";

// Function to fetch and load food data from the server
async function loadFoods() {
  try {
    const response = await fetch(`${apiUrl}/foods`);
    console.log("Foods response status:", response.status); // Log status
    if (!response.ok) throw new Error("Failed to load foods.");
    foods = await response.json();
    console.log("Foods loaded:", foods); // Log the loaded foods
  } catch (error) {
    console.error("Error loading foods:", error);
  }
}

// Function to fetch and load activity data from the server
async function loadActivities() {
  try {
    const response = await fetch(`${apiUrl}/activities`); // Updated to use server route
    console.log("Activities response status:", response.status); // Log status
    if (!response.ok) throw new Error("Failed to load activities.");
    activities = await response.json();
    console.log("activities loaded:", activities); // Log the loaded foods
  } catch (error) {
    console.error("Error loading activities:", error);
  }
}

// Initialize the application after data is loaded
async function initializeApp() {
  try {
    await loadFoods();
    await loadActivities();

    // Check login status from localStorage
    isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("Login status:", isLoggedIn); // Debug log

    updateAuthButton(); // Update the button based on login status

    // Enable calculate button after data is loaded
    const calculateButton = document.querySelector(
      "button[onclick='calculateCalories()']"
    );
    if (calculateButton) {
      calculateButton.disabled = false;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

// Function to calculate calories burned based on activity
function calculateCaloriesBurned(activityName, duration) {
  const selectedActivity = activities.find(
    (item) => item.name.toLowerCase() === activityName.toLowerCase()
  );
  if (!selectedActivity) {
    console.error(`Activity '${activityName}' not found.`);
    return 0;
  }

  const caloriesPerMinute = selectedActivity.calories_bpm;
  return caloriesPerMinute * duration;
}
// Function to calculate BMR using Revised Harris-Benedict Equation
function calculateBMR(weight, height, age = 25, gender = "male") {
  if (gender === "female") {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }
  return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
}

// Function to calculate calories based on selected food and activity
function calculateCalories() {
  // Check if foods and activities are loaded
  if (foods.length === 0 || activities.length === 0) {
    console.error("Foods or activities not loaded.");
    return;
  }

  // Retrieve inputs
  const selectedFoodName = document.getElementById("foodInput").value.trim();
  const selectedActivityName = document
    .getElementById("activityInput")
    .value.trim();
  console.log("Selected Activity Name:", selectedActivityName);
  const duration = parseInt(document.getElementById("duration").value) || 0;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const age = 25;
  const gender = "male"; // Implicitly set to male

  // Validate inputs
  if (weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height values.");
    return;
  }

  // Calculate BMR
  const bmr = calculateBMR(weight, height, age, gender);

  // Find selected food's calories
  const food = foods.find(
    (item) => item.name.toLowerCase() === selectedFoodName.toLowerCase()
  );
  const foodCalories = food ? food.calories : 0;

  // Calculate calories burned from activity
  const caloriesBurned = calculateCaloriesBurned(
    selectedActivityName,
    duration,
    weight
  );

  // Calculate net calories
  const netCalories = foodCalories - caloriesBurned;

  // Display result in HTML
  const resultElement = document.getElementById("caloriesResult");
  if (resultElement) {
    resultElement.innerHTML = `
      <p class="text-green-500"><strong>Calories Consumed from ${selectedFoodName}: </strong>${foodCalories} kcal</p>
      <p class="text-green-500"><strong>Calories Burned from ${selectedActivityName} (${duration} minutes): </strong>${caloriesBurned} kcal</p>
      <p class="text-green-500"><strong>Net Calories: </strong>${netCalories} kcal</p>
      <p class="text-green-500"><strong>BMR (Basal Metabolic Rate): </strong>${bmr.toFixed(2)} kcal/day</p>
    `;
  } else {
    console.error("caloriesResult element not found.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Sign-In Form Submission
  const signinForm = document.getElementById("signinForm");
  if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("isLoggedIn", "true");
          alert("Sign in successful");
          // Redirect to homepage or dashboard
          window.location.href = "loggedin.html";
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  // Sign-Up Form Submission
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          alert("Sign up successful");
          // Redirect to sign-in page
          window.location.href = "signin.html";
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  // Initialize app if it's the main page
  if (document.getElementById("foodInput")) {
    initializeApp();
  }

  // Logout button functionality
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      alert("Logged out successfully");
      window.location.href = "signin.html";
    });
  }
});

function calculateCalories() {
  console.log("Calculate Calories function called");

  // Check if foods and activities are loaded
  if (foods.length === 0 || activities.length === 0) {
    console.error("Foods or activities not loaded.");
    return;
  }

  // Retrieve inputs
  const selectedFoodName = document.getElementById("foodInput").value.trim();
  const selectedActivity = document
    .getElementById("activityInput")
    .value.trim();
  const duration = parseInt(document.getElementById("duration").value) || 0;
  const weight = parseFloat(document.getElementById("weight").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const age = 25;
  const gender = "male";

  // Validate inputs
  if (weight <= 0 || height <= 0) {
    alert("Please enter valid weight and height values.");
    return;
  }

  // Calculate BMR
  const bmr = calculateBMR(weight, height, age, gender);

  // Find selected food's calories
  const food = foods.find(
    (item) => item.name.toLowerCase() === selectedFoodName.toLowerCase()
  );
  const foodCalories = food ? food.calories : 0;

  // Calculate calories burned from activity
  const caloriesBurned = calculateCaloriesBurned(
    selectedActivity,
    duration,
    weight
  );

  // Calculate net calories
  const netCalories = foodCalories - caloriesBurned;

  // Display result in HTML
  const resultElement = document.getElementById("caloriesResult");
  if (resultElement) {
    resultElement.innerHTML = `
        <p class="text-green-500"><strong>Calories Consumed from ${selectedFoodName}: </strong>${foodCalories} kcal</p>
        <p class="text-green-500"><strong>Calories Burned from ${selectedActivity} (${duration} minutes): </strong>${caloriesBurned} kcal</p>
        <p class="text-green-500"><strong>Net Calories: </strong>${netCalories} kcal</p>
        <p class="text-green-500"><strong>BMR (Basal Metabolic Rate): </strong>${bmr.toFixed(2)} kcal/day</p>
      `;
  } else {
    console.error("caloriesResult element not found.");
  }
}
